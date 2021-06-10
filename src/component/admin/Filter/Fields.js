import React from 'react'

/**recorro la data y empiezo a mostrar los inputs o select con sus opciones y clases pasadas */
/****si desea agregar funcionalidad o diseño debe modificar la data y los inputs para que funcione ejemplo un onKeyPress onclick*/
export const Fields = (props) => {
    const variables=props.FieldsPart;

    
    return (
        <>

                {
                    
                    variables.map(variable => (
                        <div key={variable.id} className="filter-space">
                           {
                               variable.type!=="select" && variable.type!=="" ?
                                    <>
                                     <div>
                                        <label className={variable.label.labelclassName} htmlFor={variable.label.labelhtmlFor}>{variable.label.labelparrafo}</label>
                                    </div>
                                    <div>
                                        <input className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>
                                    </div>  
                                    
                                    </>
                                 : null                       
                                 
                            }
                            {
                                variable.type==="select" && variable.type!==""?
                                    <>
                                            <div>
                                                <label className={variable.label.labelclassName} htmlFor={variable.label.labelhtmlFor}>{variable.label.labelparrafo}</label>
                                            </div>
                                            <div>
                                                    <select className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}>            
                                                            {
                                                            variable.options.map(option => (
                                                                    <option key={option.text} hidden={option.hidden} className={option.classNameSelect}  value={option.value}>{option.text}</option>
                                                            ))  
                                                            }
                                                    </select>
                                            </div> 
                                    </>
                                : null

                            }
                                
                        </div>
                    ))
                }
               
                        
                       
         </>
    )
}
