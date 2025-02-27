import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    /* 聊天类型 */
    chatType: '',
    /* 记录登录状态 */
    isLogin: false,
    /* 我的信息 */
    myInfo: {
      img: 'http://img.mp.itc.cn/upload/20170808/5861bc790e654d56bc9289c567b44875_th.jpg',
      name: ''
    },
    /* 别人的信息（特指聊天对象） */
    userInfo: {
      img: '',
      name: ''
    },
    /* 用户列表 */
    userList: [],
    /* 聊天记录 */
    chatMessageList: []
  },
  mutations: {
    /* 聊天记录的修改,这里我们使用vuex监听 */
    SOCKET_updateChatMessageList(state, data) {
      state.chatMessageList.push(data)
    },
    /* 修改聊天类型 */
    changeChatType(state, data) {
      state.chatType = data
    },
    /* 渲染用户列表 */
    SOCKET_login(state, data) {
      state.userList = data
    },
    setUserInfo(state, data) {
      state.userInfo = data
    },
    setMyInfo(state, data) {
      state.myInfo = data
      state.isLogin = true
    }
  },
  actions: {},
  modules: {}
  // plugin: {
  //   p1: new VueSocketIO({
  //     debug: false,
  //     connection: 'http://8.138.84.46:3000',
  //     vuex: {
  //       store,
  //       actionPrefix: 'SOCKET_',
  //       mutationPrefix: 'SOCKET_'
  //     }
  //   })
  // }
})

export default store
