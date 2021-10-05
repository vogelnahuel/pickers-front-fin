export type tableTransactionPropsTypes={
    setOpenModalTransaction:Function,
    api:tableApiProps[],
    titulos:string[],
    cargarDatos:Function
}
export type tableApiProps={
    client: {
        name: string, 
        lastName: string, 
        identificationNumber: string, 
        phone: string
    }
    destination: {
        apartment: string
        country: string
        distance: number
        floor: string
        formattedAddress: string
        latitude: number
        locality: string
        longitude: number
        name: string
        neighborhood: string
        observation: string
        postalCode: string
        state: string
        street: string
        streetNumber: string
    }
    origin:{
        apartment: string
        country: string
        distance: number
        floor: string
        formattedAddress: string
        latitude: number
        locality: string
        longitude: number
        name: string
        neighborhood: string
        observation: string
        postalCode: string
        state: string
        street: string
        streetNumber: string
    }
    transaction:
        {   
            createdAt: string
            earning: any
            externalPickerId: number
            finishDeliveryTime: string
            id: number
            inAlert: boolean
            maxDeliveryDateTime: string
            minDeliveryDateTime: string
            orderNumber: string
            sellerId: number
            sla: string
            state:
            {   id:any
                name: string
                tag:  string
             }

            transactionCode: string
        }


}