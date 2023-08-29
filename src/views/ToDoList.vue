<template>
  <div>
    <div class="ro-do-list">
      <input
        class="input"
        type="text"
        v-model="val"
        @keyup.enter="enter"
        placeholder="请输入你的任务名称， 按回车健确认"
      />
      <article>
        <ul>
          <li v-for="item in lists" :key="item.value">
            <div>
              <input type="checkbox" v-model="item.isCompleted" @click.stop="change(item)" />
              <span>{{ item.value }}</span>
            </div>
            <button @click="toDetail(item.id)">详情</button>
            <button @click="del(item)">删除</button>
          </li>
        </ul>
      </article>
      <footer v-if="lists.length > 0">
        <div>
          <input type="checkbox" @click="allChange" v-model="allCheckedFlag" />
          <span>已完成{{ finishedListsNum }}/全部{{ allListsNum }}</span>
        </div>
        <button @click="clear" type="danger">清楚已完成任务</button>
      </footer>
      <footer v-else>没有任务，请添加~</footer>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
  data() {
    let val = '';
    let allCheckedFlag = false;
    return {
      val,
      allCheckedFlag,
    };
  },
  computed: mapState({
    lists(state) {
      return state.lists;
    },
    allListsNum(state) {
      return state.lists.length;
    },
    finishedListsNum(state) {
      const finishedLists = state.lists.filter((item) => item.isCompleted === true);
      return finishedLists.length;
    },
  }),
  watch: {
    lists: {
      deep: true,
      immediate: true,
      handler: function (val) {
        if (val.length > 0) {
          this.allCheckedFlag = val.every((item) => item.isCompleted === true);
        } else {
          this.allCheckedFlag = false;
        }
      },
    },
  },

  methods: {
    ...mapMutations(['enterList', 'changeCheck', 'delList', 'clearLists', 'allChangeCheck']),
    // 添加任务
    enter() {
      let flag = this.lists.every((item) => item.value !== this.val);
      if (flag) {
        let time = new Date().valueOf();
        this.enterList({ value: this.val, isCompleted: false, id: time });
      } else {
        alert('任务已存在，请勿重复添加');
      }
      this.val = '';
    },
    // 改变任务状态
    change(item) {
      this.changeCheck({ item });
    },
    // 删除任务
    del(item) {
      this.delList({ item });
    },
    // 清除已完成任务
    clear() {
      this.clearLists();
    },
    // 全选或取消全选
    allChange() {
      this.allCheckedFlag = !this.allCheckedFlag;
      this.allChangeCheck({ flag: this.allCheckedFlag });
    },
    // 动态路由跳转
    toDetail(id) {
      console.log(id);
      this.$router.push({
        path: `/detail/${id}`,
      });
    },
  },
};
</script>
<style lang="less">
ul,
li,
input {
  padding: 0;
  margin: 0;
}
input {
  box-sizing: border-box;
}
li {
  list-style: none;
}
.ro-do-list {
  width: 300px;
  border: 2px solid #ccc;
  padding: 10px;
  .input {
    width: 300px;
  }
  article {
    margin-top: 5px;
    li {
      display: flex;
      justify-content: space-between;
      border: 1px solid #ccc;
      border-top: 0;
      button {
        border: none;
        color: rgba(33, 105, 211);
        background: none;
      }
    }
    li:first-child {
      border-top: 1px solid #ccc;
    }
  }
  footer {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    button {
      background: rgba(208, 81, 72);
      border: 2px solid rgba(184, 125, 121);
      border-radius: 5px;
      color: #fff;
      border: none;
    }
  }
}
</style>
