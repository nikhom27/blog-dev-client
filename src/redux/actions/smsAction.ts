import { Dispatch } from 'redux'
import { ALERT, IAlertType } from '../types/alertType'
import { postAPI } from '../../utils/FetchData'


export const SendSMS = (phone: string, slug: string , users: string) => 
async (dispatch: Dispatch<IAlertType>) => {

  try {
    dispatch({ type: ALERT, payload: { loading: true } })
    
    const res = await postAPI('sendsms', { phone, slug, users })

    dispatch({ type: ALERT, payload: { success: res.data.msg } })
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  } 
}