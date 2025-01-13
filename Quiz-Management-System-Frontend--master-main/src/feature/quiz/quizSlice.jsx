import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../app/api";





export const fetchQuizData = createAsyncThunk(
    'quiz/fetchQuizData',
    async (userUid) => {
      console.log(userUid)
      try {
        const response = await axios.get(`${BaseUrl}/quizzes/userUid/${userUid}`);
         console.log(response.data)
        return response.data;
      } catch (error) {
         console.log(error.message)
      }
      
    }
      
  );

  export const deleteQuizById =  async (quizId) => {
    try {
      const response = await axios.delete(`${BaseUrl}/quizzes/${quizId}`);
       console.log(response.data)
      return response.data; 
      // The response should contain a success message
    } catch (error) {
      console.error('Error deleting quiz:', error);
      throw error;
    }
  };



// const data = JSON.parse(localStorage.getItem('quiz'));
// console.log(data)

const initialState = {
    quiz: [],
    // quizData: {
    //   title: "",
    //   questionLength: "",
    //   timeLimit: "",
    //   userId: ""
    // },
    quizCreate: false,
    loading: false, // Add loading state to track fetching status
    error: null,   // Add error state to handle errors
  };
  
  // Create the quiz slice
  export const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchQuizData.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchQuizData.fulfilled, (state, action) => {
          state.loading = false;
          state.quiz = action.payload;
        })
        .addCase(fetchQuizData.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
     
        
    },
  });
  


  export const { showQuiz, addTitle, addQuiz, addQuizData, quizFormStatus } = quizSlice.actions;
  export default quizSlice.reducer;