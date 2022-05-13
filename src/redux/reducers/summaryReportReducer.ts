import {

    GET_SUMMARY_REPORT,
    IHomeReport,
    IAllSummaryReportType,
} from '../types/reportType'

const summaryReportReducer = (
    state: IHomeReport[] = [],
    action: IAllSummaryReportType
 ): IHomeReport[] => {
    switch (action.type){
        case GET_SUMMARY_REPORT:
            return action.payload

        default: 
            return state
    }
}

export default summaryReportReducer