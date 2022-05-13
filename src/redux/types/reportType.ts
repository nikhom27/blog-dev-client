import { IUser, ICategory } from "../../utils/TypeScript";

export const GET_HOME_REPORT = "GET_HOME_REPORT"
export const GET_FREQUENCY_REPORT = "GET_FREQUENCY_REPORT"
export const GET_ALL_FREQUENCY_REPORT = "GET_ALL_FREQUENCY_REPORT"
export const GET_SUMMARY_REPORT = "GET_SUMMARY_REPORT"

export const GET_FREQUENCY_WAIT_SUCCESS = "GET_FREQUENCY_WAIT_SUCCESS"
export const GET_FREQUENCY_WAIT_SUCCESS_NAME = "GET_FREQUENCY_WAIT_SUCCESS_NAME"
export const GET_FREQUENCY_DATE_WAIT_SUCCESS = "GET_FREQUENCY_DATE_WAIT_SUCCESS"
export const GET_FREQUENCY_NAME = "GET_FREQUENCY_NAME"
export const GET_FREQUENCY_DATE_WAIT_SUCCESS_NAME = "GET_FREQUENCY_DATE_WAIT_SUCCESS_NAME"


export interface IHomeReport {
    _id: string,
    wait_success: string,
    user: IUser[],
    name: string,
    title: string,
    content: string,
    description: string,
    thumbnail: string,
    category: ICategory[],
    createdAt: string,
    updatedAt: string
}

export interface IGetHomeReportType {
    type: typeof GET_HOME_REPORT,
    payload: IHomeReport[]
}

export interface IFrequencyReport {
    _id: string
    name: string
    count: string
    
}

export interface IGetFrequenyType{
    type: typeof GET_FREQUENCY_REPORT,
    payload: IFrequencyReport[]
}

export interface IAllFrequncyReportType{
    type: typeof GET_ALL_FREQUENCY_REPORT,
    payload: IFrequencyReport[]

}

export interface IAllSummaryReportType{
    type: typeof GET_SUMMARY_REPORT,
    payload: IHomeReport[]
}

export interface IFrequency_Wait_SuccessType{
    type: typeof GET_FREQUENCY_WAIT_SUCCESS,
    payload: IFrequencyReport[]
}

export interface IFrequency_Wait_Success_nameType{
    type: typeof GET_FREQUENCY_WAIT_SUCCESS_NAME,
    payload: IFrequencyReport[]
}

export interface IFrequency_date_Wait_SuccessType{
    type: typeof GET_FREQUENCY_DATE_WAIT_SUCCESS,
    payload: IFrequencyReport[]
}

export interface IFrequency_nameType{
    type: typeof GET_FREQUENCY_NAME,
    payload: IFrequencyReport[]
}

export interface IFrequency_date_Wait_Success_nameType{
    type: typeof GET_FREQUENCY_DATE_WAIT_SUCCESS_NAME,
    payload: IFrequencyReport[]
}