import {

    GET_FREQUENCY_WAIT_SUCCESS,
    IFrequency_Wait_SuccessType,
    IFrequencyReport
} from '../types/reportType'

const wait_successFrequncyReducer = (
    state: IFrequencyReport[] = [],
    action: IFrequency_Wait_SuccessType
 ): IFrequencyReport[] => {
    switch (action.type){
        case GET_FREQUENCY_WAIT_SUCCESS:
            return action.payload

        default: 
            return state
    }
}

export default wait_successFrequncyReducer