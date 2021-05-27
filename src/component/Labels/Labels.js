import React from 'react'

export const Labels = (props) => {
    const {className,htmlFor,parrafo,width} = props;
    return (
        <label className={className} htmlFor={htmlFor} style={{width: `${width}vw` }}>
            {parrafo}
        </label>
    )
}
