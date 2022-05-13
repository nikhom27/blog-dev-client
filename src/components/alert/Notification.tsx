import React from 'react'

export const showErrMsg = (msg: any) => {
    return <div className='errMsg'>{msg}</div>
}

export const showSuccessMsg = (msg: any) => {
    return <div className='successMsg'>{msg}</div>
}