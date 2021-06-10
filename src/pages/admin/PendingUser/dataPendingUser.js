/**si desea agregar campos y utilizar sus propias clases agregalas aca para inputs y select!*/
export const dataPendingUser = () => {
    const FieldsPart =
    [   
            { 
                label: {
                        labelclassName:"label-filter",
                        labelhtmlFor:"Nombre y apellido",
                        labelparrafo:"Nombre y apellido"
                        },
                    className:"filter-input",
                    type:"text",
                    name:"Nombre y apellido",
                    id:"Nombre y apellido",
                    placeholder:"Ingresá el Nombre y apellido",         
            
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
       ];

       return [FieldsPart];
}
