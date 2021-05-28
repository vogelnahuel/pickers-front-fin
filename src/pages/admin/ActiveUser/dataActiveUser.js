/**si desea agregar campos y utilizar sus propias clases agregalas aca para inputs y select!*/

export const dataActiveUser = () => {
    const FieldsPart =
    [   
            { 
                label: {
                        labelclassName:"label-filter",
                        labelhtmlFor:"nombre",
                        labelparrafo:"Nombre"
                        },
                    className:"filter-input",
                    type:"text",
                    name:"nombre",
                    id:"nombre",
                    placeholder:"Ingresá el nombre",      
            },
            { 
                label: {
                        labelclassName:"label-filter",
                        labelhtmlFor:"dni",
                        labelparrafo:"DNI"
                        },
                    className:"filter-input",
                    type:"text",
                    name:"dni",
                    id:"dni",
                    placeholder:"Ingresá el DNI",
              
                
            },
            { 
                label: {
                        labelclassName:"label-filter",
                        labelhtmlFor:"Vehículo",
                        labelparrafo:"Vehículo"
                        },
                type:"select",
                className:"filter-select",
                name:"Vehículo",
                id:"Vehículo",
                placeholder:"",
                options:[
                    {
                        hidden:true,
                        classNameSelect:"option",
                        value:"DEFAULT",
                        text:"Seleccioná un tipo de vehículo"
                    },
                    {
                        classNameSelect:"option",
                        value:"bicicleta",
                        text:"Bicicleta"
                    },
                    {
                        classNameSelect:"option",
                        value:"moto",
                        text:"Moto"

                    },
                    {
                        classNameSelect:"option",
                        value:"auto",
                        text:"Auto"
                    }
                ]
                
          },
            { 
                    label: {
                            labelclassName:"label-filter",
                            labelhtmlFor:"Email",
                            labelparrafo:"Email"
                            },
                        className:"filter-input",
                        type:"text",
                        name:"Email",
                        id:"Email",
                        placeholder:"Ingresá el Email",                
            },

            { 
                label: {
                        labelclassName:"label-filter",
                        labelhtmlFor:"transacciones",
                        labelparrafo:"Más de X transacciones"
                        },
                type:"select",
                className:"filter-select",
                name:"transacciones",
                id:"transacciones",
                placeholder:"transacciones",
                options:[
                    {
                        hidden:true,
                        classNameSelect:"option",
                        value:"DEFAULT",
                        text:"Seleccioná un valor"
                    },
                    {
                        classNameSelect:"option",
                        value:"10",
                        text:"10"
                    },
                    {
                        classNameSelect:"option",
                        value:"5",
                        text:"5"

                    },
                    {
                        classNameSelect:"option",
                        value:"2",
                        text:"2"
                    }
                ]
                
          },
          
       ];

       return [FieldsPart];
}
