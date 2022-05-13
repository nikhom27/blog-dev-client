import { Dispatch } from 'redux'
import { IBlog, ISearch, ISearch_wait_success } from '../../utils/TypeScript'
import { imageUpload } from '../../utils/ImageUpload'
import { postAPI, getAPI, putAPI, deleteAPI } from '../../utils/FetchData'

import { ALERT, IAlertType } from '../types/alertType'

import {
  GET_HOME_BLOGS,
  IGetHomeBlogsType,
  GET_BLOGS_CATEGORY_ID,
  IGetBlogsCategoryType,
  GET_BLOGS_USER_ID,
  IGetBlogsUserType,
  CREATE_BLOGS_USER_ID,
  ICreateBlogsUserType,
  DELETE_BLOGS_USER_ID,
  IDeleteBlogsUserType,
  GET_BLOGS_BRANCH,
  IGetBarnchBlogsType
} from '../types/blogType'

import {
  GET_SEARCH_DATE_BLOGS,
  IGet_Search_dateType
} from '../types/search_dateType'

import {
  GET_HOME_REPORT,
  IGetHomeReportType,
  IGetFrequenyType,
  GET_FREQUENCY_REPORT,
  GET_ALL_FREQUENCY_REPORT,
  IAllFrequncyReportType,
  IAllSummaryReportType,
  GET_SUMMARY_REPORT,
  IFrequency_Wait_SuccessType,
  GET_FREQUENCY_WAIT_SUCCESS,
  IFrequency_Wait_Success_nameType,
  GET_FREQUENCY_WAIT_SUCCESS_NAME,
  IFrequency_date_Wait_SuccessType,
  GET_FREQUENCY_DATE_WAIT_SUCCESS,
  IFrequency_nameType,
  GET_FREQUENCY_NAME,
  IFrequency_date_Wait_Success_nameType,
  GET_FREQUENCY_DATE_WAIT_SUCCESS_NAME
} from '../types/reportType'

import { checkTokenExp } from '../../utils/checkTokenExp'

