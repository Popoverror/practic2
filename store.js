import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    plugins: [createPersistedState()],
    state: {
        count: 0,
        isDark: true
    },
    mutations: {
        setCount: (state, count) => state.count = count,
        changeTheme: (state, isDark) => state.isWhite = isDark,
    },
    getters: {
        getCount: (state) =>
        {
            return state.count
        },
        getTheme: (state) =>
        {
            return state.isDark
        }
    }  
})
export default store;