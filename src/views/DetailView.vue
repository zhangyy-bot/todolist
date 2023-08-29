<template>
  <div class="detail" v-loading="isLoading">
    <h1>{{ listId }}</h1>
    <section>
      <div>任务状态：{{ listState | stateToStr }}</div>
      <div>任务详情：{{ listDetail }}</div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listState: '',
      listDetail: '',
      isLoading: true,
    };
  },
  computed: {
    listId() {
      return parseInt(this.$route.params.id);
    },
  },
  filters: {
    stateToStr: function (val) {
      val = val === true ? '已完成' : '未完成';
      return val;
    },
  },
  created() {
    const list = this.$store.state.lists.filter((item) => item.id === this.listId);
    this.listState = list[0].isCompleted;
    this.listDetail = list[0].value;
  },
  mounted() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  },
};
</script>
