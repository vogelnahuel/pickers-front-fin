import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  actions as pendingUserAdminPickerActions,
  selectors as pendingUserAdminPickerSelectors,
} from "reducers/detailPicker";
import { DetailPicker } from "pages/pickers/detailPicker/DetailPicker";
import { DATE_FORMATS, VALIDATION_REGEX } from "utils/constants";
import { useHistory, useParams } from "react-router-dom";
import {
  actions as pendingUserActions,
  selectors as pendingUserSelectors,
} from "reducers/pickers";
import * as yup from "yup";
import { actions as notificationActions } from "reducers/notification";

import {
  PickerType,
  ParamsMiddlewareType,
  DetailPickerValidationSchema,
} from "../types";
import { ParamGetPendingUser } from "sagas/types/pickers";
import { AppDispatch, RootState } from "store";
import { DetailPickerContainerTypeProps } from "./types";
import i18next from "i18next";

const DetailPickerContainer: React.FC<DetailPickerContainerTypeProps> = (
  props
): JSX.Element => {
  const params: any = useParams();
  const historial: any = useHistory();

  useEffect(() => {
    props.getPendingUserPicker(params.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let active: boolean =
    props.pendingUserAdminPicker.status &&
    (props.pendingUserAdminPicker.status.id === 4 ||
      props.pendingUserAdminPicker.status.id === 5);

  const validationSchema: yup.SchemaOf<DetailPickerValidationSchema> =
    yup.object({
      name: yup
        .string()
        .required(i18next.t("global:error.input.required"))
        .matches(
          VALIDATION_REGEX.expName,
          i18next.t("global:error.input.numbersOrSpecialCharacters")
        ),
      surname: yup
        .string()
        .required(i18next.t("global:error.input.required"))
        .matches(
          VALIDATION_REGEX.expName,
          i18next.t("global:error.input.numbersOrSpecialCharacters")
        ),
      phone: yup.object({
        areaNumber: yup
          .string()
          .required(i18next.t("global:error.input.required"))
          .matches(
            VALIDATION_REGEX.regArea,
            i18next.t("global:error.input.invalidFormat")
          ),
        number: yup
          .string()
          .required(i18next.t("global:error.input.required"))
          .matches(
            VALIDATION_REGEX.regTelefono,
            i18next.t("global:error.input.invalidFormat")
          ),
      }),
      expirationDatePolicyPersonal: yup
        .string()
        .nullable()
        .required(i18next.t("global:error.input.required"))
        .matches(
          DATE_FORMATS.regex,
          i18next.t("global:error.input.invalidFormat")
        ),
      vehicle:
        props.pendingUserAdminPicker.vehicleType === "motorcycle"
          ? yup.object({
              [props.pendingUserAdminPicker.vehicleType]: yup.object({
                patent: yup
                  .string()
                  .nullable()
                  .required(i18next.t("global:error.input.required"))
                  .matches(
                    VALIDATION_REGEX.regPatent,
                    i18next.t("global:error.input.specialCharacters")
                  ),
                expirationDatePolicyVehicle: yup
                  .string()
                  .nullable()
                  .required(i18next.t("global:error.input.required"))
                  .matches(
                    DATE_FORMATS.regex,
                    i18next.t("global:error.input.invalidFormat")
                  )
                  .matches(
                    DATE_FORMATS.regexValidCharacter,
                    i18next.t("global:error.input.specialCharacters")
                  ),
                expirationDateIdentificationVehicle: yup
                  .string()
                  .nullable()
                  .required(i18next.t("global:error.input.required"))
                  .matches(
                    DATE_FORMATS.regex,
                    i18next.t("global:error.input.invalidFormat")
                  )
                  .matches(
                    DATE_FORMATS.regexValidCharacter,
                    i18next.t("global:error.input.specialCharacters")
                  ),
                expirationDateDriverLicense: yup
                  .string()
                  .nullable()
                  .required(i18next.t("global:error.input.required"))
                  .matches(
                    DATE_FORMATS.regex,
                    i18next.t("global:error.input.invalidFormat")
                  )
                  .matches(
                    DATE_FORMATS.regexValidCharacter,
                    i18next.t("global:error.input.specialCharacters")
                  ),
              }),
            })
          : yup.object({}),
    });

  const cancel = (isDirty: Boolean, restart: Function) => {
    let onClose = () => {
      restart();
    };
    if (isDirty) {
      props.showNotification({
        level: "warning",
        title: i18next.t("pickers:title.modal.saveChanges"),
        body: i18next.t("pickers:label.modal.saveChanges"),
        onClickLabel: i18next.t("pickers:button.modal.goToSave"),
        onCloseLabel: i18next.t("pickers:button.modal.notSave"),
        onClose: onClose,
        onClick: () =>
          window.scroll({
            top: window.innerHeight,
            left: 0,
            behavior: "smooth",
          }),
      });
    } else {
      onClose();
    }
  };

  const aproveSubmit = (params: PickerType, goBack: Function) => {
    props.showNotification({
      level: "info",
      title: "Aprobar picker",
      body: "Al aprobar la solicitud, ya va a poder hacer envíos",
      onClickLabel: "Aprobar",
      onCloseLabel: "Revisar datos",
      onClick: () => props.postAprovePickerRequest(params, goBack),
    });
  };

  return (
    <DetailPicker
      {...props}
      validationSchema={validationSchema}
      //changePage={changePage}
      cancel={cancel}
      goBack={() => historial.goBack()}
      aproveSubmit={aproveSubmit}
      active={active}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  pendingUserAdminPicker:
    pendingUserAdminPickerSelectors.getPendingUserPicker(state),
  isFetching: pendingUserAdminPickerSelectors.isFetching(state),
  actualPage: pendingUserSelectors.getActualPage(state),
  nameDisplay: pendingUserAdminPickerSelectors.getNameDisplay(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getPendingUserPicker: (params: ParamGetPendingUser) => {
    dispatch(pendingUserAdminPickerActions.getPendingUserPickerRequest(params));
  },
  getPendingUserPickerExport: (
    params: ParamsMiddlewareType,
    element: HTMLElement
  ) => {
    dispatch(
      pendingUserAdminPickerActions.getPendingUserPickerExportRequest(
        params,
        element
      )
    );
  },
  setDirty: (dirty: boolean) => {
    dispatch(pendingUserAdminPickerActions.setDirty(dirty));
  },
  postAprovePickerRequest: (params: PickerType, goBack: Function) => {
    dispatch(
      pendingUserAdminPickerActions.getAprovePickerRequest(params, goBack)
    );
  },
  postPendingUserDocumentsEdit: (params: PickerType) => {
    dispatch(
      pendingUserAdminPickerActions.getPendingUserPickerDocumentsEditRequest(
        params
      )
    );
  },
  showNotification: (content: any) => {
    //falta tipar shownotification
    dispatch(notificationActions.showNotification(content));
  },
  postEditPickerRequest: (params: PickerType, goBack: Function) => {
    dispatch(
      pendingUserAdminPickerActions.getEditPickerRequest(params, goBack)
    );
  },
  setActualPage: (page: String) => {
    dispatch(pendingUserActions.setActualPage(page));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPickerContainer);
