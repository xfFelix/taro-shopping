export default {
  data: () => ({
    typeList: [
      { name: '电费', nameImg: 'name01', type: 13, imgUrl: 'dianfeic', icon: 'dianfei' },
      { name: '水费', nameImg: 'name02', type: 12, imgUrl: 'shuifeic', icon: 'shuifei' },
      { name: '燃煤费', nameImg: 'name03', type: 14, imgUrl: 'ranqifeic', icon: 'ranqifei' }
    ],
    groupList: [
      { label: '我家', value: 0, id: 0 },
      { label: '父母', value: 1, id: 1 },
      { label: '朋友', value: 2, id: 2 },
      { label: '其他', value: 3, id: 3 }
    ]
  }),
  methods: {
    findNameByType(id) {
      const filter = this.typeList.reduce((pre, cur) => {
        pre[cur.type] = cur.name
        return pre
      }, {})
      return filter[+id]
    },
    findImgByType(id) {
      const filter = this.typeList.reduce((pre, cur) => {
        pre[cur.type] = cur.imgUrl
        return pre
      }, {})
      return filter[+id]
    },
    findIconByType(id) {
      const filter = this.typeList.reduce((pre, cur) => {
        pre[cur.type] = cur.icon
        return pre
      }, {})
      return filter[+id]
    },
    findClassByType(id) {
      const filter = this.typeList.reduce((pre, cur) => {
        pre[cur.type] = cur.nameImg
        return pre
      }, {})
      return filter[+id]
    },
    findNameByGroup(id) {
      const filter = this.groupList.reduce((pre, cur) => {
        pre[cur.id] = cur.label
        return pre
      }, {})
      return filter[+id]
    }
  }
}
