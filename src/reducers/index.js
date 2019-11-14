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
import { reducer as goldReducer } from '@/pages/gold/store'
import { reducer as orderReducer } from '@/pages/order/list/store'
import { reducer as addressReducer } from '@/pages/address/store'
import { reducer as successReducer } from '@/pages/success/store'
import { reducer as vipReducer } from '@/pages/vip/store'
import { reducer as oilReducer } from '@/pages/oil/store'
import { reducer as protocolReducer } from '@/pages/protocol/store'
import { reducer as lifeReducer } from '@/pages/life/store'
import { reducer as phoneReducer } from '@/pages/phone/store'

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
  preview: previewReducer,
  gold: goldReducer,
  order: orderReducer,
  address: addressReducer,
  success: successReducer,
  vip:vipReducer,
  oil: oilReducer,
  protocol: protocolReducer,
  life: lifeReducer,
  phone:phoneReducer
})
