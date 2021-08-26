import React from 'react'
import { Link } from 'react-router-dom';
import './card.scss'


export const Card = ({subtitle,url,title,number = "-",backgroundColor}) => {
    
    return (
        <Link to={url} className="card-body-admin"  style={{backgroundColor:`${backgroundColor}` }} >
            <div className="part-1">
                <p className="paragraph-admin-card">{subtitle}</p> 
                <p className="admin-black">{title}</p>
            </div>
            <div className="part-2">
                <p className="number-admin">{number}</p>
            </div>
         </Link>
    )
}
