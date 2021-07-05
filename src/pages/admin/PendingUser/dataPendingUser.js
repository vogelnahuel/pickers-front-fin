/**si desea agregar campos y utilizar sus propias clases agregalas aca para inputs y select!*/
export const dataPendingUser = () => {
    const FieldsPart =
    [   
            { 
                label: {
                        labelclassName:"label-filter",
                        labelhtmlFor:"NyA",
                        labelparrafo:"Nombre y apellido"
                        },
                    className:"filter-input",
                    type:"text",
                    name:"NyA",
                    id:"NyA",
                    placeholder:"Ingresá el nombre y apellido",         
            
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
                placeholder:"Seleccioná un tipo de vehículo",
                options:[
                  {
                        classNameSelect:"option option2",
                        value:"",
                        text:"Todos"
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
                    // {
                    //     classNameSelect:"option",
                    //     value:"auto",
                    //     text:"Auto"
                    // }
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
                        placeholder:"Ingresá el email",                
            },
       ];

       return [FieldsPart];
}
