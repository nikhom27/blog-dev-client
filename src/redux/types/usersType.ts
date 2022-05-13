import { IUsers } from '../../utils/TypeScript'

export const GET_USERS = 'GET_USERS'

export interface IGetUsers{
    type: typeof GET_USERS
    payload: IUsers[]
}

export type IUsersType = IGetUsers