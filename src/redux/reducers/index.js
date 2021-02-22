import {combineReducers} from 'redux'
import loginReducer from './loginReducer'
import accountsReducer from './accountsReducer'

export default combineReducers({
    loginReducer,
    accountsReducer
})