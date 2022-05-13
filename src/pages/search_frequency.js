import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { RootStore } from '../utils/TypeScript'

import { 
    getReport_date_frequency,
    getReport_date_name_frequency,
    getReport_date_wait_success_frequency,
    getReport_date_name_wait_success_frequency,
    getReport_wait_success_frequency,
    getReport_name_wait_success_frequency,
    getReport_name__frequency
} from '../redux/actions/blogAction'
import moment from 'moment'

import ReactToExcel from 'react-html-table-to-excel'
//import jsPDF from 'jspdf'

const Data_search = () => {
  const {
    searchFrequency, 
    users, 
    AllFrequency_report, 
    wait_successFrequncy,
    wait_success_nameFrequncy,
    date_wait_successFrequncy,
    nameFreequency,
    date_name_wait_success
   } = useSelector((state) => state)

  const initialState = { 
    datestart: '', dateend: '', name_search: '' , wait_success: ''
  }
  const [Datevalue, setDateValue] = useState(initialState)
  const { datestart, dateend, name_search, wait_success } = Datevalue

  const dispatch = useDispatch()


  const handleChangeInput = (e) => {
    const {value, name} = e.target
    setDateValue({...Datevalue, [name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

     if(datestart === '' && dateend === '' && name_search === '' && wait_success !== ''){
        //console.log('เงื่อนไขที่ 5')
        dispatch(getReport_wait_success_frequency(Datevalue))
     }else if(datestart === '' && dateend === '' && name_search !== '' && wait_success !== ''){
        //console.log('เงื่อนไขที่ 6')
       dispatch(getReport_name_wait_success_frequency(Datevalue))
     }else if(datestart === '' && dateend === '' && name_search !== '' && wait_success === ''){
        //console.log('เงื่อนไขที่ 7')
       dispatch(getReport_name__frequency(Datevalue))
   }  

    if(name_search === '' && wait_success === '' ){
        // console.log('เงื่อนไข 1')
        dispatch(getReport_date_frequency(Datevalue))
    }else if(datestart !== '' && dateend !== '' && name_search !== '' && wait_success === ''){
       //console.log('เงื่อนไข 2')
       dispatch(getReport_date_name_frequency(Datevalue))
    }else if(datestart !== '' && dateend !== '' && name_search === '' && wait_success !== ''){
        // console.log('เงื่อนไข 3')
         dispatch(getReport_date_wait_success_frequency(Datevalue))
    }else if(datestart !== '' && dateend !== '' && name_search !== '' && wait_success !== ''){
        // console.log('เงื่อนไข 4')
        dispatch(getReport_date_name_wait_success_frequency(Datevalue))
    }

  }


var number = 1;
var total = 0;

  return (
    <div>

      <hr />

     <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Start</label>
          <div className="col-sm-10">
          <input className="form-control me-2" type="date" name="datestart" value={datestart} onChange={handleChangeInput}/>
          </div>
        </div>
        <div className="row mb-3">
          <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">End</label>
          <div className="col-sm-10">
          <input className="form-control me-2" type="date" name="dateend" value={dateend} onChange={handleChangeInput}/>
          </div>
        </div>

        <fieldset className="row mb-3">
          <legend className="col-form-label col-sm-2 pt-0">สถานะ</legend>
          <div className="col-sm-10">
          <select className="form-select" aria-label="Default select example" 
           value={wait_success}   name='wait_success'
             onChange={handleChangeInput}>
            <option value="" selected>เลือกทั้งหมด</option>
            <option value="wait">รอการแก้ไข (Wait)</option>
            <option value="success">แก้ไขเรียบร้อย (Success)</option>
          </select>
          </div>
        </fieldset>

        <fieldset className="row mb-3">
          <legend className="col-form-label col-sm-2 pt-0">สาขา</legend>
          <div className="col-sm-10">
          <select className="form-select" aria-label="Default select example" 
           value={name_search}   name='name_search'
             onChange={handleChangeInput}>
            <option value="" selected>เลือกทั้งหมด</option>
            {
              users.map(users => (
                <option key={users._id} value={users.name} >
                  {
                    users.name
                  }
                </option>
              ))
            }
          </select>
          </div>
        </fieldset>
      

        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>

    <hr />
    
    <div className="text-end" style={{ color: 'teal'}}>

        {
        searchFrequency.length !== 0 ? (
          //auth.user?.role === 'admin' && 
          <small className="ms-2">
              <ReactToExcel 
                id="test-table-xls-button"
                table="export-to-excel"
                filename="excelFile"
                sheet="sheet 1"
                buttonText={<i className="fas fa-file-excel" style={{fontSize:'30px', color: 'green'}}></i>}
              />
              &nbsp;&nbsp;
             {/**  <button onClick={downloadPdf}>PDF</button> */}
          </small>
        ): null
        }

    </div>

    <div className="text-end" style={{ color: 'teal'}}>
      {

      datestart === '' && wait_success === '' && name_search === '' &&

      AllFrequency_report.length !== 0 ? (
        //auth.user?.role === 'admin' && 
        <small className="ms-2">
            <ReactToExcel 
              id="test-table-xls-button"
              table="export-to-excel"
              filename="excelFile"
              sheet="sheet 1"
              buttonText={<i className="fas fa-file-excel" style={{fontSize:'30px', color: 'green'}}></i>}
            />
            &nbsp;&nbsp;
          {/**  <button onClick={downloadPdf}>PDF</button> */}
        </small>
      ): null
      }

      </div>


     {
      datestart === '' && wait_success === '' && name_search === '' &&
      <div>
      <table className="table" id='export-to-excel'>
         
         <thead>
             <tr>
             <th scope="col">ลำดับที่</th>
             <th scope="col">สาขาที่แจ้ง</th>
             <th scope="col">จำนวนครั้งที่แจ้ง</th>
             </tr>
         </thead>
         <tbody>
             {
                 
                 AllFrequency_report.length === 0 ? (
                     <tr>
                     <th scope="row"></th>
                     </tr>
                 ) : (
                     <>
                          {
                          
                          AllFrequency_report.map((data) => (
                           total = total + data.count,
                              <tr key={data._id}>
                                  <td>
                                    {
                                      number++
                                    }
                                  </td>
                                  <td> <Link to={`/jobbranch/${data._id}`}>{data.name}</Link></td>
                                  <td>{data.count}</td>  
                              </tr>
                          )) 
                          
                       }
                       <tr>
                         <td colSpan={2} style={{fontSize:'20px', color: 'green'}}>Total </td>
                         <td style={{fontSize:'20px', color: 'green'}}>{total}</td>  
                       </tr>

                     </> 
                 ) 
             }
         </tbody>
         </table>
      </div>
    } 


    {
      datestart !== '' && wait_success === '' &&
      <div>
             <table className="table" id='export-to-excel'>
       
       <thead>
           <tr>
           <th scope="col">ลำดับที่</th>
           <th scope="col">สาขาที่แจ้ง</th>
           <th scope="col">จำนวนครั้งที่แจ้ง</th>
           </tr>
       </thead>
       <tbody>
           {
               
               searchFrequency.length === 0 ? (
                   <tr>
                   <th scope="row"></th>
                   </tr>
               ) : (
                   <>
                   
                       {
                          
                          searchFrequency.map((data) => (
                           total = total + data.count,
                              <tr key={data._id}>
                                  <td>
                                    {
                                      number++
                                    }
                                  </td>
                                  <td> <Link to={`/jobbranch/${data._id}`}>{data.name}</Link></td>
                                  <td>{data.count}</td>  
                              </tr>
                          )) 
                          
                       }
                       <tr>
                         <td colSpan={2} style={{fontSize:'20px', color: 'green'}}>Total </td>
                         <td style={{fontSize:'20px', color: 'green'}}>{total}</td>  
                       </tr>
                   </>
               )
           }
       </tbody>
       </table>
      </div>
    }

      <div className="text-end" style={{ color: 'teal'}}>
            {
              
              wait_success !== '' && datestart === '' && name_search === '' &&

              wait_successFrequncy.length !== 0 ? (
              //auth.user?.role === 'admin' && 
              <small className="ms-2">
                  <ReactToExcel 
                    id="test-table-xls-button"
                    table="export-to-excel"
                    filename="excelFile"
                    sheet="sheet 1"
                    buttonText={<i className="fas fa-file-excel" style={{fontSize:'30px', color: 'green'}}></i>}
                  />
                  &nbsp;&nbsp;
                {/**  <button onClick={downloadPdf}>PDF</button> */}
              </small>
            ): null
            }

        </div>

    {
      wait_success !== '' && datestart === '' && name_search === '' &&
      <div>
             <table className="table" id='export-to-excel'>
       
       <thead>
           <tr>
           <th scope="col">ลำดับที่</th>
           <th scope="col">สาขาที่แจ้ง</th>
           <th scope="col">จำนวนครั้งที่แจ้ง</th>
           </tr>
       </thead>
       <tbody>
           {
               
               wait_successFrequncy.length === 0 ? (
                   <tr>
                   <th scope="row"></th>
                   </tr>
               ) : (
                   <>
                   
                       {
                          
                          wait_successFrequncy.map((data) => (
                           total = total + data.count,
                              <tr key={data._id}>
                                  <td>
                                    {
                                      number++
                                    }
                                  </td>
                                  <td> <Link to={`/jobbranch/${data._id}`}>{data.name}</Link></td>
                                  <td>{data.count}</td>  
                              </tr>
                          )) 
                          
                       }
                       <tr>
                         <td colSpan={2} style={{fontSize:'20px', color: 'green'}}>Total </td>
                         <td style={{fontSize:'20px', color: 'green'}}>{total}</td>  
                       </tr>
                   </>
               )
           }
       </tbody>
       </table>
      </div>
    }

      <div className="text-end" style={{ color: 'teal'}}>
            {
              
              wait_success !== '' && datestart === '' && name_search !== '' &&

              wait_success_nameFrequncy.length !== 0 ? (
              //auth.user?.role === 'admin' && 
              <small className="ms-2">
                  <ReactToExcel 
                    id="test-table-xls-button"
                    table="export-to-excel"
                    filename="excelFile"
                    sheet="sheet 1"
                    buttonText={<i className="fas fa-file-excel" style={{fontSize:'30px', color: 'green'}}></i>}
                  />
                  &nbsp;&nbsp;
                {/**  <button onClick={downloadPdf}>PDF</button> */}
              </small>
            ): null
            }

        </div>

    {
      wait_success !== '' && datestart === '' && name_search !== '' &&
      <div>
             <table className="table" id='export-to-excel'>
       
       <thead>
           <tr>
           <th scope="col">ลำดับที่</th>
           <th scope="col">สาขาที่แจ้ง</th>
           <th scope="col">จำนวนครั้งที่แจ้ง</th>
           </tr>
       </thead>
       <tbody>
           {
               
               wait_success_nameFrequncy.length === 0 ? (
                   <tr>
                   <th scope="row"></th>
                   </tr>
               ) : (
                   <>
                   
                       {
                          
                          wait_success_nameFrequncy.map((data) => (
                           total = total + data.count,
                              <tr key={data._id}>
                                  <td>
                                    {
                                      number++
                                    }
                                  </td>
                                  <td> <Link to={`/jobbranch/${data._id}`}>{data.name}</Link></td>
                                  <td>{data.count}</td>  
                              </tr>
                          )) 
                          
                       }
                       <tr>
                         <td colSpan={2} style={{fontSize:'20px', color: 'green'}}>Total </td>
                         <td style={{fontSize:'20px', color: 'green'}}>{total}</td>  
                       </tr>
                   </>
               )
           }
       </tbody>
       </table>
      </div>
    }

 <div className="text-end" style={{ color: 'teal'}}>
      {
        
        wait_success !== '' && datestart !== '' && name_search === '' &&

        date_wait_successFrequncy.length !== 0 ? (
        //auth.user?.role === 'admin' && 
        <small className="ms-2">
            <ReactToExcel 
              id="test-table-xls-button"
              table="export-to-excel"
              filename="excelFile"
              sheet="sheet 1"
              buttonText={<i className="fas fa-file-excel" style={{fontSize:'30px', color: 'green'}}></i>}
            />
            &nbsp;&nbsp;
          {/**  <button onClick={downloadPdf}>PDF</button> */}
        </small>
      ): null
      }

  </div>

    {
      wait_success !== '' && datestart !== '' && name_search === '' &&
      <div>
             <table className="table" id='export-to-excel'>
       
       <thead>
           <tr>
           <th scope="col">ลำดับที่</th>
           <th scope="col">สาขาที่แจ้ง</th>
           <th scope="col">จำนวนครั้งที่แจ้ง</th>
           </tr>
       </thead>
       <tbody>
           {
               
               date_wait_successFrequncy.length === 0 ? (
                   <tr>
                   <th scope="row"></th>
                   </tr>
               ) : (
                   <>
                   
                       {
                          
                          date_wait_successFrequncy.map((data) => (
                           total = total + data.count,
                              <tr key={data._id}>
                                  <td>
                                    {
                                      number++
                                    }
                                  </td>
                                  <td> <Link to={`/jobbranch/${data._id}`}>{data.name}</Link></td>
                                  <td>{data.count}</td>  
                              </tr>
                          )) 
                          
                       }
                       <tr>
                         <td colSpan={2} style={{fontSize:'20px', color: 'green'}}>Total </td>
                         <td style={{fontSize:'20px', color: 'green'}}>{total}</td>  
                       </tr>
                   </>
               )
           }
       </tbody>
       </table>
      </div>
    }

      <div className="text-end" style={{ color: 'teal'}}>
            {
              
              wait_success === '' && datestart === '' && name_search !== '' && wait_success === '' &&

              nameFreequency.length !== 0 ? (
              //auth.user?.role === 'admin' && 
              <small className="ms-2">
                  <ReactToExcel 
                    id="test-table-xls-button"
                    table="export-to-excel"
                    filename="excelFile"
                    sheet="sheet 1"
                    buttonText={<i className="fas fa-file-excel" style={{fontSize:'30px', color: 'green'}}></i>}
                  />
                  &nbsp;&nbsp;
                {/**  <button onClick={downloadPdf}>PDF</button> */}
              </small>
            ): null
            }

        </div>

    {
      wait_success === '' && datestart === '' && name_search !== '' && wait_success === '' &&
      <div>
             <table className="table" id='export-to-excel'>
       
       <thead>
           <tr>
           <th scope="col">ลำดับที่</th>
           <th scope="col">สาขาที่แจ้ง</th>
           <th scope="col">จำนวนครั้งที่แจ้ง</th>
           </tr>
       </thead>
       <tbody>
           {
               
               nameFreequency.length === 0 ? (
                   <tr>
                   <th scope="row"></th>
                   </tr>
               ) : (
                   <>
                   
                       {
                          
                          nameFreequency.map((data) => (
                           total = total + data.count,
                              <tr key={data._id}>
                                  <td>
                                    {
                                      number++
                                    }
                                  </td>
                                  <td> <Link to={`/jobbranch/${data._id}`}>{data.name}</Link></td>
                                  <td>{data.count}</td>  
                              </tr>
                          )) 
                          
                       }
                       <tr>
                         <td colSpan={2} style={{fontSize:'20px', color: 'green'}}>Total </td>
                         <td style={{fontSize:'20px', color: 'green'}}>{total}</td>  
                       </tr>
                   </>
               )
           }
       </tbody>
       </table>
      </div>
    }

    
 <div className="text-end" style={{ color: 'teal'}}>
      {
        
        wait_success !== '' && datestart !== '' && name_search !== '' && wait_success !== '' &&

        date_name_wait_success.length !== 0 ? (
        //auth.user?.role === 'admin' && 
        <small className="ms-2">
            <ReactToExcel 
              id="test-table-xls-button"
              table="export-to-excel"
              filename="excelFile"
              sheet="sheet 1"
              buttonText={<i className="fas fa-file-excel" style={{fontSize:'30px', color: 'green'}}></i>}
            />
            &nbsp;&nbsp;
          {/**  <button onClick={downloadPdf}>PDF</button> */}
        </small>
      ): null
      }

  </div>

    {
      wait_success !== '' && datestart !== '' && name_search !== '' && wait_success !== '' &&
      <div>
             <table className="table" id='export-to-excel'>
       
       <thead>
           <tr>
           <th scope="col">ลำดับที่</th>
           <th scope="col">สาขาที่แจ้ง</th>
           <th scope="col">จำนวนครั้งที่แจ้ง</th>
           </tr>
       </thead>
       <tbody>
           {
               
               date_name_wait_success.length === 0 ? (
                   <tr>
                   <th scope="row"></th>
                   </tr>
               ) : (
                   <>
                   
                       {
                          
                          date_name_wait_success.map((data) => (
                           total = total + data.count,
                              <tr key={data._id}>
                                  <td>
                                    {
                                      number++
                                    }
                                  </td>
                                  <td> <Link to={`/jobbranch/${data._id}`}>{data.name}</Link></td>
                                  <td>{data.count}</td>  
                              </tr>
                          )) 
                          
                       }
                       <tr>
                         <td colSpan={2} style={{fontSize:'20px', color: 'green'}}>Total </td>
                         <td style={{fontSize:'20px', color: 'green'}}>{total}</td>  
                       </tr>
                   </>
               )
           }
       </tbody>
       </table>
      </div>
    }

   </div>
  )
}

export default Data_search


