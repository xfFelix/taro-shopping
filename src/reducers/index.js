import { combineReducers } from 'redux'
import classify from './classify'
import tab from './tab'
import home from './home'
import shopping from './shopping'
import user from './user'
import { reducer as LoginReducer } from '@/pages/Login/store'
import { reducer as GoodsReducer } from '@/pages/goods/store'
import { reducer as CartReducer } from '@/pages/tab/Cart/store'
import { reducer as UserReducer } from '@/pages/tab/User/store'
import { reducer as previewReducer } from '@/pages/order/preview/store'

export default combineReducers({
  classify,
  tab,
  home,
  shopping,
  user,
  login: LoginReducer,
  goods: GoodsReducer,
  cart: CartReducer,
  me: UserReducer,
  preview: previewReducer
})
