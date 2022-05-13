import {

    GET_FREQUENCY_WAIT_SUCCESS_NAME,
    IFrequency_Wait_Success_nameType,
    IFrequencyReport
} from '../types/reportType'

const wait_success_nameFrequncyReducer = (
    state: IFrequencyReport[] = [],
    action: IFrequency_Wait_Success_nameType
 ): IFrequencyReport[] => {
    switch (action.type){
        case GET_FREQUENCY_WAIT_SUCCESS_NAME:
            return action.payload

        default: 
            return state
    }
}

export default wait_success_nameFrequncyReducer