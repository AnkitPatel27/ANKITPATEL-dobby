import {configureStore, createSlice} from "@reduxjs/toolkit";
const loginSlice = createSlice({
    name: 'login',
    initialState:{isLogin:false},
    reducers:{
        settrueLogin(state){
            state.isLogin = true;
        },
        setfalseLogin(state){
            state.isLogin = false;
        }
    }
});

export const loginActions = loginSlice.actions;
const store = configureStore({reducer:{logins:loginSlice.reducer}});
export default store; 