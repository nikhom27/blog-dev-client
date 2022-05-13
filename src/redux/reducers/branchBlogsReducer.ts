import {
     GET_BLOGS_BRANCH,
     IGetBarnchBlogsType,
     IBranchBlogs
    } from "../types/blogType";

    const barnchBlogsReducer = (
        state: IBranchBlogs[] = [],
        action: IGetBarnchBlogsType
     ) : IBranchBlogs[] => {
       switch (action.type){
           case GET_BLOGS_BRANCH:
               return action.payload
   
           default:
               return state
       }
    }
   
    export default barnchBlogsReducer