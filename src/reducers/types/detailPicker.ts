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

export type GetPendingUserType = {
  result: any;
  limit: Number;
  offset: Number;
  hasMore: boolean;
};

export type SelectorType = {
  isFetching: Function;
  isDirty: Function;
  getNameDisplay: Function;
  getPendingUserPicker: Function;
};

export type StateType = {
  fetching: boolean;
  dirty: boolean;
  nameDisplay: String;
  pendingUserAdminPicker: object;
  pendingUserAdminPickerExport: object;
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
