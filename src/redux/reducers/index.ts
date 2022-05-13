import { combineReducers } from 'redux'
import auth from './authReducer'
import alert from './alertReducer'
import categories from './categoryReducer'
import homeBlogs from './homeBlogsReducer'
import blogsCategory from './blogsCategoryReducer'
import otherInfo from './otherInfoReducer'
import blogsUser from './blogsUserReducer'
import comments from './commentReducer'
import socket from './socketReducer'
import searchdate from './searchdateReducer'
import searchdata from './searchdataReducer'
import users from './usersReducer'
import searchFrequency from './searchFrequency'
import AllFrequency_report from './allFrequencyReducer'
import AllSummary_report from './summaryReportReducer'
import barnchBlog from './branchBlogsReducer'
import wait_successFrequncy from './wait_successFrequncyReducer'
import wait_success_nameFrequncy from './wait_success_nameFrequncyReducer'
import date_wait_successFrequncy from './date_wait_successFrequncyReducer'
import nameFreequency from './nameFreequencyReducer'
import date_name_wait_success from './date_name_wait_successReducer'

export default combineReducers({
  auth,
  alert,
  categories,
  homeBlogs,
  blogsCategory,
  otherInfo,
  blogsUser,
  comments,
  socket,
  searchdate,
  searchdata,
  users,
  searchFrequency,
  AllFrequency_report,
  AllSummary_report,
  barnchBlog,
  wait_successFrequncy,
  wait_success_nameFrequncy,
  date_wait_successFrequncy,
  nameFreequency,
  date_name_wait_success
})