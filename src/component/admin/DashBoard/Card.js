import React from 'react'

export const Card = (props) => {

    const {subtitle,title,number,backgroundColor}=props;
    return (
        <div className="card-body-admin"  style={{backgroundColor:`${backgroundColor}` }} >
            <div className="part-1">
                <p className="paragraph-admin-card">{subtitle}</p> 
                <p className="admin-black">{title}</p>
            </div>
            <div className="part-2">
                <p className="number-admin">{number}</p>
            </div>
         </div>
    )
}
