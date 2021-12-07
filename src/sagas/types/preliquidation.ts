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
  genereted_at: string;
  status: PreliquidationStatus;
};

export type PreliquidationStatus = {
  id: number;
  name: string;
  tag: string;
};

export type PreliquidationParamsMiddlewareType = {
  presettlmentId?: number;
  status?: string;
  generetedAt?: string;
  fiscalNumber?: string;
  limit?: number;
  offset?: number;
};

export type DetailPreliquidationsApiResponseType = {
  data: {
    result : DetailPreliquidationsContentResponseType
  };
  status: number;
};
export type DetailPreliquidationsContentResponseType = {

    id: number;
    emisionDate: string;
    invoiceNumber: string;
    salePoint: string;
    invoiceType: string;
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

};
