import { TransactionResponseTypeResult } from "sagas/types/transactions"

export type GetTransactionIdType={
    id:number
}
export type postDevolutionUndeliveredType={
    impossibleDeliveryReasonId:number
}
export type postCancelType={
    cancellationReasonId:number
}
export type postDevolutionUndeliveredResponseType={
        result: TransactionResponseTypeResult
}
export type postDnideliveredResponseType={
    id:number
    key: number,
    value: string
}
export type TransactionCancelResponseType={
    
          result  : {
              items  : [
                {
                      id  : 1,
                      message  :   string  ,
                      internal  : boolean
                },
                {
                      id  : 2,
                      message  :   string  ,
                      internal  : boolean
                },
                {
                      id  : 3,
                      message  :   string  ,
                      internal  : boolean
                },
                {
                      id  : 4,
                      message  :   string  ,
                      internal  : boolean
                },
                {
                      id  : 5,
                      message  :   string  ,
                      internal  : boolean
                },
                {
                      id  : 6,
                      message  :   string  ,
                      internal  : boolean
                },
                {
                      id  : 7,
                      message  :   string  ,
                      internal  : boolean
                },
                {
                      id  : 8,
                      message  :   string  ,
                      internal  : boolean
                }
            ]
        }
}
export type  transactionUndeliverableType={
    
         result : {
             items : [
                {
                     id : 1,
                     message :  string ,
                     internal : boolean
                },
                {
                     id : 2,
                     message :  string ,
                     internal : boolean
                },
                {
                     id : 3,
                     message :  string ,
                     internal : boolean
                },
                {
                     id : 4,
                     message :  string ,
                     internal : boolean
                }
            ]
        }
    
}
export type  TransactionIdResponseType={
    
         result : {
              transaction : {
                  id : number,
                  orderNumber :  string ,
                  transactionCode :  string ,
                  inAlert : boolean,
                  sellerId :  string ,
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
                         unit :  number 
                    },
                     length : {
                         amount : number,
                         unit :  number 
                    },
                     height : {
                         amount : number,
                         unit :  number 
                    },
                     width : {
                         amount : number,
                         unit :  number 
                    },
                     price : number,
                     sku :  string ,
                     amount : number
                }
            ],
             transactionHistory : [
                 {
                      id : number,
                      createdAt :  string,
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
                      createdAt : string ,
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
     
}