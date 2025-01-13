import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  currentUser: JSON.parse(localStorage.getItem('currentUser')),
  loading: false,
  error: null,
};



const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    signInSuccess(state, action) {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    signOutSuccess(state) {
      
      state.currentUser = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('currentUser');
      localStorage.clear();
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { signInSuccess, signOutSuccess, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
