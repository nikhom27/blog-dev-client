import {
    GET_SEARCH_DATE_BLOGS,
    ISearch_Date_Blogs,
    IGet_Search_dateType
} from '../types/search_dateType'

const searchdateReducer = (
    state: ISearch_Date_Blogs[] = [],
    action: IGet_Search_dateType
 ): ISearch_Date_Blogs[] => {
    switch (action.type){
        case GET_SEARCH_DATE_BLOGS:
            return action.payload

        default: 
            return state
    }
}

export default searchdateReducer