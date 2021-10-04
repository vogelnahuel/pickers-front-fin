export type filterTransaction = {
    minMinDeliveryDate:string,
    maxMinDeliveryDate:string,
    state:string,
    pickerId:number,
    inAlert:boolean,
    transactionCode:string
}

export type TransactionProps ={
    isExportDisabled:Function
    isFetching:boolean
    transactions:object
    getMoreTransactions:any
    getTransactionsExportRequest:Function
    filters:object
    seeMore:any
    filtersExtraSeeMore:Function
}
export type TransactionContainerType ={
     reset:Function
    ,setExtraFilters:Function
    ,getTransactions:Function
    ,setFilters:Function
}
export type URLTransactionContainerType ={
    minMinDeliveryDate?:string,
    maxMinDeliveryDate?:string,
    state?:string,
    date?:{
        from: string,
        until: string
    }
}
export  type TransactionContainerProps={
    isExportDisabled:boolean,
    isFetching:boolean,
    transactions:[],
    getMoreTransactions:Function,
    getTransactionsExportRequest:Function,
    filters:Object,
    seeMore:Function,
    filtersExtraSeeMore:Function,
}
export type FilterTransactionApi={
    

             transaction: {
                 id: number,
                 orderNumber: string,
                 transactionCode: string,
                 inAlert: boolean,
                 sellerId:  string ,
                  externalPickerId :  string ,
                  state : {
                      id : number,
                      name :  string ,
                      tag :  string 
                 },
                  sla :  string ,
                  minDeliveryDateTime :  string ,
                  maxDeliveryDateTime :  string ,
                  finishDeliveryTime :  string ,
                  createdAt :  string ,
                  earning : number // or null
             },
             origin : {
                 name :  string ,
                 street :  string ,
                 streetNumber :  string ,
                 locality :  string ,
                 neighborhood :  string ,
                 state :  string ,
                 postalCode :  string ,
                 country :  string ,
                 floor :  string ,
                 apartment :  string ,
                 observation :  string ,
                 latitude : number,
                 longitude : number,
                 formattedAddress :  string ,
                 distance : number
            },
             destination : {
                 name :  string ,
                 street :  string ,
                 neighborhood :  string ,
                 postalCode :  string ,
                 country :  string ,
                 floor :  string ,
                 apartment :  string ,
                 observation :  string ,
                 latitude : number,
                 longitude : number,
                 formattedAddress :  string ,
                 distance : number
            },
             client : {
                 name :  string ,
                 lastName :  string ,
                 identificationNumber :  string ,
                 phone :  string 
            },
             products : [
                {
                     weight : {
                         amount : number,
                         unit :  string
                    },
                     length : {
                         amount : number,
                         unit :  string
                    },
                     height : {
                         amount : number,
                         unit :  string
                    },
                     width : {
                         amount : number,
                         unit :  string
                    },
                     price : number,
                     sku :  string ,
                     amount : number
                }
            ],
             transactionHistory : [
                 {
                      id : number,
                      createdAt :  string ,
                      fieldEdited :  number ,
                      beforeValue : null,
                      curentValue :  number ,
                      reasonTag : {
                          id : number,
                          tag :  string 
                     },
                      metadata : []
                 },
                 {
                      id : number,
                      createdAt :  string ,
                      fieldEdited :  number ,
                      beforeValue :  number ,
                      curentValue :  number ,
                      reasonTag : {
                          id : number,
                          tag :  string 
                     },
                      metadata : [
                       {
                            key : number,
                            value :  string 
                       }
                     ]
                 }
             ],
              picker :{
                id : number,
                name :  string ,			
                surname :  string ,
                phone : {
                    countryNumber :  string ,
                    areaNumber :  string ,
                    number :  string 
               },
            },
             seller :{
                id : number,
                name :  string ,
                urlNotification : string ,
                tag :  string 
            }
        
     
}