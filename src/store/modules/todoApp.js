const storage = {
  fetch() {
    const arr = [];
    if (localStorage.length > 0) {
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== "loglevel:webpack-dev-server") {
          arr.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
      }
    }
    return arr;
  }
};

const findPrimaryKey = payload => {
  const keys = Object.keys(localStorage);

  const filteredKeys = keys.filter(
    key => key !== "loglevel:webpack-dev-server"
  );

  const findKey = filteredKeys.find(key => {
    const { item } = JSON.parse(localStorage.getItem(key)) || {};
    return item === payload.todoItem.item;
  });

  return findKey;
};

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
      completed: false,
      item: payload
    };
    localStorage.setItem(state.todoItems.length + 1, JSON.stringify(obj));
    state.todoItems.push(obj);
  },

  removeOneItem(state, payload) {
    const primaryKey = findPrimaryKey(payload);

    localStorage.removeItem(primaryKey);
    state.todoItems.splice(payload.index, 1);
  },

  toggleOneItem(state, payload) {
    const primaryKey = findPrimaryKey(payload);
    state.todoItems[payload.index].completed = !state.todoItems[payload.index]
      .completed;

    localStorage.removeItem(primaryKey);
    localStorage.setItem(primaryKey, JSON.stringify(payload.todoItem));
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
