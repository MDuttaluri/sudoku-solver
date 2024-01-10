import React from 'react'
import { useContext } from 'react'
import { AlertContext, useAlert } from '../../App'




function Alert() {
    const alertContextData = useAlert();
    
    return (
        <div>
            <h3>{alertContextData.alertMessage}</h3>
        </div>
    )
}

export default Alert
