import { ChangeEvent, FormEvent } from 'react'
import rootReducer from '../redux/reducers/index'

export type InputChange = ChangeEvent<
  | HTMLInputElement 
  | HTMLTextAreaElement 
  | HTMLSelectElement
>

export type FormSubmit = FormEvent<HTMLFormElement>

export type RootStore = ReturnType<typeof rootReducer>


export interface IParams {
  page: string
  slug: string
}

export interface IUserLogin {
  account: string
  password: string
}

export interface IUserRegister extends IUserLogin {
  name: string
  cf_password: string
}

export interface IUser extends IUserLogin {
  avatar: string
  createdAt: string
  name: string
  role: string
  type: string
  updatedAt: string
  _id: string
}

export interface IUserProfile extends IUserRegister {
  avatar: string | File
}



export interface IAlert {
  loading?: boolean
  success?: string | string[]
  errors?: string | string[]
}


export interface ICategory {
  _id: string
  name: string
  createdAt: string
  updatedAt: string
}

export interface IBlog {
  _id?: string
  user: string | IUser
  title: string
  content: string
  description: string
  thumbnail: string | File
  wait_success: string
  ball: string
  category: string
  categoryname: string
  createdAt: string
}

export interface IComment {
  _id?: string
  user: IUser
  blog_id: string
  blog_user_id: string
  content: string
  replyCM: IComment[]
  reply_user?: IUser
  comment_root?: string
  createdAt: string
}

export interface IPhone {
  phone: string
}

export interface ISearch {
  datestart: string
   dateend: string
}


export interface ISearch_wait_success {
  datestart: string
   dateend: string
   wait_success: string
   name_search : string
   categories_search : string
}

export interface IUsers {
  _id: string
  name: string
  account : string
  avatar: string
  role: string
  type: string
  createdAt: string
  updatedAt:string
}
