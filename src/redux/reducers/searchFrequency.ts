import {

    GET_FREQUENCY_REPORT,
    IFrequencyReport,
    IGetFrequenyType,
} from '../types/reportType'

const searchFrequencyReducer = (
    state: IFrequencyReport[] = [],
    action: IGetFrequenyType
 ): IFrequencyReport[] => {
    switch (action.type){
        case GET_FREQUENCY_REPORT:
            return action.payload

        default: 
            return state
    }
}

export default searchFrequencyReducer