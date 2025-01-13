import { configureStore } from '@reduxjs/toolkit'
import quizReducer from '../feature/quiz/quizSlice'
import userReducer from '../feature/participant/participantSlice'
import questionReducer from '../feature/question/questionSlice'


// import filtersReducer from '../features/filters/filtersSlice'

export const store = configureStore({
  reducer: {
     quiz: quizReducer,
     User:userReducer,
     questions:questionReducer,
    // filters: filtersReducer,
  },
})