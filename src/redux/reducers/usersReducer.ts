import { GET_USERS, IUsersType  } from "../types/usersType";
import { IUsers } from "../../utils/TypeScript";

const usersReducer = (
    state: IUsers[] = [], action: IUsersType
  ): IUsers[] => {
    switch (action.type) {
      case GET_USERS:
          return action.payload

      default:
        return state;
    }
  }
  
  export default usersReducer;