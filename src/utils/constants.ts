import { DetailPickerTagFileType } from "pages/pickers/types";
import { TransactionActionTagType } from "pages/transaction/types";
import { TransactionStatusType } from "sagas/types/transactions";

export const titlesAdminPending: string[] = [
  "tablePickers:label.table.name",
  "tablePickers:label.table.identifier",
  "tablePickers:label.table.email",
  "tablePickers:label.table.vehicle",
  "tablePickers:label.table.pending",
  "tablePickers:label.table.edit",
];

export const titlesAdminActive: string[] = [
  "tablePickers:label.table.name",
  "tablePickers:label.table.identifier",
  "tablePickers:label.table.email",
  "tablePickers:label.table.vehicle",
  "tablePickers:label.table.status",
  "tablePickers:label.table.edit",
];

export const transactionTableTitles: string[] = [
  "transactionTable:label.table.transaction",
  "transactionTable:label.table.idPicker",
  "transactionTable:label.table.slaExpiration",
  "transactionTable:label.table.status",
];

export const preliquidationTableTitles: string[] = [
  "preli:label.table.preliNumber",
  "preli:label.table.if",
  "preli:label.table.dateOfIssue",
  "preli:label.table.status",
  "preli:label.table.total",
];

export const DATE_FORMATS = {
  regex:
    /^(?:(?:31(\/|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
  regexshortDate:
    /^(?:(?:31(\/|\/|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|\/|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|\/|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|\/|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,

  regexValidCharacter: /^[0-9]/,
  fullDate: "DD/MM/YYYY H:mm:ss",
  fullISODate: "YYYY-MM-DD hh:mm:ss",
  fullHour: "HH:mm:ss",
  mediumDate: "DD/MM/YYYY h:mm",
  shortDate: "DD/MM/YYYY",
  shortDateMoment: "DD/MM/YYYY",
  shortISODate: "YYYY-MM-DD",
  cardBodyExpirationDate: "DD/MM/YYYY",
  dateWithoutSeparator: "YYYMMDD",
  periodFormat: "MM/YYYY",
};

export const VALIDATION_REGEX = {
  expName:
    /^[a-zA-ZàáäãâåèéêëìíîïòóôöõøùúüÿýñçšžÀÁÄÃÅÈÉÊËÌÍÎÏÒÓÔÖÕØÙÚÜŸÝŽÑŠßÇðŒÆ ,.'-]+$/u,
  expIdentificationNumber: /^[\d]{0,3}\.?[\d]{0,3}\.?[\d]{0,3}$/,
  regArea: /^([0-9]){1,5}$/,
  regTelefono: /^([0-9]){7,10}$/,
  regPatent: /^([a-zA-Z]{1}[0-9]{3}[a-zA-Z]{3}|[0-9]{3}[a-zA-Z]{3})*$/,
  regTransactionCode: /^[a-fA-F0-9]*$/,
  regPickerId: /^[0-9]*$/,
  regEmail:
    /^(?=.*[a-zA-Z])(?=^.{1,64}$)^[a-zA-Z\d](?:(\.|[-_]+)?[a-zA-Z\d])*(?:(\+)[a-zA-Z\d]+)?(?:(\.)[a-zA-Z\d]+)*[\da-zA-Z-_]*@(?:[a-zA-Z\d](?:[a-zA-Z\d]+)?\.)+[a-zA-Z\d](?:[a-zA-Z\d]+){1,}?$/,
  regPassword:
    /^(?=.*[a-zàáèéìíòóùúñ])(?=.*[A-ZÀÁÈÉÌÍÒÓÙÚÑ])(?=.*\d)[A-Za-z\dàáèéìíòóùúñÀÁÈÉÌÍÒÓÙÚÑ@$¡!%;,*.?#^=&_-]{8,20}$/,
  regPasswordSpecialCharacters:
    /^[0-9A-Za-zdàáèéìíòóùúñÀÁÈÉÌÍÒÓÙÚÑ@$¡!%;,*.?#^=&_-]*$/,
  regMayMin: /^(?=.{1,})(?=.*[a-zdàáèéìíòóùúñ])(?=.*[A-ZÀÁÈÉÌÍÒÓÙÚÑ]).*$/,
  regLetNum: /^(?=.{1,})(?=.*[a-zA-ZdàáèéìíòóùúñÀÁÈÉÌÍÒÓÙÚÑ])(?=.*[0-9]).*$/,
  regDNI: /^[0-9]*$/,
  regNumber: /^[0-9]*$/,
};

export const FILTER_TRANSACTION_OPTIONS = [
  {
    label: "filterTransaction:label.select.notAssigned",
    id: "PENDING_ASSIGNMENT",
  },
  {
    label: "filterTransaction:label.select.inPickup",
    id: "IN_PICK_UP",
  },
  {
    label: "filterTransaction:label.select.inPickupPoint",
    id: "IN_PICK_UP_POINT",
  },
  {
    label: "filterTransaction:label.select.inDelivery",
    id: "IN_DELIVERY",
  },
  {
    label: "filterTransaction:label.select.inDeliveryPoint",
    id: "IN_DELIVERY_POINT",
  },
  {
    label: "filterTransaction:label.select.delivered",
    id: "DELIVERED",
  },
  {
    label: "filterTransaction:label.select.inReturnToSender",
    id: "IN_RETURN_TO_SENDER",
  },
  {
    label: "filterTransaction:label.select.returnedToSender",
    id: "RETURNED_TO_SENDER",
  },
  {
    label: "filterTransaction:label.select.lost",
    id: "LOST",
  },
  {
    label: "filterTransaction:label.select.cancel",
    id: "CANCEL",
  },
];

export const FILTER_PRELIQUIDATION_OPTIONS = [
  {
    label: "preli:label.select.initial",
    id: "initial ",
  },
  {
    label: "preli:label.select.pending",
    id: "pending",
  },
  {
    label: "preli:label.select.in_approvement",
    id: "in_approvement",
  },
  {
    label: "preli:label.select.approved",
    id: "approved",
  },
  {
    label: "preli:label.select.pending_accounting",
    id: "pending_accounting",
  },
  {
    label: "preli:label.select.in_accounting",
    id: "IN_ACCOUNTING",
  },
  {
    label: "preli:label.select.generated_payment",
    id: "generated_payment",
  },
  {
    label: "preli:label.select.invoice_rejected",
    id: "invoice_rejected",
  },

];

export const FILTER_PICKERS_OPTIONS = [
  {
    label: "filterPickers:label.select.all",
    value: "",
  },
  {
    label: "filterPickers:label.select.bicycle",
    value: "bicycle",
  },
  {
    label: "filterPickers:label.select.motorcycle",
    value: "motorcycle",
  },
];

export const TRANSACTION_STATE_ID_LABEL: any = {
  1: "filterTransaction:label.select.notAssigned",
  2: "filterTransaction:label.select.assigned",
  3: "filterTransaction:label.select.inPickup",
  4: "filterTransaction:label.select.inPickupPoint",
  5: "filterTransaction:label.select.retired",
  6: "filterTransaction:label.select.inDelivery",
  7: "filterTransaction:label.select.inDeliveryPoint",
  8: "filterTransaction:label.select.inReturnToSender",
  9: "filterTransaction:label.select.cancel",
  10: "filterTransaction:label.select.delivered",
  11: "filterTransaction:label.select.returnedToSender",
  12: "filterTransaction:label.select.lost",
};

export const TRANSACTION_STATE_TAG_LABEL: { [k in TransactionStatusType]: string } = {
  PENDING_ASSIGNMENT: "filterTransaction:label.select.notAssigned",
  ASSIGNED: "filterTransaction:label.select.assigned",
  IN_PICK_UP: "filterTransaction:label.select.inPickup",
  IN_PICK_UP_POINT: "filterTransaction:label.select.inPickupPoint",
  PICKED_UP: "filterTransaction:label.select.retired",
  IN_DELIVERY: "filterTransaction:label.select.inDelivery",
  IN_DELIVERY_POINT: "filterTransaction:label.select.inDeliveryPoint",
  IN_RETURN_TO_SENDER: "filterTransaction:label.select.inReturnToSender",
  CANCEL: "filterTransaction:label.select.cancel",
  DELIVERED: "filterTransaction:label.select.delivered",
  RETURNED_TO_SENDER: "filterTransaction:label.select.returnedToSender",
  LOST: "filterTransaction:label.select.lost",
  plus: "detailPreliquidation:label.tag.plus",
  subtract: "detailPreliquidation:label.tag.subtract"
};

export const TRANSACTION_ACTIONS_TAG_LABEL: any /*TransactionActionTagType*/ = {
  assigned_picker: "filterTransaction:label.select.assigned",
  un_assigning: "filterTransaction:label.select.pendingAssignment",
  state_pending_assigment: "filterTransaction:label.select.pendingAssignment",
  state_assigned: "filterTransaction:label.select.assigned",
  state_in_pickup: "filterTransaction:label.select.inPickup",
  state_in_pickup_point: "filterTransaction:label.select.inPickupPoint",
  state_in_picked_up: "filterTransaction:label.select.retired",
  state_in_delivery: "filterTransaction:label.select.inDelivery",
  state_in_delivery_point: "filterTransaction:label.select.inDeliveryPoint",
  state_in_devolution: "filterTransaction:label.select.inReturnToSender",
  state_pickup_cancelled_temporally: "filterTransaction:label.select.cancel",
  state_pickup_cancelled_permanently: "filterTransaction:label.select.cancel",
  state_delivered: "filterTransaction:label.select.delivered",
  state_returned: "filterTransaction:label.select.returnedToSender",
  state_lost: "filterTransaction:label.select.lost",
  state_initial: "filterTransaction:label.select.created",
};

export const DETAIL_PICKER_TAG: DetailPickerTagFileType = {
  "dni-front": "detailPicker:label.card.dniFront",
  "dni-back": "detailPicker:label.card.dniBack",
  "user-face": "detailPicker:label.card.userFace",
  "cbu-certificate": "detailPicker:label.card.cbuCertificate",
  "cuit-certificate": "detailPicker:label.card.cuitCertificate",
  "driver-license": "detailPicker:label.card.driverLicense",
  "vehicle-identification-back":
    "detailPicker:label.card.vehicleIdentificationBack",
  "vehicle-identification-front":
    "detailPicker:label.card.vehicleIdentificationFront",
  "driver-insurance-card": "detailPicker:label.card.driverInsuranceCard",
};

export const PRELIQUIDATION_TRANSACTIONS_LABELS = [
  "detailPreliquidation:label.table.id",
  "detailPreliquidation:label.table.date",
  "detailPreliquidation:label.table.status",
  "detailPreliquidation:label.table.amount",
]

export const MAX_FILE_SIZE = 5000000
export const PICKERS_MAX_FILE_SIZE = MAX_FILE_SIZE;
export const PICKERS_FILE_EXT = [
  "application/pdf",
  "image/png",
  "image/jpg",
  "image/jpeg",
];
