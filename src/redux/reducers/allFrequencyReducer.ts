import {

    GET_ALL_FREQUENCY_REPORT,
    IAllFrequncyReportType,
    IFrequencyReport
} from '../types/reportType'

const allsearchFrequencyReducer = (
    state: IFrequencyReport[] = [],
    action: IAllFrequncyReportType
 ): IFrequencyReport[] => {
    switch (action.type){
        case GET_ALL_FREQUENCY_REPORT:
            return action.payload

        default: 
            return state
    }
}

export default allsearchFrequencyReducer