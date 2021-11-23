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
    items: any[];
  };
};
