import React, { useState } from 'react'
import {useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { IParams } from '../../utils/TypeScript'

import { FormSubmit, RootStore } from '../../utils/TypeScript'

import { SendSMS } from '../../redux/actions/smsAction'


const Send_SMS = () => {
    const { slug } = useParams<IParams>()
    const dispatch = useDispatch()

    const [phone, setPhone] = useState('')

    const { auth } = useSelector((state: RootStore) => state)

   

    const handleSubmit = async(e: FormSubmit) => {
        e.preventDefault()

        if(!auth.user?.name) return;

        dispatch(SendSMS(phone, slug, auth.user.name))
      }

    return (
        <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
            <select className="form-select" aria-label="Default select example" 
            onChange={e => setPhone(e.target.value)}>
                <option selected>Phone number</option>
                <option value="+66856495218">+66856495218(นิคม พรมเกตุ)</option>
                <option value="+66992929989">+66992929989(ระพีพันธ์ เงินหล่อ)</option>
                <option value="+66892306432">+66892306432(แคมป์)</option>
                <option value="+66877190015">+66877190015(ฉลอง)</option>
            </select>
        </div>

        <button type="submit" className="btn btn-dark ms-auto d-block px-4 mt-2">
          Send
        </button>

        </form>
    )
}

export default Send_SMS

