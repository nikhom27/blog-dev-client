import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import moment from 'moment'

/*import { CSVLink, CSVDownload } from "react-csv";

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable' */

import { IBlog, RootStore, IUser, IComment } from '../../utils/TypeScript'

import Input from '../comments/Input'
import Comments from '../comments/Comments'
import Loading from '../global/Loading'
import Pagination from '../global/Pagination'

import SendSMS from '../sms/Send_SMS'


import { 
  createComment, 
  getComments 
} from '../../redux/actions/commentAction'

import { update_wait_Blog_ball, update_success_Blog, update_wait_Blog } from '../../redux/actions/blogAction'


interface IProps {
  blog: IBlog
}

const DisplayBlog: React.FC<IProps> = ({blog}) => {
  const { auth, comments } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()

  const [showComments, setShowComments] = useState<IComment[]>([])
  const [loading, setLoading] = useState(false)

  const history = useHistory()


  const handleComment = (body: string) => {
    if(!auth.user || !auth.access_token) return;   

    const data = {
      content: body,
      user: auth.user,
      blog_id: (blog._id as string),
      blog_user_id: (blog.user as IUser)._id,
      replyCM: [],
      createdAt: new Date().toISOString()
    }
    
    setShowComments([data, ...showComments])


    if(blog.ball === 'success')  
    dispatch(update_wait_Blog_ball(blog, auth.access_token));
    
    dispatch(createComment(data, auth.access_token))


    window.location.reload();
  }


  useEffect(() => {
    setShowComments(comments.data)
  },[comments.data])


  const fetchComments = useCallback(async(id: string, num = 1) => {
    setLoading(true)
    await dispatch(getComments(id, num))
    setLoading(false)
  },[dispatch])


  useEffect(() => {
    if(!blog._id) return;
    const num = history.location.search.slice(6) || 1;
    fetchComments(blog._id, num)
  },[blog._id, fetchComments, history])

  const handlePagination = (num: number) => {
    if(!blog._id) return;
    fetchComments(blog._id, num)
  }

  const handleSuccess = () => {
    if(!auth.user || !auth.access_token) return;

    if(window.confirm(" คุณต้องการปิดงาน?")){
      dispatch(update_success_Blog(blog, auth.access_token))
    }

    window.location.reload();
  }

  const handleWait = () => {
    if(!auth.user || !auth.access_token) return;

    if(window.confirm(" คุณต้องเปิดงาน?")){
      dispatch(update_wait_Blog(blog, auth.access_token))
    }

    window.location.reload();
  }


  return (
    <div>



      <div className="text-end" style={{ color: 'teal', cursor: 'pointer'}}>

      {
             blog.ball ==='wait'  && blog.wait_success === 'wait' &&
             <i className="fas fa-bell"
             title='แจ้งเตือน'
             style={{fontSize:'22px', color: 'red'}}
         />
        }

  

        &nbsp;&nbsp;&nbsp;

        {
            blog.wait_success ==='wait' &&
            <i className='fas fa-envelope-open'  title='wait' 
             style={{fontSize:'18px', color: 'gray'}}    
             > Wait</i>
        }

        {
             blog.wait_success ==='success' &&
             <i className='fas fa-envelope-open' 
              title='success' 
              style={{fontSize:'18px', color: 'green'}}
               > Success</i>
       }
        &nbsp;&nbsp;

        {
            auth.user && blog.wait_success ==='wait' &&
           <small className="ms-2">
             <i className="far fa-check-square"
             title='ปิดงาน'
             style={{fontSize:'25px', color: 'green'}}
             onClick={handleSuccess}
             ></i>
           </small>

        }

        {
            auth.user && blog.wait_success ==='success' &&
           <small className="ms-2">
             <i className="far fa-window-close"
             title='เปิดงาน'
             style={{fontSize:'25px', color: 'red'}}
             onClick={handleWait}
             ></i>
           </small>

        }
   

      </div>
     
   

      <h2 className="text-center my-3 text-capitalize fs-1"
      style={{ color: '#ff7a00' }}>
        {blog.title}
      </h2>

      <div className="text-end fst-italic" style={{color: 'teal'}} id='atm-ptm'>
        <small>
          {
            typeof(blog.user) !== 'string' &&
            `By: ${blog.user.name}`
          }
        </small>

        <small className="ms-2">
          { /*new Date(blog.createdAt).toLocaleString() */}
          {moment(blog.createdAt).format("DD-MM-YYYY HH:mm:ss")}
        </small>
      </div>

      <br />

      <div dangerouslySetInnerHTML={{
        __html: blog.description
      }} />

      <br />

      <img src={`${blog.thumbnail}`} className="img-fluid" alt="..."/>    

      <br />

      <div dangerouslySetInnerHTML={{
        __html: blog.content
      }} />

    {/**   <hr className="my-1" />
      <h3 style={{color: '#ff7a00'}}>✩ Send SMS ✩</h3>
      
      {
        auth.user
        ? <SendSMS />
        : <h5>
        Please <Link to={`/login?blog/${blog._id}`}>login</Link> to Send SMS.
      </h5> 
      }

    */}
      

      <br />
      <br />

      <hr className="my-1" />
      <h3 style={{color: '#ff7a00'}}>✩ Comments ✩</h3>

      {
        auth.user
        ? <Input callback={handleComment} />
        : <h5>
          Please <Link to={`/login?blog/${blog._id}`}>login</Link> to comment.
        </h5>
      }
      
      {
        loading
        ? <Loading />
        : showComments?.map((comment, index) => (
          <Comments key={index} comment={comment} />
        ))
      }

      {
        comments.total > 1 &&
        <Pagination 
        total={comments.total}
        callback={handlePagination}
        />
      }
    </div>
  )
}

export default DisplayBlog
