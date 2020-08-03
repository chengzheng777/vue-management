export default {
    state: {
        appName: "I like Kitty",    // 应用名称
        collapse: false   // 导航栏收缩状态
    },
    getters: {
        collapse(state) {
            return collapse; 
        }
    },
    mutations: {
        collapse(state) { // 改变收缩状态
            state.collapse = !state.collapse;
        }
    },
    actions: {}
}
