import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";

export const initialState: any = {
    detailPreliquidation: {
        id: 0,
        status: {
            id: 0,
            name: "",
            tag: ""
        },
        generatedAt: "",
        fiscalNumber: "",
        companyName: "",
        sapCode: "",
        total: 0.0,
        manualCorrection: {
            maxAllowedPlus: 0.0,
            maxAllowedSubtract: 0.0,
        },
        histories: [
            {
                id: 0,
                createdAt: "",
                fieldEdited: "",
                beforeValue: 0,
                currentValue: 0,
                reasonTag: {
                    id: 0,
                    tag: ""
                }
            }
        ],
        transactions: {
            quantity: 0,
            items: [
                {
                    transactionCode: null,
                    finishedAt: "",
                    status: {
                        name: "",
                        tag: ""
                    },
                    amount: 0.0
                }
            ]
        }
    }
}

export const detailPanyreliquidationSlice = createSlice({
    name: "detailPreliquidation",
    initialState,
    reducers: {
        getDetailPreliquidationRequest: (
            state: any,
            action: PayloadAction<string>
          ) => {},
          getDetailPreliquidationError: () => {},
          getDetailPreliquidationSuccess: (
            state: any,
            action: PayloadAction<any>
          ) => {
            state.detailPreliquidation = action.payload;
          },
    }
})