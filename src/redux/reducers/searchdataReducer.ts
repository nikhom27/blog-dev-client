import {
    GET_HOME_REPORT,
    IHomeReport,
    IGetHomeReportType,

} from '../types/reportType'

const searchdateReducer = (
    state: IHomeReport[] = [],
    action: IGetHomeReportType
 ): IHomeReport[] => {
    switch (action.type){
        case GET_HOME_REPORT:
            return action.payload

        default: 
            return state
    }
}

export default searchdateReducer