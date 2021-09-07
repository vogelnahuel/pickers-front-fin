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
        label: 'En punto de retiro',
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
        label: 'Entregado',
        id: 'DELIVERED',
    },
    {
        label: 'En devolución',
        id: 'IN_RETURN_TO_SENDER',
    },
    {
        label: 'Devuelto a origen',
        id: 'RETURNED_TO_SENDER',
    },
    {
        label: 'Siniestrador',
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
