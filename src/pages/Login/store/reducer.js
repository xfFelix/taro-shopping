const defaultState = {
  locations: [
    {label: '+86 中国', value: '0', id: 0},
    {label: '+852 香港', value: '1', id: 1}
  ]
}

export default (state = defaultState, action) => {
  switch(action.type) {
    default:
      return state
  }
}
