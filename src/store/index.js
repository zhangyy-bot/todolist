import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  /**
   * 在开发环境开启严格模式 这样修改数据 就必须通过mutation来处理
   * strict: products.env.NODE_ENV !== 'production',
   */
  // 状态
  state: {
    lists: JSON.parse(localStorage.getItem('list')) || [],
  },
  // 可以直接访问state中的数据
  getters: {},
  // 用于处理状态 赋值操作 state payload传对象类型
  mutations: {
    enterList(state, payload) {
      state.lists.push(payload);
      localStorage.setItem('list', JSON.stringify(state.lists));
    },
    changeCheck(state, payload) {
      let index = state.lists.indexOf(payload.item);
      state.lists[index].isCompleted = !state.lists[index].isCompleted;
      localStorage.setItem('list', JSON.stringify(state.lists));
    },
    delList(state, payload) {
      let index = state.lists.indexOf(payload.item);
      state.lists.splice(index, 1);
      localStorage.setItem('list', JSON.stringify(state.lists));
    },
    clearLists(state) {
      state.lists = state.lists.filter((item) => item.isCompleted === false);
      localStorage.setItem('list', JSON.stringify(state.lists));
    },
    allChangeCheck(state, payload) {
      state.lists.map((item) => (item.isCompleted = payload.flag));
      localStorage.setItem('list', JSON.stringify(state.lists));
    },
  },
  // 用于异步处理 业务代码 context(和store对象具有相同方法和属性的对象)
  actions: {},
  // 用于挂载模块
  modules: {},
});
