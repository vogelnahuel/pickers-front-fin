export const titulosAdminPending = [
    "Nombre",
    "DNI",
    "Email",
    "Vehículo",
    "Pendiente hace",
    "Editar",
];
export const titulosAdminActive = [
    "Nombre",
    "DNI",
    "Email",
    "Vehículo",
    "Estado",
    "Editar",
];
export const DATE_FORMATS = {
    regex: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
    fullDate: "DD/MM/YYYY H:mm:ss",
    fullHour: "HH:mm:ss",
    mediumDate: "DD/MM/YYYY h:mm",
    shortDate: "DD/MM/YYYY",
    shortDateMoment: "DD/MM/YYYY",
    cardBodyExpirationDate: "DD/MM/YYYY",
    dateWithoutSeparator: "YYYMMDD",
    periodFormat: "MM/YYYY",
};
export const VALIDATION_REGEX = {
    expName :/^[a-z ,.'-]+$/i,
    expIdentificationNumber : /^[\d]{0,3}\.?[\d]{0,3}\.?[\d]{0,3}$/,
}

export const FILTER_TRANSACTION_OPTIONS = [
    {
        label: 'Sin asignar',
        id: 'PENDING_ASSIGNMENT',
    },
    {
        label: 'En retiro',
        id: 'IN_PICK_UP',
    },
    {
        label: 'En lugar de retiro',
        id: 'IN_PICK_UP_POINT',
    },
    // {
    //     label: 'Retirado',
    //     id: 'PICKED_UP',
    // },
    {
        label: 'En entrega ',
        id: 'DELIVERED',
    },
    {
        label: 'En lugar de entrega',
        id: 'IN_DELIVERY_POINT',
    },
    {
        label: 'En devolución',
        id: 'IN_RETURN_TO_SENDER',
    },
    {
        label: 'Devuelto',
        id: 'RETURNED_TO_SENDER',
    },
    {
        label: 'Siniestrado',
        id: 'LOST',
    },
    {
        label: 'Cancelado',
        id: 'CANCEL',
    }
];

export const FILTER_PICKERS_OPTIONS = [
    {
        label: 'Todos',
        value: '',
    },
    {
        label: 'Bicicleta',
        value: 'bicycle',
    },
    {
        label: 'Moto',
        value: 'motorcycle',
    },
];


export const TRANSACTION_STATE_ID_LABEL = {
    1:    'Sin asignar',
    2:    'Asignado',
    3:    'En retiro',
    4:    'En lugar de retiro',
    5:    'Retirado',
    6:    'En entrega',
    7:    'En lugar de entrega',
    8:    'En devolución',
    9:    'Cancelado',
    10:   'Entregado',
    11:    'Devuelto',
    12:    'Siniestrado',
}
export const TRANSACTION_STATE_TAG_LABEL = {
    'PENDING_ASSIGNMENT': 'Sin asignar',
    'ASSIGNED':'Asignado',
    'IN_PICK_UP':'En retiro',
    'IN_PICK_UP_POINT':'En lugar de retiro',
    'PICKED_UP':'Retirado',
    'IN_DELIVERY':'En entrega',
    'IN_DELIVERY_POINT':'En lugar de entrega',
    'IN_RETURN_TO_SENDER':'En devolución',
    'CANCEL':'Cancelado',
    'DELIVERED':'Entregado',
    'RETURNED_TO_SENDER':'Devuelto',
    'LOST':'Siniestrado',
}