export const createBlog = (blog: IBlog, token: string) => 
async (dispatch: Dispatch<IAlertType | ICreateBlogsUserType>) => {
  const result = await checkTokenExp(token, dispatch)
  const access_token = result ? result : token

  let url;
  try {
    dispatch({ type: ALERT, payload: { loading: true } })
    
    if(typeof(blog.thumbnail) !== 'string'){
      const photo = await imageUpload(blog.thumbnail)
      url = photo.url
    }else{
      url = blog.thumbnail
    }
    
    const newBlog = {...blog, thumbnail: url}
    
    const res = await postAPI('blog', newBlog, access_token)

    dispatch({
      type: CREATE_BLOGS_USER_ID,
      payload: res.data
    })
    
    dispatch({ type: ALERT, payload: { loading: false } })

    dispatch({ type: ALERT, payload: { success: 'Create blog complete!' } })

  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}


export const getHomeBlogs = () => 
async (dispatch: Dispatch<IAlertType | IGetHomeBlogsType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await getAPI('home/blogs')

    dispatch({
      type: GET_HOME_BLOGS,
      payload: res.data
    })
    
    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}


export const getBlogsByCategoryId = (id: string, search: string) => 
async (dispatch: Dispatch<IAlertType | IGetBlogsCategoryType>) => {
  try {
    let limit = 8;
    let value = search ? search : `?page=${1}`;

    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await getAPI(`blogs/category/${id}${value}&limit=${limit}`)

    dispatch({
      type: GET_BLOGS_CATEGORY_ID,
      payload: {...res.data, id, search }
    })
    
    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}

export const getBlogsByBranch = (id: string) => 
async (dispatch: Dispatch<IAlertType | IGetBarnchBlogsType>) => {
  try {
   // let limit = 8;
   // let value = search ? search : `?page=${1}`;
   
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await getAPI(`blogs/branch/${id}`)

    dispatch({
      type: GET_BLOGS_BRANCH,
      payload: res.data
    }) 
    
    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}


export const getBlogsByUserId = (id: string, search: string) => 
async (dispatch: Dispatch<IAlertType | IGetBlogsUserType>) => {
  try {
    let limit = 3;
    let value = search ? search : `?page=${1}`;

    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await getAPI(`blogs/user/${id}${value}&limit=${limit}`)

    dispatch({
      type: GET_BLOGS_USER_ID,
      payload: {...res.data, id, search }
    })
    
    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}


export const updateBlog = (blog: IBlog, token: string) => 
async (dispatch: Dispatch<IAlertType>) => {
  const result = await checkTokenExp(token, dispatch)
  const access_token = result ? result : token
  let url;
  try {
    dispatch({ type: ALERT, payload: { loading: true } })
    
    if(typeof(blog.thumbnail) !== 'string'){
      const photo = await imageUpload(blog.thumbnail)
      url = photo.url
    }else{
      url = blog.thumbnail
    }
    
    const newBlog = {...blog, thumbnail: url}

    const res = await putAPI(`blog/${newBlog._id}`, newBlog, access_token)

    dispatch({ type: ALERT, payload: { success: res.data.msg } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}

export const update_success_Blog = (blog: IBlog, token: string) => 
async (dispatch: Dispatch<IAlertType>) => {
  const result = await checkTokenExp(token, dispatch)
  const access_token = result ? result : token
  let url;
  try {
    dispatch({ type: ALERT, payload: { loading: true } })
    
    
    const newBlog = {...blog, thumbnail: url, wait_success: 'success'}

    const res = await putAPI(`status/${newBlog._id}`, newBlog, access_token)

    dispatch({ type: ALERT, payload: { success: res.data.msg } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}

export const update_wait_Blog = (blog: IBlog, token: string) => 
async (dispatch: Dispatch<IAlertType>) => {
  const result = await checkTokenExp(token, dispatch)
  const access_token = result ? result : token
  let url;
  try {
    dispatch({ type: ALERT, payload: { loading: true } })
    
    
    const newBlog = {...blog, thumbnail: url, wait_success: 'wait'}

    const res = await putAPI(`status/${newBlog._id}`, newBlog, access_token)

    dispatch({ type: ALERT, payload: { success: res.data.msg } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}

export const update_wait_Blog_ball = (blog: IBlog, token: string) => 
async (dispatch: Dispatch<IAlertType>) => {
  const result = await checkTokenExp(token, dispatch)
  const access_token = result ? result : token
  let url;
  try {
    dispatch({ type: ALERT, payload: { loading: true } })
    
    
    const newBlog = {...blog, thumbnail: url, ball:'wait'}

    const res = await putAPI(`bell/${newBlog._id}`, newBlog, access_token)


    dispatch({ type: ALERT, payload: { success: res.data.msg } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}

export const update_success_Blog_ball = (blog: IBlog, token: string) => 
async (dispatch: Dispatch<IAlertType>) => {
  const result = await checkTokenExp(token, dispatch)
  const access_token = result ? result : token
  let url;
  try {
    dispatch({ type: ALERT, payload: { loading: true } })
    
    
    const newBlog = {...blog, thumbnail: url, ball:'success'}

    const res = await putAPI(`bell/${newBlog._id}`, newBlog, access_token)

    dispatch({ type: ALERT, payload: { success: res.data.msg } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}


export const deleteBlog = (blog: IBlog, token: string) => 
async (dispatch: Dispatch<IAlertType | IDeleteBlogsUserType>) => {
  const result = await checkTokenExp(token, dispatch)
  const access_token = result ? result : token
  try {
    dispatch({
      type: DELETE_BLOGS_USER_ID,
      payload: blog
    })

    await deleteAPI(`blog/${blog._id}`, access_token)

  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}

export const search_date_Blogs = (search_date: ISearch) => 
async (dispatch: Dispatch<IAlertType | IGet_Search_dateType>) => {

  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('search_date/blogs', search_date)

    dispatch({
      type: GET_SEARCH_DATE_BLOGS,
      payload: res.data
    }) 
    
    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}

export const getHomeReport = (search_date: ISearch) => 
async (dispatch: Dispatch<IAlertType | IGetHomeReportType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })


    const res = await postAPI('report/blogs', search_date)

    dispatch({
      type: GET_HOME_REPORT,
      payload: res.data
    })

    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}



export const getWait_Success_report = (search_wait_success_date: ISearch_wait_success) => 
async (dispatch: Dispatch<IAlertType | IGetHomeReportType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })


    const res = await postAPI('report/wait_success', search_wait_success_date)

    dispatch({
      type: GET_HOME_REPORT,
      payload: res.data
    })

    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}

export const getWait_Success_report_name = (search_wait_success_date: ISearch_wait_success) => 
async (dispatch: Dispatch<IAlertType | IGetHomeReportType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })


    const res = await postAPI('report/wait_success_name', search_wait_success_date)

    dispatch({
      type: GET_HOME_REPORT,
      payload: res.data
    })

    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}

export const getWait_Success_report_name_category = (search_wait_success_date: ISearch_wait_success) => 
async (dispatch: Dispatch<IAlertType | IGetHomeReportType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })


    const res = await postAPI('report/wait_success_name_catetory', search_wait_success_date)

   dispatch({
      type: GET_HOME_REPORT,
      payload: res.data
    }) 

    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}

export const getReport_date_name = (search_wait_success_date: ISearch_wait_success) => 
async (dispatch: Dispatch<IAlertType | IGetHomeReportType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('report/date_name', search_wait_success_date)

   dispatch({
      type: GET_HOME_REPORT,
      payload: res.data
    }) 

    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}


export const getReport_wait_success = (search_wait_success_date: ISearch_wait_success) => 
async (dispatch: Dispatch<IAlertType | IGetHomeReportType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('report/wait_success_report', search_wait_success_date)

   dispatch({
      type: GET_HOME_REPORT,
      payload: res.data
    }) 

    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}

export const getReport_wait_success_name = (search_wait_success_date: ISearch_wait_success) => 
async (dispatch: Dispatch<IAlertType | IGetHomeReportType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('report/wait_success_name_report', search_wait_success_date)

   dispatch({
      type: GET_HOME_REPORT,
      payload: res.data
    }) 

    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}

export const getReport_wait_success_name_category = (search_wait_success_date: ISearch_wait_success) => 
async (dispatch: Dispatch<IAlertType | IGetHomeReportType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('report/wait_success_name_category_report', search_wait_success_date)

   dispatch({
      type: GET_HOME_REPORT,
      payload: res.data
    }) 

    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}

export const getReport_name = (search_wait_success_date: ISearch_wait_success) => 
async (dispatch: Dispatch<IAlertType | IGetHomeReportType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('report/name_report', search_wait_success_date)

   dispatch({
      type: GET_HOME_REPORT,
      payload: res.data
    }) 

    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}

export const getReport_catagory = (search_wait_success_date: ISearch_wait_success) => 
async (dispatch: Dispatch<IAlertType | IGetHomeReportType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('report/category_report', search_wait_success_date)

   dispatch({
      type: GET_HOME_REPORT,
      payload: res.data
    })

    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}

export const getReport_date_name_category = (search_wait_success_date: ISearch_wait_success) => 
async (dispatch: Dispatch<IAlertType | IGetHomeReportType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

   const res = await postAPI('report/date_name_category', search_wait_success_date)

   dispatch({
      type: GET_HOME_REPORT,
      payload: res.data
    })

    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}

export const getReport_date__category = (search_wait_success_date: ISearch_wait_success) => 
async (dispatch: Dispatch<IAlertType | IGetHomeReportType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

   const res = await postAPI('report/date_category', search_wait_success_date)

   dispatch({
      type: GET_HOME_REPORT,
      payload: res.data
    }) 

    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}

export const getReport_wait_success__category = (search_wait_success_date: ISearch_wait_success) => 
async (dispatch: Dispatch<IAlertType | IGetHomeReportType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

   const res = await postAPI('report/wait_success_category', search_wait_success_date)

   dispatch({
      type: GET_HOME_REPORT,
      payload: res.data
    })

    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}

export const getReport_date_frequency = (search_wait_success_date: ISearch_wait_success) => 
async (dispatch: Dispatch<IAlertType | IGetFrequenyType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })


   const res = await postAPI('report/date_frequency', search_wait_success_date)

   dispatch({
      type: GET_FREQUENCY_REPORT,
      payload: res.data
    }) 

    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}

export const getReport_date_name_frequency = (search_wait_success_date: ISearch_wait_success) => 
async (dispatch: Dispatch<IAlertType | IGetFrequenyType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

   const res = await postAPI('report/date_name_frequency', search_wait_success_date)


   dispatch({
      type: GET_FREQUENCY_REPORT,
      payload: res.data
    }) 

    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}


export const getReport_date_wait_success_frequency = (search_wait_success_date: ISearch_wait_success) => 
async (dispatch: Dispatch<IAlertType | IFrequency_date_Wait_SuccessType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

   const res = await postAPI('report/date_wait_success_frequency', search_wait_success_date)

   dispatch({
      type: GET_FREQUENCY_DATE_WAIT_SUCCESS,
      payload: res.data
    }) 

    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}

export const getReport_date_name_wait_success_frequency = (search_wait_success_date: ISearch_wait_success) => 
async (dispatch: Dispatch<IAlertType | IFrequency_date_Wait_Success_nameType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })


   const res = await postAPI('report/date_name_wait_success_frequency', search_wait_success_date)

   dispatch({
      type: GET_FREQUENCY_DATE_WAIT_SUCCESS_NAME,
      payload: res.data
    }) 

    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}

export const getReport_wait_success_frequency = (search_wait_success_date: ISearch_wait_success) => 
async (dispatch: Dispatch<IAlertType | IFrequency_Wait_SuccessType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })


   const res = await postAPI('report/wait_success_frequency', search_wait_success_date)

   dispatch({
      type: GET_FREQUENCY_WAIT_SUCCESS,
      payload: res.data
    }) 

    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}

export const getReport_name_wait_success_frequency = (search_wait_success_date: ISearch_wait_success) => 
async (dispatch: Dispatch<IAlertType | IFrequency_Wait_Success_nameType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })


   const res = await postAPI('report/name_wait_success_frequency', search_wait_success_date)
 
   dispatch({
      type: GET_FREQUENCY_WAIT_SUCCESS_NAME,
      payload: res.data
    }) 

    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}

export const getReport_name__frequency = (search_wait_success_date: ISearch_wait_success) => 
async (dispatch: Dispatch<IAlertType | IFrequency_nameType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

   const res = await postAPI('report/name_frequency', search_wait_success_date)
 
   dispatch({
      type: GET_FREQUENCY_NAME,
      payload: res.data
    })

    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}

export const getReport_all_frequency = () => 
async (dispatch: Dispatch<IAlertType | IAllFrequncyReportType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await getAPI('report/get_all_frequency')

   dispatch({
      type: GET_ALL_FREQUENCY_REPORT,
      payload: res.data
    })   
    
    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}


export const getReport_all_summary = () => 
async (dispatch: Dispatch<IAlertType | IAllSummaryReportType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await getAPI('report/get_all_summary')

    dispatch({
      type: GET_SUMMARY_REPORT,
      payload: res.data
    }) 
    
    dispatch({ type: ALERT, payload: { loading: false } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: {errors: err.response.data.msg} })
  }
}