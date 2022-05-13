import { IBlog } from "../../utils/TypeScript";

export const GET_SEARCH_DATE_BLOGS = "GET_SEARCH_DATE_BLOGS"

export interface ISearch_Date_Blogs {
    _id: string
    name: string
    count: number
    blogs: IBlog[]
}

export interface IGet_Search_dateType{
    type: typeof GET_SEARCH_DATE_BLOGS,
    payload: ISearch_Date_Blogs[]
}