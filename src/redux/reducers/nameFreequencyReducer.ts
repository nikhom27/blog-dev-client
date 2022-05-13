import {

    GET_FREQUENCY_NAME,
    IFrequency_nameType,
    IFrequencyReport
} from '../types/reportType'

const nameFreequencyReducer = (
    state: IFrequencyReport[] = [],
    action: IFrequency_nameType
 ): IFrequencyReport[] => {
    switch (action.type){
        case GET_FREQUENCY_NAME:
            return action.payload

        default: 
            return state
    }
}

export default nameFreequencyReducer