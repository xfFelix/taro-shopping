import Taro,{Component} from "@tarojs/taro"
import {View, Text} from "@tarojs/components"
import './index.scss'

export default class goldProtocol extends Component {
  constructor(){
    super(...arguments)
  }
  render(){
    return(
        <View className="agreeContentW">
            <View className="title">《黄金兑换协议》</View>
            <Text className="agreeContent">
            本协议是本人与积分商城所有者海南自贸区椰云网络科技有限公司（以下简称“椰云网络”）之间就信用卡还款服务等相关事宜所订立的契约与约定（以下简称“本协议”）。\n
            1、服务条款的确认和接纳\n
            1.1 积分商城的各项电子服务归椰云网络所有。椰云网络是积分商城平台交易服务的网站经营者、支付结算服务的提供者。实际涉及具体产品及服务的，将由积分商城合作的产品及服务供应商提供。\n
            2、用户资料使用和存储限制\n
            2.1 在法律允许的范围内，椰云网络有判定本人的行为是否符合积分商城服务条款要求的权利，即当本人有违反情形时，椰云网络有权暂停本人在积分商城会员账号的使用。\n
            3、用户依法言行义务\n
            3.1 本协议依据国家相关法律法规规章制定，本人同意严格遵守以下条款：\n
            (1) 不利用积分商城从事非法活动；\n
            (2) 不干扰或混乱网络服务；\n
            (3) 遵守所有使用网络服务的网络协议、规定、程序和惯例。\n
            (4) 如果发现积分商城商品兑换过程中出现商品价格异常，多次兑换无需支付积分等情况，应该尽快向椰云网络客服反馈，不得使用商城漏洞或商品价格出错等异常的情况获取不正当利益。\n
            3.2 本人需对自己在网上的行为承担法律责任，本人若在积分商城上散布和传播反动、色情或其它违反国家法律的信息，积分商城的系统记录有可能作为本人违反法律的证据。若本人的行为违反法律法规规定以及社会公序良俗，椰云网络将有权暂停本人在积分商城会员账号的使用。\n
            4、商品兑换及商品信息\n
            4.1 积分商城上的商品价格、数量、是否有货等商品信息随商城供应商实际情况实时调整变动，由于互联网技术因素等客观原因存在，积分商城显示的信息可能会有一定的滞后性或差错。在商城系统出错或商品价格出错等异常的情况下产生的订单为无效订单，椰云网络有权协助做取消订单或退款、退货处理。\n
            4.2 椰云网络作为积分商城平台交易的经营者，仅提供代付款服务，并非商品的供应商，与供应商无任何代理关系，不提供与商品相关的任何担保。\n
            4.2.1 兑换过程中，本人以一次性支付积分的方式兑换商品时，即同意椰云网络从本人积分余额中将兑换商品所需的积分全额一次性扣除。\n
            4.3 今日金价可能会根据当日基础金价有所调整，基础金价随国际金价和上海黄金交易所综合报价变动。黄金投资产品为特殊产品，金价随国际金价和上海黄金交易所综合报价变动，下单后即为本人同意产品价格波动，订单一经发货后，接受不可以任何形式的退换货，不支持7天无理由退货。\n
            4.4 本人接受，由于灯光、显示器色彩偏差及个人对颜色理解各有不同，导致少数实物可能会与照片存在色差，如无法接受请谨慎兑换。最终颜色以实际产品为准，因受测量环境、物料差异、测量方式等外界因素影响，实际货品的克重可能与标识克重存在略微差异。产品尺寸均为手工质量，可能稍有误差，图示仅供参考，具体请以实物为准。\n
            4.5 下订单后，即视为本人已仔细确认所兑换商品的名称、价格、数量、型号、规格、尺寸、支付方式、联系方式、收货地址、电话、收货人等信息。收货人与本人不一致的，出现收货商品纠纷时，本人知悉由此产生的法律后果及承担商品款项等相关责任。如果已兑换的商品发生退货的情况，本人授权供应商直接将所退积分退回至本人名下的积分商城会员账户。兑换的商品不得无故拒绝签收；兑换的商品，在支付成功后，如遇商品无库存，椰云网络有权为客户取消订单，做退还积分处理。\n
            4.6 本人确认：只有在供应商将本人在订单中兑换的商品从仓库实际直接向本人或本人指定的收货人发出时（以商品出库为标志），方视为本人与供应商之间就实际直接向本人发出的商品建立合同关系。如果本人在一份订单里兑换了多种商品并且供应商只给本人发出了部分商品时，本人与供应商之间仅就实际直接向本人发出的商品建立了合同关系。只有在供应商实际直接向本人发出了订单中兑换的其他商品时，本人和供应商之间就订单中其他已实际直接向本人发出的商品才成立合同关系。本人可随时登录在积分商城注册的会员账户查询订单状态。\n
            5、商品配送及商品售后\n
            5.1 积分商城商品配送均由供应商负责。供应商将会把商品送到本人所指定的收货地址，所有在积分商城上列出的送货时间为参考时间，参考时间的计算是根据库存状况、正常的处理过程和送货时间、送货地点的基础上估计得出的。\n
            因如下情况造成订单延迟或无法配送等，供应商不承担延迟配送责任：\n
            (1) 本人提供的信息错误、地址不详细等原因导致的；\n
            (2) 货物送达前无法联系上收货人，货物抵达后无人签收，导致无法配送或延迟配送的；\n
            (3) 不可抗力因素导致，例如：自然灾害、交通戒严、突发战争等。\n
            5.2 商品的质量、送货服务及售后服务由供应商提供，与椰云网络无关。如与供应商之间就订单商品的买卖、商品质量、送货及售后服务或其他相关事宜发生争议，本人将与供应商协商处理。如遇双方争议的情况，可以请椰云网络进行协调。在争议处理过程中，本人继续按本条款及约定的规定向椰云网络支付兑换商品的积分。\n
            5.3 本人同意供应商将本人订单商品及收货人等个人信息提供给物流公司进行委托配送。为保证正常收货，物流公司配送人员有可能会在送货前联系。本人与配送人员核实后即交付商品。如10个自然日仍无法联系到本人，椰云网络有权取消该次兑换。\n
            5.4 供应商将严格按照中国境内相关法律法规的规定提供商品的质量及售后服务，同时按照不同商品的情况提供订购商品所附的商品说明书、保修卡等相关资料。\n
            6、商城活动\n
            6.1 积分商城不定期开展商品团购、限购、抢购等活动，活动由供应商提供，椰云网络仅提供代付款服务，不提供与活动商品相关的任何担保。相关商品约定参照本条款中关于商品的约定。\n
            6.2 相关活动规则以具体公告为准。\n
            7、其他\n
            7.1 本人知悉：本服务条款是处理双方权利义务的约定，除非违反国家强制性法律，否则始终有效。在本人下订单的同时，表示本人明确知晓以上事实，并与椰云网络达成协议并接受所有的服务条款，并且本人对本人在订单中提供的所有信息的正确、完整和真实性负责。\n
            7.2 本人确认：椰云网络对本合约中有关免除或限制椰云网络责任、椰云网络单方面拥有某些权利、增加本人责任或限制本人权利的条款，均已向本人进行了提示和说明。\n
            7.3一旦勾选，即视为本人已经完全了解并接受本协议的全部内容，本人已阅读协议条款，充分了解协议相关信息，将严格按条款内容兑换商品或服务，对本协议条款的含义和相应的法律后果已全部清楚并理解，愿意遵守其全部内容。同时本人声明填写的信息内容完全属实，并保证其内容的真实性。\n
            </Text>
        </View>
    )}
}



