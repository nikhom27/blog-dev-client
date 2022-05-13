import React, { useState } from 'react'
import {useSelector, useDispatch } from 'react-redux'


import { RootStore } from '../../utils/TypeScript'
import { useHistory } from 'react-router-dom'

import { InputChange, FormSubmit } from '../../utils/TypeScript'
import { login } from '../../redux/actions/authAction'


const LoginPass = () => {
  const { auth } = useSelector((state: RootStore) => state)

  const history = useHistory()

  const initialState = { account: '', password: '' }
  const [userLogin, setUserLogin] = useState(initialState)
  const { account, password } = userLogin

  const [typePass, setTypePass] = useState(false)

  const dispatch = useDispatch()



  const handleChangeInput = (e: InputChange) => {
    const {value, name} = e.target
    setUserLogin({...userLogin, [name]:value})
  }

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    dispatch(login(userLogin))

   

    if(!auth.access_token) return;

    history.push(`/profile/${auth.user?._id}`)

  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="account" className="form-label">
           ID
        </label>

        <input type="text" className="form-control" id="account"
        name="account" value={account} onChange={handleChangeInput} />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="password" className="form-label">Password</label>

        <div className="pass">
          <input type={typePass ? "text" : "password"} 
          className="form-control" 
          id="password"
          name="password" value={password} 
          onChange={handleChangeInput} 
          />

          <small onClick={() => setTypePass(!typePass)}>
            {typePass ? 'Hide' : 'Show'}
          </small>
        </div>
      </div>

      <button type="submit" className="btn btn-dark w-100 mt-1"
      disabled={(account && password) ? false : true}>
        Login
      </button>
    </form>
  )
}

export default LoginPass
