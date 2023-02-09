<template>
  <div>
    <transition-group name="list" tag="ul">
      <li
        v-for="(todoItem, index) in this.storedTodoItems"
        :key="todoItem.id"
        class="shadow"
      >
        <template v-if="editingIndex !== index">
          <i
            class="checkBtn fas fa-check"
            :class="{ checkBtnCompleted: todoItem.completed }"
            @click="toggleComplete({ todoItem, index })"
          >
          </i>
          <span :class="{ textCompleted: todoItem.completed }">
            {{ todoItem.item }}
          </span>
          <span class="editBtn" @click="startEditing(index)">
            <i class="fas fa-edit"></i>
          </span>
          <span class="removeBtn" @click="removeTodo({ todoItem, index })">
            <i class="fas fa-trash-alt"></i>
          </span>
        </template>
        <template v-else>
          <div>
            <input ref="inputField" v-model="editValue" />
          </div>
          <span
            class="modifyTodo"
            @click="editTodo({ todoItem, newValue: editValue, index })"
          >
            <i class="fas fa-check"></i>
          </span>
          <span class="removeBtn" @click="stopEditing">
            <i class="fas fa-times"></i>
          </span>
        </template>
      </li>
    </transition-group>

    <Modal v-if="showModal" @close="showModal = false">
      <h3 slot="header">
        변경!
        <i class="closeModalBtn fas fa-times" @click="showModal = false"></i>
      </h3>
      <div slot="body">
        변경이 완료되었습니다!.
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Modal from "./common/Modal.vue";

export default {
  data() {
    return {
      editingIndex: null,
      editValue: "",
      showModal: false
    };
  },
  components: {
    Modal
  },
  computed: {
    ...mapGetters(["storedTodoItems"])
  },
  methods: {
    ...mapMutations({
      removeTodo: "removeOneItem",
      toggleComplete: "toggleOneItem"
    }),
    startEditing(index) {
      this.editingIndex = index;
      this.editValue = this.storedTodoItems[index].item;
      this.$nextTick(() => {
        this.$refs.inputField[0].focus();
        this.$refs.inputField[0].selectionStart = this.$refs.inputField[0].value.length;
      });
    },
    stopEditing() {
      this.editingIndex = null;
    },
    editTodo({ todoItem, newValue: editValue, index }) {
      const editCheck = this.storedTodoItems[index].item === this.editValue;
      if (!editCheck) {
        this.$store.commit("editOneItem", {
          todoItem,
          newValue: editValue,
          index
        });
        this.showModal = !this.showModal;
      }
      this.stopEditing();
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.modifyTodo {
  margin-left: auto;
  margin-right: -77.5%;
}
.editBtn {
  margin-left: auto;
  margin-right: -90%;
}
.removeBtn {
  margin-left: auto;
  color: #de4343;
}
.checkBtnCompleted {
  color: #b3adad;
}
.textCompleted {
  text-decoration: line-through;
  color: #b3adad;
}
.closeModalBtn {
  float: right;
  color: #42b983;
}

/* 리스트 아이템 트랜지션 */
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
