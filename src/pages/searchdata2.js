import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { 
  getHomeReport, 
  getWait_Success_report, 
  getWait_Success_report_name, 
  getWait_Success_report_name_category,
  getReport_date_name,
  getReport_date_name_category,
  getReport_date__category,
  getReport_wait_success,
  getReport_wait_success_name,
  getReport_wait_success_name_category,
  getReport_name,
  getReport_catagory,
  getReport_wait_success__category
} from '../redux/actions/blogAction'
import moment from 'moment'

import ReactToExcel from 'react-html-table-to-excel'
//import jsPDF from 'jspdf'

const Data_search = () => {
  const {auth, searchdata, categories, users, AllSummary_report } = useSelector((state) => state)

  const initialState = { 
    datestart: '', dateend: '', wait_success: '', name_search: '', categories_search: ''
  }
  const [Datevalue, setDateValue] = useState(initialState)
  const { datestart, dateend, wait_success, name_search, categories_search } = Datevalue

  const dispatch = useDispatch()


  const handleChangeInput = (e) => {
    const {value, name} = e.target
    setDateValue({...Datevalue, [name]:value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(datestart === '' && dateend === '' && name_search === '' && wait_success !== '' && categories_search === ''){
      //console.log('เงื่อนไขที่ 8')
      dispatch(getReport_wait_success(Datevalue))
     }else if(datestart === '' && dateend === '' && name_search !== '' && wait_success !== '' && categories_search === ''){
      // console.log('เงื่อนไขที่ 9')
       dispatch(getReport_wait_success_name(Datevalue))
     }else if(datestart === '' && dateend === '' && name_search !== '' && wait_success !== '' && categories_search !== ''){
      //console.log('เงื่อนไขที่ 10')
       dispatch(getReport_wait_success_name_category(Datevalue))
    }else if(datestart === '' && dateend === '' && name_search !== '' && wait_success === '' && categories_search === ''){
       //console.log('เงื่อนไขที่ 11')
        dispatch(getReport_name(Datevalue))
    }else if(datestart === '' && dateend === '' && name_search === '' && wait_success === '' && categories_search !== ''){
       // console.log('เงื่อนไขที่ 12')
        dispatch(getReport_catagory(Datevalue))
   }else if(datestart === '' && dateend === '' && name_search === '' && wait_success !== '' && categories_search !== ''){
       console.log('เงื่อนไขที่ 13')
        dispatch(getReport_wait_success__category(Datevalue))
}

    if(datestart !== '' && dateend !== '' && wait_success === '' && name_search === '' && categories_search === '' ){
        //console.log('เงื่อนไข 1')
        dispatch(getHomeReport(Datevalue))
    }else if(datestart !== '' && dateend !== '' && wait_success !== '' && name_search === '' && categories_search === ''){
       console.log('เงื่อนไข 2')
       dispatch(getWait_Success_report(Datevalue))
    }else if(datestart !== '' && dateend !== '' && wait_success !== '' && name_search !== '' && categories_search === ''){
       //console.log('เงื่อนไข 3')
        dispatch(getWait_Success_report_name(Datevalue))
    }else if(datestart !== '' && dateend !== '' && wait_success !== '' && name_search !== '' && categories_search !== ''){
        //console.log('เงื่อนไข 4')
        dispatch(getWait_Success_report_name_category(Datevalue))
    }else if(datestart !== '' && dateend !== '' && wait_success === '' && name_search !== '' && categories_search === ''){
        //console.log('เงื่อนไข 5')
       dispatch(getReport_date_name(Datevalue))
    }else if(datestart !== '' && dateend !== '' && wait_success === '' && name_search !== '' && categories_search !== ''){
        //console.log('เงื่อนไข 6')
      dispatch(getReport_date_name_category(Datevalue))
    }else if(datestart !== '' && dateend !== '' && wait_success === '' && name_search === '' && categories_search !== ''){
       //console.log('เงื่อนไข 7')
      dispatch(getReport_date__category(Datevalue))
    }
    
  }


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

        <fieldset className="row mb-3">
          <legend className="col-form-label col-sm-2 pt-0">ประเภทงาน</legend>
          <div className="col-sm-10">
          <select className="form-select" aria-label="Default select example" 
           value={categories_search}   name='categories_search'
             onChange={handleChangeInput}>
            <option value="" selected>เลือกทั้งหมด</option>
            {
              categories.map(category => (
                <option key={category._id} value={category._id} >
                   {
                     category.name
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
        searchdata.length !== 0 ? (
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
      datestart === '' && dateend === '' && name_search === '' && wait_success === '' && categories_search === '' &&
      <div>
      <table className="table" id='export-to-excel'>
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
              AllSummary_report.length === 0 ? (
                  <tr>
                  <th scope="row"></th>
                  </tr>
              ) : (
                  <>
                      {
                         AllSummary_report.map((data) => (
                             <tr key={data._id}>
                               {/**   <td>{new Date(data.createdAt).toLocaleString()}</td> */}
                                  <td>{moment(data.createdAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                  {
                                      // data.wait_success === 'success' &&
                                       //new Date(data.updatedAt).toLocaleString()
                                       //<td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>

                                       data.wait_success === 'success' ? (
                                          <td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                       ): (
                                          <td></td>
                                       )
                                      
                                  }
                                  {
                                          data.wait_success === 'wait' ? (
                                            <td style={{color: '#FF8C00', fontSize: '20px'}}>{data.wait_success}</td>
                                          ): (
                                            <td style={{color: 'green', fontSize: '20px'}}>{data.wait_success}</td>
                                          )
                                    }
                                 <td>{data.name}</td>
                                 <td><Link to={`/blog/${data._id}`} 
                                 style={{
                                  textDecoration: 'none', textTransform: 'capitalize'
                                 }}>{data.title}</Link></td>
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
    }
      {/* เงื่อนไขที่ 1 */}
    {
      datestart !== '' && dateend !== '' && name_search === '' && wait_success === '' && categories_search === '' &&
      <div>
      <table className="table" id='export-to-excel'>
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
                               {/**   <td>{new Date(data.createdAt).toLocaleString()}</td> */}
                                  <td>{moment(data.createdAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                  {
                                      // data.wait_success === 'success' &&
                                       //new Date(data.updatedAt).toLocaleString()
                                       //<td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>

                                       data.wait_success === 'success' ? (
                                          <td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                       ): (
                                          <td></td>
                                       )
                                      
                                  }
                                  {
                                          data.wait_success === 'wait' ? (
                                            <td style={{color: '#FF8C00', fontSize: '20px'}}>{data.wait_success}</td>
                                          ): (
                                            <td style={{color: 'green', fontSize: '20px'}}>{data.wait_success}</td>
                                          )
                                    }
                                 <td>{data.name}</td>
                                 <td><Link to={`/blog/${data._id}`} 
                                 style={{
                                  textDecoration: 'none', textTransform: 'capitalize'
                                 }}>{data.title}</Link></td>
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
    } 
        {/* เงื่อนไขที่ 2 */}
    {
      datestart !== '' && dateend !== '' && name_search === '' && wait_success !== '' && categories_search === '' &&
      <div>
      <table className="table" id='export-to-excel'>
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
                               {/**   <td>{new Date(data.createdAt).toLocaleString()}</td> */}
                                  <td>{moment(data.createdAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                  {
                                      // data.wait_success === 'success' &&
                                       //new Date(data.updatedAt).toLocaleString()
                                       //<td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>

                                       data.wait_success === 'success' ? (
                                          <td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                       ): (
                                          <td></td>
                                       )
                                      
                                  }
                                  {
                                          data.wait_success === 'wait' ? (
                                            <td style={{color: '#FF8C00', fontSize: '20px'}}>{data.wait_success}</td>
                                          ): (
                                            <td style={{color: 'green', fontSize: '20px'}}>{data.wait_success}</td>
                                          )
                                    }
                                 <td>{data.name}</td>
                                 <td><Link to={`/blog/${data._id}`} 
                                 style={{
                                  textDecoration: 'none', textTransform: 'capitalize'
                                 }}>{data.title}</Link></td>
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
    }
            {/* เงื่อนไขที่ 3 */}
   {
      datestart !== '' && dateend !== '' && name_search !== '' && wait_success !== '' && categories_search === '' &&
      <div>
      <table className="table" id='export-to-excel'>
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
                               {/**   <td>{new Date(data.createdAt).toLocaleString()}</td> */}
                                  <td>{moment(data.createdAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                  {
                                      // data.wait_success === 'success' &&
                                       //new Date(data.updatedAt).toLocaleString()
                                       //<td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>

                                       data.wait_success === 'success' ? (
                                          <td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                       ): (
                                          <td></td>
                                       )
                                      
                                  }
                                  {
                                          data.wait_success === 'wait' ? (
                                            <td style={{color: '#FF8C00', fontSize: '20px'}}>{data.wait_success}</td>
                                          ): (
                                            <td style={{color: 'green', fontSize: '20px'}}>{data.wait_success}</td>
                                          )
                                    }
                                 <td>{data.name}</td>
                                 <td><Link to={`/blog/${data._id}`} 
                                 style={{
                                  textDecoration: 'none', textTransform: 'capitalize'
                                 }}>{data.title}</Link></td>
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
    }        
      {/* เงื่อนไขที่ 4 */}
    {
      datestart !== '' && dateend !== '' && name_search !== '' && wait_success !== '' && categories_search !== '' &&
      <div>
      <table className="table" id='export-to-excel'>
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
                               {/**   <td>{new Date(data.createdAt).toLocaleString()}</td> */}
                                  <td>{moment(data.createdAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                  {
                                      // data.wait_success === 'success' &&
                                       //new Date(data.updatedAt).toLocaleString()
                                       //<td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>

                                       data.wait_success === 'success' ? (
                                          <td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                       ): (
                                          <td></td>
                                       )
                                      
                                  }
                                  {
                                          data.wait_success === 'wait' ? (
                                            <td style={{color: '#FF8C00', fontSize: '20px'}}>{data.wait_success}</td>
                                          ): (
                                            <td style={{color: 'green', fontSize: '20px'}}>{data.wait_success}</td>
                                          )
                                    }
                                 <td>{data.name}</td>
                                 <td><Link to={`/blog/${data._id}`} 
                                 style={{
                                  textDecoration: 'none', textTransform: 'capitalize'
                                 }}>{data.title}</Link></td>
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
    }
      {/* เงื่อนไขที่ 5 */}
    {
      datestart !== '' && dateend !== '' && wait_success === '' && name_search !== '' && categories_search === '' &&
      <div>
      <table className="table" id='export-to-excel'>
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
                               {/**   <td>{new Date(data.createdAt).toLocaleString()}</td> */}
                                  <td>{moment(data.createdAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                  {
                                      // data.wait_success === 'success' &&
                                       //new Date(data.updatedAt).toLocaleString()
                                       //<td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>

                                       data.wait_success === 'success' ? (
                                          <td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                       ): (
                                          <td></td>
                                       )
                                      
                                  }
                                  {
                                          data.wait_success === 'wait' ? (
                                            <td style={{color: '#FF8C00', fontSize: '20px'}}>{data.wait_success}</td>
                                          ): (
                                            <td style={{color: 'green', fontSize: '20px'}}>{data.wait_success}</td>
                                          )
                                    }
                                 <td>{data.name}</td>
                                 <td><Link to={`/blog/${data._id}`} 
                                 style={{
                                  textDecoration: 'none', textTransform: 'capitalize'
                                 }}>{data.title}</Link></td>
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
    }

      {/* เงื่อนไขที่ 6 */}
   {
      datestart !== '' && dateend !== '' && wait_success === '' && name_search !== '' && categories_search !== '' &&
      <div>
      <table className="table" id='export-to-excel'>
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
                               {/**   <td>{new Date(data.createdAt).toLocaleString()}</td> */}
                                  <td>{moment(data.createdAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                  {
                                      // data.wait_success === 'success' &&
                                       //new Date(data.updatedAt).toLocaleString()
                                       //<td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>

                                       data.wait_success === 'success' ? (
                                          <td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                       ): (
                                          <td></td>
                                       )
                                      
                                  }
                                  {
                                          data.wait_success === 'wait' ? (
                                            <td style={{color: '#FF8C00', fontSize: '20px'}}>{data.wait_success}</td>
                                          ): (
                                            <td style={{color: 'green', fontSize: '20px'}}>{data.wait_success}</td>
                                          )
                                    }
                                 <td>{data.name}</td>
                                 <td><Link to={`/blog/${data._id}`} 
                                 style={{
                                  textDecoration: 'none', textTransform: 'capitalize'
                                 }}>{data.title}</Link></td>
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
    }

      {/* เงื่อนไขที่ 7 */}
    {
      datestart !== '' && dateend !== '' && wait_success === '' && name_search === '' && categories_search !== '' &&
      <div>
      <table className="table" id='export-to-excel'>
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
                               {/**   <td>{new Date(data.createdAt).toLocaleString()}</td> */}
                                  <td>{moment(data.createdAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                  {
                                      // data.wait_success === 'success' &&
                                       //new Date(data.updatedAt).toLocaleString()
                                       //<td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>

                                       data.wait_success === 'success' ? (
                                          <td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                       ): (
                                          <td></td>
                                       )
                                      
                                  }
                                  {
                                          data.wait_success === 'wait' ? (
                                            <td style={{color: '#FF8C00', fontSize: '20px'}}>{data.wait_success}</td>
                                          ): (
                                            <td style={{color: 'green', fontSize: '20px'}}>{data.wait_success}</td>
                                          )
                                    }
                                 <td>{data.name}</td>
                                 <td><Link to={`/blog/${data._id}`} 
                                 style={{
                                  textDecoration: 'none', textTransform: 'capitalize'
                                 }}>{data.title}</Link></td>
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
    }
      {/* เงื่อนไขที่ 8 */}
      {
      datestart === '' && dateend === '' && name_search === '' && wait_success !== '' && categories_search === '' &&
      <div>
      <table className="table" id='export-to-excel'>
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
                               {/**   <td>{new Date(data.createdAt).toLocaleString()}</td> */}
                                  <td>{moment(data.createdAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                  {
                                      // data.wait_success === 'success' &&
                                       //new Date(data.updatedAt).toLocaleString()
                                       //<td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>

                                       data.wait_success === 'success' ? (
                                          <td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                       ): (
                                          <td></td>
                                       )
                                      
                                  }
                                  {
                                          data.wait_success === 'wait' ? (
                                            <td style={{color: '#FF8C00', fontSize: '20px'}}>{data.wait_success}</td>
                                          ): (
                                            <td style={{color: 'green', fontSize: '20px'}}>{data.wait_success}</td>
                                          )
                                    }
                                 <td>{data.name}</td>
                                 <td><Link to={`/blog/${data._id}`} 
                                 style={{
                                  textDecoration: 'none', textTransform: 'capitalize'
                                 }}>{data.title}</Link></td>
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
    }
       {/* เงื่อนไขที่ 9 */}
    {
      datestart === '' && dateend === '' && name_search !== '' && wait_success !== '' && categories_search === '' &&
      <div>
      <table className="table" id='export-to-excel'>
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
                               {/**   <td>{new Date(data.createdAt).toLocaleString()}</td> */}
                                  <td>{moment(data.createdAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                  {
                                      // data.wait_success === 'success' &&
                                       //new Date(data.updatedAt).toLocaleString()
                                       //<td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>

                                       data.wait_success === 'success' ? (
                                          <td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                       ): (
                                          <td></td>
                                       )
                                      
                                  }
                                  {
                                          data.wait_success === 'wait' ? (
                                            <td style={{color: '#FF8C00', fontSize: '20px'}}>{data.wait_success}</td>
                                          ): (
                                            <td style={{color: 'green', fontSize: '20px'}}>{data.wait_success}</td>
                                          )
                                    }
                                 <td>{data.name}</td>
                                 <td><Link to={`/blog/${data._id}`} 
                                 style={{
                                  textDecoration: 'none', textTransform: 'capitalize'
                                 }}>{data.title}</Link></td>
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
    }
      {/* เงื่อนไขที่ 10 */}
    {
      datestart === '' && dateend === '' && name_search !== '' && wait_success !== '' && categories_search !== '' &&
      <div>
      <table className="table" id='export-to-excel'>
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
                               {/**   <td>{new Date(data.createdAt).toLocaleString()}</td> */}
                                  <td>{moment(data.createdAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                  {
                                      // data.wait_success === 'success' &&
                                       //new Date(data.updatedAt).toLocaleString()
                                       //<td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>

                                       data.wait_success === 'success' ? (
                                          <td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                       ): (
                                          <td></td>
                                       )
                                      
                                  }
                                  {
                                          data.wait_success === 'wait' ? (
                                            <td style={{color: '#FF8C00', fontSize: '20px'}}>{data.wait_success}</td>
                                          ): (
                                            <td style={{color: 'green', fontSize: '20px'}}>{data.wait_success}</td>
                                          )
                                    }
                                 <td>{data.name}</td>
                                 <td><Link to={`/blog/${data._id}`} 
                                 style={{
                                  textDecoration: 'none', textTransform: 'capitalize'
                                 }}>{data.title}</Link></td>
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
    }  
      {/* เงื่อนไขที่ 11 */}
    {
      datestart === '' && dateend === '' && name_search !== '' && wait_success === '' && categories_search === '' &&
      <div>
      <table className="table" id='export-to-excel'>
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
                               {/**   <td>{new Date(data.createdAt).toLocaleString()}</td> */}
                                  <td>{moment(data.createdAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                  {
                                      // data.wait_success === 'success' &&
                                       //new Date(data.updatedAt).toLocaleString()
                                       //<td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>

                                       data.wait_success === 'success' ? (
                                          <td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                       ): (
                                          <td></td>
                                       )
                                      
                                  }
                                  {
                                          data.wait_success === 'wait' ? (
                                            <td style={{color: '#FF8C00', fontSize: '20px'}}>{data.wait_success}</td>
                                          ): (
                                            <td style={{color: 'green', fontSize: '20px'}}>{data.wait_success}</td>
                                          )
                                    }
                                 <td>{data.name}</td>
                                 <td><Link to={`/blog/${data._id}`} 
                                 style={{
                                  textDecoration: 'none', textTransform: 'capitalize'
                                 }}>{data.title}</Link></td>
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
    }  
      {/* เงื่อนไขที่ 12 */}
      {
      datestart === '' && dateend === '' && name_search === '' && wait_success === '' && categories_search !== '' &&
      <div>
      <table className="table" id='export-to-excel'>
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
                               {/**   <td>{new Date(data.createdAt).toLocaleString()}</td> */}
                                  <td>{moment(data.createdAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                  {
                                      // data.wait_success === 'success' &&
                                       //new Date(data.updatedAt).toLocaleString()
                                       //<td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>

                                       data.wait_success === 'success' ? (
                                          <td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                       ): (
                                          <td></td>
                                       )
                                      
                                  }
                                  {
                                          data.wait_success === 'wait' ? (
                                            <td style={{color: '#FF8C00', fontSize: '20px'}}>{data.wait_success}</td>
                                          ): (
                                            <td style={{color: 'green', fontSize: '20px'}}>{data.wait_success}</td>
                                          )
                                    }
                                 <td>{data.name}</td>
                                 <td><Link to={`/blog/${data._id}`} 
                                 style={{
                                  textDecoration: 'none', textTransform: 'capitalize'
                                 }}>{data.title}</Link></td>
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
    }     
          {/* เงื่อนไขที่ 13 */}
          {
      datestart === '' && dateend === '' && name_search === '' && wait_success !== '' && categories_search !== '' &&
      <div>
      <table className="table" id='export-to-excel'>
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
                               {/**   <td>{new Date(data.createdAt).toLocaleString()}</td> */}
                                  <td>{moment(data.createdAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                  {
                                      // data.wait_success === 'success' &&
                                       //new Date(data.updatedAt).toLocaleString()
                                       //<td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>

                                       data.wait_success === 'success' ? (
                                          <td>{moment(data.updatedAt).format("DD-MM-YYYY HH:mm:ss")}</td>
                                       ): (
                                          <td></td>
                                       )
                                      
                                  }
                                  {
                                          data.wait_success === 'wait' ? (
                                            <td style={{color: '#FF8C00', fontSize: '20px'}}>{data.wait_success}</td>
                                          ): (
                                            <td style={{color: 'green', fontSize: '20px'}}>{data.wait_success}</td>
                                          )
                                    }
                                 <td>{data.name}</td>
                                 <td><Link to={`/blog/${data._id}`} 
                                 style={{
                                  textDecoration: 'none', textTransform: 'capitalize'
                                 }}>{data.title}</Link></td>
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
    }   

   </div>
  )
}

export default Data_search


