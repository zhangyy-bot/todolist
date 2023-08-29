import Vue from 'vue';
import LoadingView from '@/components/LoadingView';

// 创建一个组件构造器
const loadingFn = Vue.extend(LoadingView);
// 创建组件实例
const loadingCpn = new loadingFn();
// 通过$mount进行挂载
loadingCpn.$mount();

Vue.directive('loading', {
  // 被绑定元素插入父节点时调用
  inserted(el, binging) {
    console.log(binging);
    // binging.value 指令的绑定值
    if (binging.value) {
      console.log('el', el);
      console.log('loadingCpn.$el', loadingCpn.$el);
      el.appendChild(loadingCpn.$el);
    }
  },
  // 所有组件的VNode更新时调用 但是可能发生在其子VNode更新之前
  update(el, binging) {
    binging.value ? el.appendChild(loadingCpn.$el) : el.removeChild(loadingCpn.$el);
  },
});
