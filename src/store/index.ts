import { createStore } from "vuex";

export default createStore({
  state: {
    token: localStorage.getItem("token") || null,
  },
  getters: {},
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    getToken(context, credentials) {
      return new Promise((resolve, reject) => {
        try {
          fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.name,
              password: credentials.email,
            }),
          })
            .then((res) => {
              if (res.ok) return res.json();
              throw new Error(res.status.toString());
            })
            .then((res) => {
              localStorage.setItem("token", res.token);
              context.commit("setToken", res.token);
              resolve(res);
            });
        } catch (err) {
          switch (err) {
            case "400":
              return reject("Wrong credentials");
            default:
              reject("Something wrong, sorry");
          }
        }
      });
    },
    removeToken(context) {
      localStorage.removeItem("token");
      context.commit("setToken", null);
    },
  },
  modules: {},
});
