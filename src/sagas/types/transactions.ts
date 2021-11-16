import { DateType } from "pages/transaction/filterTransaction/types";

export type TransactionsActionType = {
  type: string;
  params: FilterTransactionsType;
  element?: HTMLElement;
};
export type FilterTransactionsType = {
  inAlert?: boolean;
  maxMinDeliveryDate?: string;
  minMinDeliveryDate?: string;
  offset?: number;
  state?: string;
  pickerId?: number;
  transactionCode?: string;
  date?: DateType;
};

export type FilterTransactionsValidationSchemaType = {
  pickerId?: number | string;
  transactionCode?: string;
};

export type TransactionResponseContent = {
  data: TransactionResponseType;
  status: number;
};
export type TransactionResponseType = {
  hasMore: boolean;
  limit: number;
  offset: number;
  statusCode?: number;
  error?: string;
  message?: string;
  result: {
    items: TransactionResponseTypeResult[];
  };
};

export type TransactionResponseTypeResult = {
  transaction: {
    id: number;
    orderNumber: string;
    transactionCode: string;
    inAlert: boolean;
    sellerId: string;
    externalPickerId: string | null;
    state: {
      id: number;
      name: string;
      tag: string;
    };
    sla: string;
    minDeliveryDateTime: string;
    maxDeliveryDateTime: string;
    finishDeliveryTime: string;
    createdAt: string;
    earning: number; // or null
  };
  origin: {
    name: string;
    street: string;
    streetNumber: string;
    locality: string;
    neighborhood: string;
    state: string;
    postalCode: string;
    country: string;
    floor: string;
    apartment: string;
    observation: string;
    latitude: number;
    longitude: number;
    formattedAddress: string;
    distance: number;
  };
  destination: {
    name: string;
    street: string;
    streetNumber: string;
    locality: string;
    neighborhood: string;
    state: string;
    postalCode: string;
    country: string;
    floor: string;
    apartment: string;
    observation: string;
    latitude: number;
    longitude: number;
    formattedAddress: string;
    distance: number;
  };
  client: {
    name: string;
    lastName: string;
    identificationNumber: string;
    phone: string;
  };
};

export type TransactionsExportContentType = {
  data: string;
  status: number;
};
