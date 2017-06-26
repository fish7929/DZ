import * as ActionType from './actionType'

const initialState = {
    username: "",
    nickname: "",
    email: "",
    mobile: "",
    token: "",
}

export default function update (state = initialState, action){
    switch(action.type){
        case ActionType.INIT_USER_LOGIN:
            return {
                ...state,
                username: action.data.username,
                nickname: action.data.nickname,
                token: action.data.token,
                email: action.data.email,
                mobile:action.data.mobile
            }
        default:
            return state
    }
}