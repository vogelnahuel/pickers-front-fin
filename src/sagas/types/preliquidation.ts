import { generetedAtType } from "pages/preliquidation/filter/types";

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
  presettlmentId?: number;
  status?: string;
  generetedAt?:generetedAtType 
  fiscalNumber?: string;
  limit?: number;
  offset?: number;
};
export type PreliquidationCastParamsMiddlewareType = {
  presettlmentId?: number;
  status?: string;
  generetedAt?:string 
  fiscalNumber?: string;
  limit?: number;
  offset?: number;
};

export type PreliquidationParamsMiddlewareTypeCast = {
  presettlmentId?: number;
  status?: string;
  generetedAt?:string
  fiscalNumber?: string;
  limit?: number;
  offset?: number;
  id?: string | number;
};

export type UploadInvoiceFileMiddlewareType = {
  id: number;
  content: string;
}

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
   id?: number;
   status :PreliquidationStatus,
   generatedAt :  string
  }
  presettementId:string | undefined
};

export type DetailPreliquidationBodyParamsType = {
 
    emisionDate: string;
    invoiceType: InvoiceTypes;
    invoiceNumber: string;
    salePoint: string;
    caeNumber: string;
  
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
