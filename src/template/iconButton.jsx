import React from 'react'
import Iff from './iff'

export default props => (
    <Iff test={!props.hide}>
        <button className={'btn btn-'+ props.style}
            onClick={props.onClick}>
            <i className={'fa fa-'+ props.icon}></i>
        </button>
    </Iff>            
)
