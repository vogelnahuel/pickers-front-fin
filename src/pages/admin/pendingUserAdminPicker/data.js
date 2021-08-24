/**si desea agregar campos y utilizar sus propias clases agregalas aca para inputs y select!*/
/**Inclusive se pueden pasar componentes! fijarse  ComponentesPart*/
export const data = () => {
    const inputsPart1 =
    [   
        { 
        label: {
                labelclassName:"label-Admin-Pickers",
                labelhtmlFor:"nombre",
                labelparrafo:"Nombre/s *"
                },
            className:"Admin-Pickers-input",
            type:"text",
            name:"nombre",
            id:"nombre",
            placeholder:"Ingresá el nombre",
            onChange:"",
            value:""
            
        },
        {
            label: {
                labelclassName:"label-Admin-Pickers ",
                labelhtmlFor:"apellido",
                labelparrafo:"Apellido/s *"
                },
            className:"Admin-Pickers-input",
            type:"text",
            name:"apellido",
            id:"apellido",
            placeholder:"Ingresá el apellido",
            onChange:"",
            value:""
        },
        {
            label: {
                labelclassName:"label-Admin-Pickers readonly",
                labelhtmlFor:"dni",
                labelparrafo:"DNI"
                },
            className:"Admin-Pickers-input readonly",
            type:"text",
            name:"dni",
            id:"dni",
            placeholder:"Ingresá el DNI",
            onChange:"",
            value:""
        },
        {
            label: {
                labelclassName:"label-Admin-Pickers readonly",
                labelhtmlFor:"email",
                labelparrafo:"E-mail"
                },
            className:"Admin-Pickers-input readonly",
            type:"text",
            name:"email",
            id:"email",
            placeholder:"Ingresá el Email",
            onChange:"",
            value:""
        },
        {
            label: {
                labelclassName:"label-Admin-Pickers readonly",
                labelhtmlFor:"fechaNac",
                labelparrafo:"Fecha de nacimiento"
                },
            className:"Admin-Pickers-input readonly",
            type:"text",
            name:"fechaNac",
            id:"fechaNac",
            placeholder:"Ingresá la fecha nac",
            onChange:"",
            value:""
        },
        {
            label: {
                labelclassName:"label-Admin-Pickers-middle",
                labelhtmlFor:"CodArea",
                labelparrafo:"Código de área *"
                },
            className:"Admin-Pickers-input-middle",
            type:"text",
            name:"CodArea",
            id:"CodArea",
            placeholder:"Ingresá el Código de área *",
            onChange:"",
            value:""
        },
        {
            label: {
                labelclassName:"label-Admin-Pickers-middle",
                labelhtmlFor:"telefono",
                labelparrafo:"Teléfono *"
                },
            className:"Admin-Pickers-input-middle",
            type:"text",
            name:"telefono",
            id:"telefono",
            placeholder:"Ingresá el telefono",
            onChange:"",
            value:""
        },];

    const ComponentesPart1 = [
        // {
        //     componentType:"LoadAdminPicker",
        //     title:"Frente del DNI"
        // },
        // {
        //     componentType:"LoadAdminPicker",
        //     title:"Dorso del DNI"
        // },
        // {
        //     componentType:"LoadAdminPicker",
        //     title:"Rostro de frente"
        // }
    ]

  const inputsPart2 =
    [   
        { 
        label: {
                labelclassName:"label-Admin-Pickers readonly",
                labelhtmlFor:"cuit",
                labelparrafo:"Número de CUIT/CUIL "
                },
            className:"Admin-Pickers-input readonly",
            type:"text",
            name:"cuit",
            id:"cuit",
            placeholder:"20 - 39589475 - 4",
            value:"",
            onChange:"",
            
        },
           
        {
            label: {
                labelclassName:"label-Admin-Pickers readonly",
                labelhtmlFor:"cbu",
                labelparrafo:"Número de CBU"
                },
            className:"Admin-Pickers-input readonly",
            type:"text",
            name:"cbu",
            id:"cbu",
            placeholder:"20 - 39589475 - 4",
            value:"",
            onChange:"",
        },
        {
            label: {
                labelclassName:"label-Admin-Pickers readonly",
                labelhtmlFor:"nombreBanco",
                labelparrafo:"Nombre del banco"
                },
            className:"Admin-Pickers-input readonly",
            type:"text",
            name:"nombreBanco",
            id:"nombreBanco",
            placeholder:"Ingresá el Nombre",
            value:"",
            onChange:"",
        },
       ];

    const ComponentesPart2 = [
        // {
        //     componentType:"LoadAdminPicker",
        //     title:"Comprobante del alta fiscal"
        // },
        // {
        //     componentType:"LoadAdminPicker",
        //     title:"Comprobante del CBU"
        // }
    ]


    const inputsPart3 =
    [   
        { 
            label: {
                    labelclassName:"label-Admin-Pickers",
                    labelhtmlFor:"Patente del vehículo",
                    labelparrafo:"Patente del vehículo *"
                    },
                className:"Admin-Pickers-input",
                type:"text",
                name:"PatenteDelVehiculo",
                id:"PatenteDelVehiculo",
                placeholder:"Ingresá los dígitos de la patente",
                value:"",
                onChange:"",
                
        },
        { 
        label: {
                labelclassName:"label-Admin-Pickers",
                labelhtmlFor:"fechaVecLic",
                labelparrafo:"Vencimiento de la licencia *"
                },
            className:"Admin-Pickers-input",
            type:"text",
            name:"vencimientoLicencia",
            id:"fechaVecLic",
            placeholder:" día / mes / año",
            value:"",
            onChange:"",
            
        },
        {
            label: {
                labelclassName:"label-Admin-Pickers",
                labelhtmlFor:"fechaVecCel",
                labelparrafo:"Vencimiento de la cédula *"
                },
            className:"Admin-Pickers-input",
            type:"text",
            name:"fechaVecCel",
            id:"fechaVecCel",
            placeholder:" día / mes / año",
            value:"",
            onChange:"",
        },
       
    
        
        ];
    

    const ComponentesPart3 = [
            // {
            //     componentType:"LoadAdminPicker",
            //     title:"Licencia de conducir"
            // },
            // {
            //     componentType:"LoadAdminPicker",
            //     title:"Frente de la cédula"
            // },
            // {
            //     componentType:"LoadAdminPicker",
            //     title:"Dorso de la cédula"
            // },
            
            
        ];

        const inputsPart4 =
        [   
            {
                label: {
                    labelclassName:"label-Admin-Pickers",
                    labelhtmlFor:"fechaVecSeguroAuto",
                    labelparrafo:"Vencimiento del seguro de automotor *"
                    },
                className:"Admin-Pickers-input",
                type:"text",
                name:"fechaVecSeguroAuto",
                id:"fechaVecSeguroAuto",
                placeholder:" día / mes / año",
                value:"",
                onChange:"",
            },
            {
                label: {
                    labelclassName:"label-Admin-Pickers",
                    labelhtmlFor:"fechaVecSeguroAccidente",
                    labelparrafo:"Vencimiento del seguro de accidentes personales *",
                    labelwidth :39
                    },
                className:"Admin-Pickers-input",
                type:"text",
                name:"fechaVecSeguroAccidente",
                id:"fechaVecSeguroAccidente",
                placeholder:" día / mes / año",
                value:"",
                onChange:"",
            },
        ];

    const ComponentesPart4 = [
        // {
        //     componentType:"LoadAdminPicker",
        //     title:"Seguro de automotor",
        //     marginButton:22
        // },{
        //     componentType:"LoadAdminPicker",
        //     title:"Seguro de accidentes personales"
        // },
        ]
    return [inputsPart1,ComponentesPart1,inputsPart2,ComponentesPart2,inputsPart3,ComponentesPart3,inputsPart4,ComponentesPart4];
}
