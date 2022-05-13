import {

    GET_FREQUENCY_DATE_WAIT_SUCCESS,
    IFrequency_date_Wait_SuccessType,
    IFrequencyReport
} from '../types/reportType'

const date_wait_successFrequncyReducer = (
    state: IFrequencyReport[] = [],
    action: IFrequency_date_Wait_SuccessType
 ): IFrequencyReport[] => {
    switch (action.type){
        case GET_FREQUENCY_DATE_WAIT_SUCCESS:
            return action.payload

        default: 
            return state
    }
}

export default date_wait_successFrequncyReducer