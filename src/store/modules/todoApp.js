const storage = {
  fetch() {
    const arr = [];
    if (localStorage.length > 0) {
      for (const key of Object.keys(localStorage)) {
        if (key !== "loglevel:webpack-dev-server") {
          arr.push(JSON.parse(localStorage.getItem(key)));
        }
      }
    }
    return arr;
  }
};

// const findPrimaryKey = payload => {
//   const keys = Object.keys(localStorage);

//   const filteredKeys = keys.filter(
//     key => key !== "loglevel:webpack-dev-server"
//   );

//   const findKey = filteredKeys.find(key => {
//     const { item } = JSON.parse(localStorage.getItem(key)) || {};
//     return item === payload.todoItem.item;
//   });

//   return findKey;
// };

const state = {
  todoItems: storage.fetch()
};

const getters = {
  storedTodoItems(state) {
    return state.todoItems;
  }
};

const mutations = {
  addOneItem(state, payload) {
    const obj = {
      id: state.todoItems.length + 1,
      completed: false,
      item: payload
    };
    localStorage.setItem(state.todoItems.length + 1, JSON.stringify(obj));
    state.todoItems.push(obj);
  },

  removeOneItem(state, payload) {
    localStorage.removeItem(payload.todoItem.id);
    state.todoItems.splice(payload.index, 1);
  },

  editOneItem(state, payload) {
    state.todoItems[payload.index].item = payload.newValue;

    localStorage.removeItem(payload.todoItem.id);
    localStorage.setItem(payload.todoItem.id, JSON.stringify(payload.todoItem));
  },

  toggleOneItem(state, payload) {
    state.todoItems[payload.index].completed = !state.todoItems[payload.index]
      .completed;

    localStorage.removeItem(payload.todoItem.id);
    localStorage.setItem(payload.todoItem.id, JSON.stringify(payload.todoItem));
  },

  clearAllItem(state) {
    localStorage.clear();
    state.todoItems = [];
  }
};

export default {
  state,
  getters,
  mutations
};
