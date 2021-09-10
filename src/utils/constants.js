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
    {
        label: 'Retirado',
        id: 'PICKED_UP',
    },
    {
        label: 'En lugar de entrega',
        id: 'IN_DELIVERY_POINT',
    },
    {
        label: 'En entrega ',
        id: 'DELIVERED',
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
        label: 'Cancelada',
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


export const FILTER_TRANSACTION_OPTIONS_LABEL_ID = [
    {
        label: 'Sin asignar',
        id: 1,
    },
    {
        label: 'Asignado',
        id: 2,
    },
    {
        label: 'En retiro',
        id: 3,
    },
    {
        label: 'En lugar de retiro',
        id: 4,
    },
    {
        label: 'Retirado',
        id: 5,
    },
    {
        label: 'En lugar de entrega',
        id: 7,
    },
    {
        label: 'En entrega',
        id: 6,
    },
    {
        label: 'En devolución',
        id: 8,
    },
    {
        label: 'Entregado',
        id: 10,
    },
    {
        label: 'Devuelto',
        id: 11,
    },
    {
        label: 'Siniestrado',
        id: 12,
    },
    {
        label: 'Cancelada',
        id: 9,
    }
];
