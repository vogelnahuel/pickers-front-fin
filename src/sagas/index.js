import { push, replace } from "react-router-redux";
import { delay } from "redux-saga";
import { call, spawn, put, all, select } from "redux-saga/effects";
import globalTypes from "reducers/types/global";
import { types as configTypes, selectors as configSelectors } from "reducers/config";
import { types as i18nTypes, selectors as i18nSelectors } from "reducers/i18n";
import { actions as notificationActions } from "reducers/notification";
import { actions as sessionActions } from "reducers/session";
import { actions as loginActions, selectors as loginSelectors } from "reducers/login";
import desktop from "sagas/desktop";
import login from "sagas/login";
import { types as recoveryPasswordTypes } from "reducers/petersen/recoveryPassword";
import { types as loanRequestTypes } from "reducers/petersen/loanRequest";
import { types as changePassTypes } from "reducers/settings";
import { types as paymentsTypes } from "reducers/petersen/payments";
// import { MAX_FAILED_TIMES } from "constants.js";
import * as I18n from "util/i18n";
import { types as loadingTypes } from "reducers/petersen/loading";
import transactions from "sagas/transactions";

const sagas = [
    ...transactions,
];

export default function* rootSaga() {
    yield all(
        sagas.map((saga) =>
            spawn(function* listenErrors() {
                let isSyncError = false;
                const resetSyncError = () => {
                    isSyncError = false;
                };
                let httpError = false;
                while (true) {
                    httpError = false;
                    isSyncError = true;
                    try {
                        setTimeout(resetSyncError);

                        yield call(function* execSaga() {
                            yield saga;
                        });
                        // eslint-disable-next-line no-console
                        console.error(
                            "Unexpected root saga termination. " +
                                "The root sagas are supposed to be sagas that live during the whole app lifetime!",
                            saga,
                        );
                    } catch (error) {
                        httpError = typeof error.httpError !== "undefined";
                        if (!httpError && isSyncError) {
                            throw new Error(`${saga.name} was terminated because it threw an exception on startup.`);
                        }
                        yield call(handleError, error);
                    }

                    if (!httpError) {
                        // Para evitar que fallas infinitas bloqueen el browser...
                        // eslint-disable-next-line no-console
                        console.error(saga.name, " will be restarted after 1 second");
                        yield call(delay, 1000);
                    }
                }
            }),
        ),
    );
}

export function* handleError(error) {
    let errorControlled = false;

    if (error.data) {
        switch (error.data.code) {
            // Add known error codes as new cases for avoid general error message

            // User is blocked
            case "COR019E":
                errorControlled = true;
                yield put({ type: globalTypes.CLEAN_UP });
                yield put(replace("/error/userBlocked"));
                break;
            case "API040E":
                errorControlled = true;
                yield put(
                    notificationActions.showNotification(I18n.get("products.operation.noDispose"), "error", [
                        "desktop",
                    ]),
                );
                yield put(replace("/desktop"));
                break;
            // SecondFactor maxAttempts
            case "API010W":
                errorControlled = true;
                yield put({ type: globalTypes.CLEAN_UP });
                yield put(sessionActions.expireSecondFactor(error.data.message));
                break;
            default:
                yield put({ type: changePassTypes.CHANGE_PASSWORD_ERROR });
                break;
        }

        if (!errorControlled) {
            // eslint-disable-next-line no-console
            // yield put({ type: recoveryPasswordTypes.RECOVERY_PASS_STEP1_ERROR });
            // yield put({ type: loanRequestTypes.LOAN_REQUEST_CONFIRMATION_ERROR });
            // yield put({ type: loanRequestTypes.LOAN_REQUEST_ERROR });
            // yield put({ type: loanRequestTypes.LOAN_REQUEST_SELECTION_ERROR });
            // yield put({ type: loanRequestTypes.LOAN_REQUEST_PLAN_SELECTION_ERROR });
            // yield put({ type: loanRequestTypes.LOAN_REQUEST_PLAN_ACREDITATION_ERROR });
            // yield put({ type: loanRequestTypes.LOAN_REQUEST_PLAN_DEBIT_ERROR });
            // yield put({ type: paymentsTypes.PAYMENTS_ERROR });
            // yield put({ type: paymentsTypes.PAYMENTS_CONFIRMATION_ERROR });

            yield put(
                push({
                    pathname: "/error",
                    code: error.data.code,
                    message: error.data.message,
                    idTransaction: error.data.idTransaction,
                }),
            );
        }

        yield call(loadingClean);
    } else if (error.response && error.response.status === 401) {
        // eslint-disable-next-line no-console
        console.error("[API Error Handler]:2", error.response);
        // The request was made and the server responded, but with a status code outside of 2xx
        yield put({ type: globalTypes.CLEAN_UP });
        // Se remueve a fin de evigtar que elimine el fingerprint ante cualquier error.
        // yield put({ type: fingerprintTypes.CLEAN_UP });

        const fromPaymentButton = yield select(loginSelectors.isFromPaymentButton);
        if (error.response.data.code === "API004W") {
            yield put(notificationActions.showNotification(I18n.get("session.expired"), "error", ["login"]));
        } else if (error.response.data.code === "API007E") {
            if (fromPaymentButton) {
                yield put(loginActions.reset());
                yield put(push("/reload"));
                yield put(push("/buttonPaymentLogin"));
            } else {
                yield put(replace("/"));
            }
            yield put(notificationActions.showNotification(I18n.get("session.expired"), "error", ["login"]));
        }
        yield call(loadingClean);
    } else if (error.request) {
        // eslint-disable-next-line no-console
        console.error("[API Error Handler]:3", error.request);
        // The request was made but no response was received

        const timesConfigFailed = yield select(configSelectors.getTimesFailed);
        const timesI18nFailed = yield select(i18nSelectors.getTimesFailed);

        if (timesConfigFailed >= MAX_FAILED_TIMES || timesI18nFailed >= MAX_FAILED_TIMES) {
            yield put(push({ pathname: "/serverError" }));
        } else {
            const lang = yield select(i18nSelectors.getLang);
            yield put({ type: configTypes.RESET_SAGAS_UPDATE, lang });
            yield put({ type: i18nTypes.RESET_SAGAS_UPDATE, lang });
            yield put(
                replace({
                    pathname: "/serverError",
                    code: "CLI999E",
                }),
            );
        }
        yield call(loadingClean);
    } else {
        // eslint-disable-next-line no-console
        console.error("[API Error Handler]:4", error.message);
        // Something happened in setting up the request that triggered an Error
        yield put(
            replace({
                pathname: "/error",
                code: "CLI999E",
            }),
        );
        yield call(loadingClean);
    }
}

function* loadingClean() {
    yield put({ type: loadingTypes.LOADING_CLEAN });
}
