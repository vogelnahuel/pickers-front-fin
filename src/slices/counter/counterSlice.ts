import {
  createSlice,
  PayloadAction,
  createAction,
  createDraftSafeSelector,
} from "@reduxjs/toolkit";
import { RootState } from "store";

export type CounterState = {
  value: number;
};

const initialState: CounterState = {
  value: 0,
};

// Una de las ventajas con la que cuenta redux toolkit es la positibilidad de
// escribir "mutating logic" dentro de los reducers.
// No realiza la mutación del estado ya que utiliza la libreria Immer, la cual
// detecta los cambios en un estado "draft" y produce un nuevo estado inmutable.
export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const incrementAsync = createAction<number | undefined>(
  "counter/incrementAsync"
);

// Se exportan todas las actions creators para poder hacer los dispatch
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Se exporta el reducer/slice para asociarlo en la creación del store
export default counterSlice.reducer;

export const counterSelector = (state: RootState) => state.counter;
