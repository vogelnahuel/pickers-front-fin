

export type DetailTransactionSagasType={
  type: string;
  id: string;
  element?: HTMLElement;
}


export type postDevolutionUndeliveredType = {
  impossibleDeliveryReasonId: string;
};
export type postDevolutionUndeliveredParamsType = {
  type:string
  params: postDevolutionUndeliveredType;
  id:string
};
export type postReasonsCancelParamsType = {
  type:string
  params: postCancelType;
  id:string
};
export type postDniDeliveredParamsType = {
  type:string
  params: postDnideliveredResponseType;
  id:string
};
export type postCancelType = {
  cancellationReasonId: number;
};
export type DevolutionUndeliveredResponseType = {
  data: DevolutionUndeliveredContentType;
  status: number;
};

export type DevolutionUndeliveredContentType = {
  result: DetailTransactionType;
};

export type postDnideliveredResponseType = {
  key: number;
  value: string;
};

export type DetailTransactionCancelContentType = {
  result: {
    items: DetailTransactionCancelItemType[];
  };
};

export type DetailTransactionCancelItemType = {
  id: number;
  message: string;
  internal: boolean;
};

export type TransactionCancelResponseType = {
  data: DetailTransactionCancelContentType;
  status: number;
};

export type DetailTransactionResponseType = {
  data: DetailTransactionContentType;
  status: number;
};
export type DetailTransactionContentType = {
  result: DetailTransactionType;
};

export type DetailTransactionTransactionType = {
  id: number;
  orderNumber: string;
  transactionCode: string;
  inAlert: boolean;
  sellerId: string;
  externalPickerId: string;
  state: DetailTransactionStateType;
  sla: string;
  minDeliveryDateTime: string;
  maxDeliveryDateTime: string;
  finishDeliveryTime: string;
  createdAt: string;
  earning: number; // or null
};
export type DetailTransactionStateType = {
  id: number;
  name: string;
  tag: string;
};
export type DetailTransactionOriginType = {
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
export type DetailTransactionDestinationType = {
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
export type DetailTransactionClientType = {
  name: string;
  lastName: string;
  identificationNumber: string;
  phone: string;
};
export type DetailTransactionProductType = {
  weight: TransactionProductType;
  length: TransactionProductType;
  height: TransactionProductType;
  width: TransactionProductType;
  price: number;
  sku: string;
  amount: number;
};
export type TransactionProductType = {
  amount: number;
  unit: number;
};

export type DetailTransactionHistoryType = {
  id: number;
  createdAt: string;
  fieldEdited: number;
  beforeValue: number;
  curentValue: number;
  reasonTag: DetailTransactionReasonTagType;
  metadata: DetailTransactionMetaDataType[];
};
export type DetailTransactionReasonTagType = {
  id: number;
  tag: string;
};
export type DetailTransactionMetaDataType = {
  key: number;
  value: string;
};
export type DetailTransactionPickerType = {
  id: number;
  name: string;
  surname: string;
  phone: DetailTransactionPickerPhoneType;
};
export type DetailTransactionPickerPhoneType = {
  countryNumber: string;
  areaNumber: string;
  number: string;
};

export type DetailTransactionSellerType = {
  id: number;
  name: string;
  urlNotification: string;
  tag: string;
};
export type DetailTransactionType = {
  transaction: DetailTransactionTransactionType;
  origin: DetailTransactionOriginType;
  destination: DetailTransactionDestinationType;
  client: DetailTransactionClientType;
  products: DetailTransactionProductType[];
  transactionHistory: DetailTransactionHistoryType[];
  picker: DetailTransactionPickerType;
  seller: DetailTransactionSellerType;
};
