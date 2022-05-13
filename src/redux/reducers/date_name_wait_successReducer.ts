import {

   GET_FREQUENCY_DATE_WAIT_SUCCESS_NAME,
    IFrequency_date_Wait_Success_nameType,
    IFrequencyReport
} from '../types/reportType'

const date_name_wait_successReducer = (
    state: IFrequencyReport[] = [],
    action: IFrequency_date_Wait_Success_nameType
 ): IFrequencyReport[] => {
    switch (action.type){
        case GET_FREQUENCY_DATE_WAIT_SUCCESS_NAME:
            return action.payload

        default: 
            return state
    }
}

export default date_name_wait_successReducer