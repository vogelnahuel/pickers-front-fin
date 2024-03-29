import { DetailPreliquidationType } from "reducers/types/preliquidation";

export type PreliquidationsApiResponse = {
  data: PreliquidationsContentResponseType;
  status: number;
};

export type PreliquidationsContentResponseType = {
  hasMore: boolean;
  limit: number;
  offset: number;
  statusCode?: number;
  error?: string;
  message?: string;
  result: {
    items: PreliquidationItem[];
  };
};

export type PreliquidationItem = {
  id: number;
  fiscalNumber: string;
  total: number;
  generatedAt: string;
  status: PreliquidationStatus;
};

export type PreliquidationStatus = {
  id: number;
  description: string;
  tag: string;
};

export type PreliquidationParamsMiddlewareType = {
  presettlementId?: number;
  status?: string;
  generatedAt?: string;
  fiscalNumber?: string;
  limit?: number;
  offset?: number;
};
export type PreliquidationCastParamsMiddlewareType = {
  presettlementId?: number;
  status?: string;
  generatedAt?: string;
  fiscalNumber?: string;
  limit?: number;
  offset?: number;
};

export type PreliquidationParamsMiddlewareTypeCast = {
  presettlementId?: number;
  status?: string;
  generatedAt?: string;
  fiscalNumber?: string;
  limit?: number;
  offset?: number;
  id?: string | number;
};

export type UploadInvoiceFileMiddlewareType = {
  id: number;
  content: string;
};

export type RejectInvoiceMiddlewareType = {
  presettlementId: string | undefined;
};

export type DetailPreliquidationsApiResponseType = {
  data: {
    result: DetailPreliquidationsContentResponseType;
  };
  status: number;
};
export type DetailPreliquidationsContentResponseType = {
  id: number;
  emisionDate: string;
  invoiceNumber: string;
  salePoint: string;
  invoiceType: InvoiceTypes;
  caeNumber: string;
  fiscalData: {
    fiscalNumber: string;
    companyName: string;
    taxPayerType: string;
    total: number;
  };
  invoiceFile: {
    upload: true | false;
    url: string | null;
  };
  presettlement: {
    id: number;
    status: PreliquidationStatus;
    generatedAt: string;
  };
  presettementId: string | undefined;
};

export type DetailPreliquidationBodyParamsType = {
  emisionDate: string | null;
  invoiceType: InvoiceTypes | null;
  invoiceNumber: string | null;
  salePoint: string | null;
  caeNumber: string | null;
};

export type DetailPreliquidationsApiResponse = {
  data: PreliquidationsContentResponseType;
  status: number;
};
export type DetailPreliquidationsInvoiceContentResponseType = {
  statusCode?: number;
  error?: string;
  message?: string;
  result: {
    id: number;
  };
};

export type DetailPreliquidationsInvoiceApiResponseType = {
  data: DetailPreliquidationsInvoiceApiResponseContentType;
  status: number;
};
export type DetailPreliquidationsInvoiceApiResponseContentType = {
  result: {
    id: number;
  };
};

export type DetailPreliquidationsInvoiceTypesApiResponseType = {
  data: DetailPreliquidationsInvoiceTypesApiResponseContentType;
  status: number;
};

export type DetailPreliquidationsInvoiceTypesApiResponseContentType = {
  result: InvoiceTypes[];
};
export type InvoiceTypes = {
  name: string;
  tag: string;
};

export type AdjustAmountMiddlewareType = {
  id: number;
  currentAmount: number;
  callback: (id: number) => void;
  adjustment: {
    type: "plus" | "subtract";
    amount: number;
    reason: string;
  };
};

export type DetatilPreliquidationsApiResponse = {
  data: {
    result: DetailPreliquidationType
  };
  status: number;
};
export type AdjustmenResponseType = {
  statusCode?: number;
}

export type sendAccountinMiddlewareType = { presettlements: number[] }
