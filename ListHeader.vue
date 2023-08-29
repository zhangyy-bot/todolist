<template>
  <div class="list-header">
    <input
      type="text"
      v-model="val"
      placeholder="请输入任务名称"
      @keyup.enter="enter"
    />
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  props: {},
  setup() {
    const store = useStore();
    let val = ref("");
    let lists = computed(() => {
      return store.state.lists;
    });
    // 回车
    const enter = () => {
      let res = lists.value.find((item) => item.title === val.value);
      if (res) {
        alert("任务已存在");
      } else {
        store.commit("addTodo", { title: val.value, isCompleted: false });
      }
      val.value = "";
    };
    return {
      val,
      enter,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less"></style>
