import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { IBlog, IParams, RootStore} from '../../utils/TypeScript'

import { deleteBlog , update_success_Blog, update_success_Blog_ball, update_wait_Blog } from '../../redux/actions/blogAction'

import moment from 'moment'


interface IProps {
  blog: IBlog
}

const CardHoriz: React.FC<IProps> = ({blog}) => {
  const { slug } = useParams<IParams>()
  const { auth } = useSelector((state: RootStore) => state)
  const dispatch = useDispatch()

 

  const handleDelete = () => {
    if(!auth.user || !auth.access_token) return;

    if(slug !== auth.user._id) return dispatch({
      type: 'ALERT',
      payload: { errors: 'Invalid Authentication.' }
    })

    if(window.confirm("Do you want to delete this post?")){
      dispatch(deleteBlog(blog, auth.access_token))
    }

    window.location.reload();
  }

  const handleSuccess = () => {
    if(!auth.user || !auth.access_token) return;

    if(slug !== auth.user._id) return dispatch({
      type: 'ALERT',
      payload: { errors: 'Invalid Authentication.' }
    })

    if(window.confirm(" คุณต้องการปิดงาน?")){
      dispatch(update_success_Blog(blog, auth.access_token))
    }

    window.location.reload();
  }

  const handleWait = () => {
    if(!auth.user || !auth.access_token) return;

    if(slug !== auth.user._id) return dispatch({
      type: 'ALERT',
      payload: { errors: 'Invalid Authentication.' }
    })

    if(window.confirm(" คุณต้องเปิดงาน?")){
      dispatch(update_wait_Blog(blog, auth.access_token))
    }

    window.location.reload();
  }

  const handlebell = () =>{
    if(!auth.user || !auth.access_token) return;

    if(slug !== auth.user._id) return dispatch({
      type: 'ALERT',
      payload: { errors: 'Invalid Authentication.' }
    })

    if(window.confirm(" คุณต้องการยกเลิกการแจ้งเตือน?")){
     dispatch(update_success_Blog_ball(blog, auth.access_token))
    }

    window.location.reload();

  }


  return (
    <div className="card mb-3" style={{minWidth: "260px"}}>
      <div className="row g-0 p-2">
        <div className="col-md-4" style={{
          minHeight: '150px', maxHeight: '170px', overflow: 'hidden'
        }}>
          {
            blog.thumbnail && 
            <>
              {
                typeof(blog.thumbnail) === 'string'
                ? <Link to={`/blog/${blog._id}`}>
                    <img src={blog.thumbnail} 
                    className="w-100 h-100" 
                    alt="thumbnail" style={{objectFit: 'cover'}} />
                </Link>
                :<img src={URL.createObjectURL(blog.thumbnail)} 
                className="w-100 h-100" 
                alt="thumbnail" style={{objectFit: 'cover'}} />
              }
            </>
          }
          
        </div>
        
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              <Link to={`/blog/${blog._id}`}
              className="text-capitalize text-decoration-none">
                {blog.title}
              </Link>
            </h5>
            <p className="card-text">{blog.description}</p>

            {
              blog.title &&
              <div className="card-text d-flex justify-content-between
                align-items-center"
              >
                {
                  (auth.user && slug === auth.user._id) &&
                  <div style={{cursor: 'pointer'}}>
                    <Link to={`/update_blog/${blog._id}`}>
                      <i className="fas fa-edit" title="edit" />
                    </Link>

                    <i className="fas fa-trash text-danger mx-3" 
                    title="delete" onClick={handleDelete} />

                    {
                      blog.wait_success ==='wait' &&
                       <i className='fas fa-envelope-open' 
                       title='wait' 
                       style={{fontSize:'18px', color: 'gray'}}
                       onClick={handleSuccess}
                       />
                    }

                    {
                      blog.wait_success ==='success' &&
                      <i className='fas fa-envelope-open' 
                      title='success' 
                      style={{fontSize:'18px', color: 'green'}}
                      onClick={handleWait}
                      />
                    }

                    &nbsp;
                    &nbsp;

                    {
                       blog.ball ==='wait'  && blog.wait_success === 'wait' &&
                      <i className="fas fa-bell"
                      title='แจ้งเตือน'
                      style={{fontSize:'18px', color: 'red'}}
                      onClick={handlebell}
                     />
           
                    }

                  </div>
                }
                <small className="text-muted">
                  { /*new Date(blog.createdAt).toLocaleString()*/}
                  {moment(blog.createdAt).format("DD-MM-YYYY HH:mm:ss")}
                </small>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardHoriz
