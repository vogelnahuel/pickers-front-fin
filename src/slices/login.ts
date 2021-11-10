import { createSlice } from "@reduxjs/toolkit";

export type LoginType = {
  fetching: boolean;
  dashboard: any;
};

const initialState: LoginType = {
  fetching: false,
  dashboard: {},
};

// Una de las ventajas con la que cuenta redux toolkit es la positibilidad de
// escribir "mutating logic" dentro de los reducers.
// No realiza la mutación del estado ya que utiliza la libreria Immer, la cual
// detecta los cambios en un estado "draft" y produce un nuevo estado inmutable.
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
});

// Se exportan todas las actions creators para poder hacer los dispatch
//export const {  } = dashboardSlice.actions;

// Se exporta el reducer/slice para asociarlo en la creación del store
export default loginSlice.reducer;
