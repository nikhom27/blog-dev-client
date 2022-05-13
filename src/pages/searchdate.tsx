import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { RootStore } from '../utils/TypeScript'

import { InputChange, FormSubmit } from '../utils/TypeScript'

import { search_date_Blogs } from '../redux/actions/blogAction'
import CardVert from '../components/cards/CardVert'


const Date_search = () => {
  const { searchdate } = useSelector((state: RootStore) => state)

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
    dispatch(search_date_Blogs(Datevalue))
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

    <div className="home_page">
        {
          searchdate.map(searchdate => (
            <div key={searchdate._id}>
              {
                searchdate.count > 0 &&
                <>
                  <h3>
                    <Link to={`/blogs/${searchdate.name}`}>
                        { searchdate.name } <small>{ searchdate.count }</small>
                    </Link>
                  </h3>

                  <hr className="mt-1" />

                  <div className="home_blogs">
                    {
                      searchdate.blogs.map(blog => (
                        <CardVert key={blog._id} blog={blog} />
                      ))
                    }
                  </div>
                </>
              }

              {
                searchdate.count > 4 &&
                <Link className="text-end d-block mt-2 mb-3" 
                to={`/blogs/${searchdate.name}`}>
                  Read More &gt;&gt;
                </Link>
              }
            </div>
          ))
        }
    </div>

   </div>
  )
}

export default Date_search

