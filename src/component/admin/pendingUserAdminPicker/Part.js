import React from 'react'
import { LoadAdminPicker } from '../LoadAdminPicker/LoadAdminPicker'
import {Labels}  from '../../Labels/Labels'
import {Input} from '../../inputs/Input.js'
import './part.css'
import { SaveAdminPicker } from '../SaveAdminPicker/SaveAdminPicker'

export const Part = (props) => {
    const variables = props.inputsPart;
    const componentes = props.ComponentesPart;
    
    return (
       <>
       
         {         

           
                            variables.map( variable => (
                                
                                    <div key={variable.id} className="Admin-Pickers-space">
                                        {   variable.type !== "" ? 
                                            <>
                                                <div>
                                                    <Labels width={variable.label.labelwidth} className={variable.label.labelclassName} htmlFor={variable.label.labelhtmlFor} parrafo={variable.label.labelparrafo} /> 
                                                </div>
                                                <div >
                                                    
                                                    <Input className={variable.className} type={variable.type} name={variable.name} id={variable.id} placeholder={variable.placeholder}/>
                                                </div>
                                            </>
                                        : null
                                        }        
                                       
                                    </div>  

                            ))
            
        }
                {
                    componentes.map(componente => (
                    <div key={componente.title} className="Admin-Pickers-space">
                        {
                            componente.componentType ==="LoadAdminPicker" ? 
                            <LoadAdminPicker
                                 titulo={componente.title}
                                 marginButton={componente.marginButton}
                            />   
                            :
                            null  
                        }
                        {
                            componente.componentType ==="SaveAdminPicker" ? 
                            <SaveAdminPicker
                                 titulo={componente.title}
                                 marginButton={componente.marginButton}
                            />   
                            :
                            null  
                        }
                             
                    </div>


                    ))
                }
                    
                    
        </>        

      
    )
}
