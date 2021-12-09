import React, { useEffect } from "react";
import { connect } from "react-redux";
import i18next from "i18next";
import moment from "moment";
import { useHistory, useParams } from "react-router-dom";
import * as yup from "yup";

import { AppDispatch, RootState } from "store";

import {
  actions as pendingUserAdminPickerActions,
  detailPickerSelector,
  hasPickerWrongFilesSelector,
  hasPickerAllFilesLoadedSelector
} from "reducers/detailPicker";
import {
  pickersSelector,
  actions as pendingUserActions,
} from "reducers/pickers";
import { actions as notificationActions } from "reducers/notification";

import {
  PickerType,
  ParamsMiddlewareType,
  DetailPickerValidationSchema,
} from "../types";
import { DetailPickerContainerTypeProps } from "./types";

import { DetailPicker } from "pages/pickers/detailPicker/DetailPicker";
import { DATE_FORMATS, VALIDATION_REGEX } from "utils/constants";
import { NotificationStateType } from "reducers/types/notification";

const DetailPickerContainer: React.FC<DetailPickerContainerTypeProps> = (
  props
): JSX.Element => {
  const params: { id?: string } = useParams();
  const historial = useHistory();

  useEffect(() => {
    props.getPendingUserPicker(params.id);
    props.resetWrongFiles();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let active: boolean =
    props.pendingUserAdminPicker.status &&
    (props.pendingUserAdminPicker.status.id === 4 ||
      props.pendingUserAdminPicker.status.id === 5);

  const formatDate = (date: string | undefined = ""): string => {
    return moment(date, DATE_FORMATS.shortISODate, true).isValid() &&
      date.length === 10
      ? moment(date).format(DATE_FORMATS.shortDate)
      : date;
  };
  const history = useHistory();
  
  const changePage = (page: string, isDirty?: boolean) => {
    if (props.actualPage !== page) {
      let onClose = () => {
        props.setActualPage(page);

        if (history.location.pathname !== "/pickers" && history.length > 1)
          history.goBack();
        else if (history.length <= 1) {
          history.replace("/pickers");
        }
      };
      if (isDirty) {
        props.showNotification({
          level: "warning",
          title: i18next.t("pickers:title.modal.saveChanges"),
          body: i18next.t("pickers:label.modal.saveChanges"),
          onClickLabel: "pickers:button.modal.goToSave",
          onCloseLabel: "pickers:button.modal.notSave",
          onClose: onClose,
          onClick: () =>
            window.scroll({
              top: window.innerHeight,
              left: 0,
              behavior: "smooth",
            }),
        });
      } 
      else if (props.wrongFiles) {
        props.showNotification({
          level: "warning",
          title: i18next.t("global:title.modal.withoutSaving"),
          body:  i18next.t("global:label.modal.withoutSaving"),
          onClickLabel: i18next.t("global:label.button.checkErrors"),
          onCloseLabel: i18next.t("global:label.button.continue"),
          onClose: onClose,
          onClick: () =>
            window.scroll({
              top: window.innerHeight,
              left: 0,
              behavior: "smooth",
            }),
        });
      } 
      else {
        onClose();
      }
    } 
    else {
   
    }
  };

  const validationSchema: yup.SchemaOf<DetailPickerValidationSchema> =
    yup.object({
      personalData: yup.object({
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
      }),
      vehicle:
        props.pendingUserAdminPicker.vehicle &&
        props.pendingUserAdminPicker.vehicle.type === "motorcycle"
          ? yup.object({
              patent: yup
                .string()
                .nullable()
                .required(i18next.t("global:error.input.required"))
                .min(6, i18next.t("global:error.input.patentLong"))
                .matches(
                  VALIDATION_REGEX.regPatent,
                  i18next.t("global:error.input.patentFormat")
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
                  i18next.t("global:error.input.invalidFormat")
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
                  i18next.t("global:error.input.invalidFormat")
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
                  i18next.t("global:error.input.invalidFormat")
                ),
            })
          : yup.object({}),
    });

  const cancel = (isDirty: boolean, restart: Function) => {
    let onClose = () => {
      restart();
    };
    if (isDirty) {
      props.showNotification({
        level: "warning",
        title: i18next.t("pickers:title.modal.saveChanges"),
        body: i18next.t("pickers:label.modal.saveChanges"),
        onClickLabel: "pickers:button.modal.goToSave",
        onCloseLabel: "pickers:button.modal.notSave",
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
      title: i18next.t("detailPicker:title.modal.approvePicker"),
      body: i18next.t("detailPicker:label.modal.approvePicker"),
      onClickLabel: "detailPicker:label.button.approve",
      onCloseLabel: "detailPicker:label.button.revise",
      onClick: () => props.postAprovePickerRequest(params, goBack),
      onClose: undefined,
    });
  };

  return (
    <DetailPicker
      {...props}
      validationSchema={validationSchema}
      changePage={changePage}
      cancel={cancel}
      goBack={() => historial.goBack()}
      aproveSubmit={aproveSubmit}
      active={active}
      formatDate={formatDate}
    />
  );
};

const mapStateToProps = (state: RootState) => ({
  pendingUserAdminPicker: detailPickerSelector(state).pendingUserAdminPicker,
  isFetching: detailPickerSelector(state).fetching,
  actualPage: pickersSelector(state).actualPage,
  nameDisplay: detailPickerSelector(state).nameDisplay,
  wrongFiles: hasPickerWrongFilesSelector(state),
  loadedFiles: hasPickerAllFilesLoadedSelector(state)
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getPendingUserPicker: (params: number) => {
    dispatch(pendingUserAdminPickerActions.getPendingUserPickerRequest(params));
  },
  getPendingUserPickerExport: (params: ParamsMiddlewareType) => {
    dispatch(
      pendingUserAdminPickerActions.getPendingUserPickerExportRequest(params)
    );
  },
  setDirty: (dirty: boolean) => {
    dispatch(pendingUserAdminPickerActions.setDirty(dirty));
  },
  postAprovePickerRequest: (params: PickerType, goBack: Function) => {
    dispatch(
      pendingUserAdminPickerActions.getAprovePickerRequest({ params, goBack })
    );
  },
  postPendingUserDocumentsEdit: (params: PickerType) => {
    dispatch(
      pendingUserAdminPickerActions.getPendingUserPickerDocumentsEditRequest(
        params
      )
    );
  },
  showNotification: (content: NotificationStateType) => {
    dispatch(notificationActions.showNotification(content));
  },
  postEditPickerRequest: (params: PickerType, goBack: Function) => {
    dispatch(
      pendingUserAdminPickerActions.getEditPickerRequest({ params, goBack })
    );
  },
  setActualPage: (page: string) => {
    dispatch(pendingUserActions.setActualPage(page));
  },
  resetWrongFiles: () =>{
    dispatch( pendingUserAdminPickerActions.resetWrongFiles() )
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailPickerContainer);
