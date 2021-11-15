import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
import { NotificationStateType } from "./types/notification";

const initialState: NotificationStateType = {
  open: false,
  level: "info",
  title: "",
  body: "",
  onCloseLabel: "",
  onClickLabel: "global:label.button.understood",
  onClick: undefined,
  onClose: undefined,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (
      state: NotificationStateType,
      { payload }: PayloadAction<NotificationStateType>
    ) => {
      state.open = true;
      state.level = payload.level;
      state.title = payload.title;
      state.body = payload.body;
      state.onCloseLabel = payload.onCloseLabel ?? state.onCloseLabel;
      state.onClickLabel = payload.onClickLabel ?? state.onClickLabel;
      state.onClick = payload.onClick ?? state.onClick;
      state.onClose = payload.onClose ?? state.onClose;
    },
    hideNotification: (state: NotificationStateType) => {
      state.level = initialState.level;
      state.title = initialState.title;
      state.body = initialState.body;
      state.onCloseLabel = initialState.onCloseLabel;
      state.onClickLabel = initialState.onClickLabel;
      state.onClick = initialState.onClick;
      state.onClose = initialState.onClose;
      state.open = false;
    },
  },
});

export default notificationSlice.reducer;

export const actions = notificationSlice.actions;

export const notificationSelector = (state: RootState) => state.notification;
