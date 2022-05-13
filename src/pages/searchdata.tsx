import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { RootStore } from '../utils/TypeScript'

import { InputChange, FormSubmit } from '../utils/TypeScript'

import { getHomeReport } from '../redux/actions/blogAction'


const Data_search = () => {
  const {auth, searchdata } = useSelector((state: RootStore) => state)

  const initialState = { 
    datestart: '', dateend: ''
  }
  const [Datevalue, setDateValue] = useState(initialState)
  const { datestart, dateend } = Datevalue

  const dispatch = useDispatch()

  const handleChangeInput = (e: InputChange) => {
    const {value, name} = e.target
    setDateValue({...Datevalue, [name]:value})
  }

  const handleSubmit = (e: FormSubmit) => {
    e.preventDefault()
    dispatch(getHomeReport(Datevalue))
  }

  return (
    <div>

      <hr />

      <form className="d-flex" onSubmit={handleSubmit}>
        <label htmlFor="name" className="form-label">Start</label>
        <input className="form-control me-2" type="date" name="datestart" value={datestart} onChange={handleChangeInput}/>
        <label htmlFor="name" className="form-label">End</label>
        <input className="form-control me-2" type="date" name="dateend" value={dateend} onChange={handleChangeInput}/>
        <button className="btn btn-outline-success" type="submit">Search</button>
    </form>

    <hr />
    
    <div className="text-end" style={{ color: 'teal'}}>

        {
        searchdata.length !== 0 ? (
          auth.user?.role === 'admin' && 
          <small className="ms-2">
            {/**  <CSVLink data={data} headers={headers}><i className="fas fa-file-csv" style={{fontSize:'25px'}}></i></CSVLink>
                  &nbsp;&nbsp;
              <CSVLink data={csvData}><i className="fas fa-file-pdf" style={{fontSize:'25px', color: 'red'}}></i></CSVLink>
            */} 
          </small>
        ): null
        }

    </div>

     <table className="table">
        <thead>
            <tr>
            <th scope="col">วันที่แจ้ง</th>
            <th scope="col">วันที่แก้ไข</th>
            <th scope="col">สถานะ</th>
            <th scope="col">สาขา</th>
            <th scope="col">เรื่อง</th>
            <th scope="col">รายละเอียด</th>
            
            </tr>
        </thead>
        <tbody>
            {
                searchdata.length === 0 ? (
                    <tr>
                    <th scope="row"></th>
                    </tr>
                ) : (
                    <>
                        {
                           searchdata.map((data) => (
                               <tr key={data._id}>
                                   <td>{new Date(data.createdAt).toLocaleString()}</td>
                                   <td>{new Date(data.updatedAt).toLocaleString()}</td>
                                   <td>{data.wait_success}</td>
                                   <td>{data.name}</td>
                                   <td>{data.title}</td>
                                   <td>{data.description}</td>
                                   
                               </tr>
                           )) 
                        }
                    </>
                )
            }
        </tbody>
        </table>

   </div>
  )
}

export default Data_search

