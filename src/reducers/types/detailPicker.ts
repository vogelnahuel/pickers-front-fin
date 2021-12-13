import { TagsErrorType } from "component/admin/ExpandableFile/types";
import { DetailPickerTagFileType, PickerType } from "pages/pickers/types";

export type DetailPickerTypes = {
  PENDING_USER_ADMIN_PICKER_GET_REQUEST: string;
  PENDING_USER_ADMIN_PICKER_GET_SUCCESS: string;
  PENDING_USER_ADMIN_PICKER_GET_ERROR: string;
  PENDING_USER_ADMIN_PICKER_SET_DIRTY: string;
  PENDING_USER_ADMIN_PICKER_EXPORT_GET_REQUEST: string;
  PENDING_USER_ADMIN_PICKER_EXPORT_GET_SUCCESS: string;
  PENDING_USER_ADMIN_PICKER_EXPORT_GET_ERROR: string;
  PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_REQUEST: string;
  PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_SUCCESS: string;
  PENDING_USER_ADMIN_PICKER_DOCUMENT_EDIT_POST_ERROR: string;
  PICKER_EDIT_POST_REQUEST: string;
  PICKER_EDIT_POST_SUCCESS: string;
  PICKER_EDIT_POST_ERROR: string;
  PICKER_APROVE_POST_REQUEST: string;
  PICKER_APROVE_POST_SUCCESS: string;
  PICKER_APROVE_POST_ERROR: string;
};

export type actionType = {
  type: string;
  dirty: boolean;
  pendingUserAdminPicker: PickerType;
  params: PickerType;
  body: PickerType;
};

export type SelectorType = {
  isFetching: Function;
  isDirty: Function;
  getNameDisplay: Function;
  getPendingUserPicker: Function;
};

export type DetailPickerStateType = {
  fetching: boolean;
  dirty: boolean;
  wrongFiles: TagsErrorType;
  nameDisplay: string;
  pendingUserAdminPicker: PickerType;
  serverError: (keyof DetailPickerTagFileType)[];
};

export type PickerWrongFilePayloadType = {
  type: keyof TagsErrorType;
  value: boolean;
};

export type ActionType = {
  getPendingUserPickerRequest: Function;
  getPendingUserPickerSuccess: Function;
  getPendingUserPickerError: Function;
  setDirty: Function;
  getPendingUserPickerExportRequest: Function;
  getPendingUserPickerExportSuccess: Function;
  getPendingUserPickerExportError: Function;
  getPendingUserPickerDocumentsEditRequest: Function;
  getPendingUserPickerDocumentsEditSuccess: Function;
  getPendingUserPickerDocumentsEditError: Function;
  getAprovePickerRequest: Function;
  getAprovePickerSuccess: Function;
  getAprovePickerError: Function;
  getEditPickerRequest: Function;
  getEditPickerSuccess: Function;
  getEditPickerError: Function;
};
