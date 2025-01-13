import { createSlice } from "@reduxjs/toolkit";


const initialQuestion= {
//    qustionData:{
//     text: "",
//     options: [],
//     answer: "",
//     explanation: "",
//     media: "",
//     hint: "",
//     points: "",
//     userUid:""
//    },
   questionArray:[],


};

export const questionSlice = createSlice({
    name:"questions",
    initialState:initialQuestion,
    reducers:{
        showQuestions:(state)=>state,
        addQuestions:(state,action)=>{
            state.questions.push(action.payload);
        },
        addQuestionData:(state,action)=>{
            state.questionArray.push(action.payload);
            console.log(state.questionArray)
        },
        
        // updateBook:(state,action)=>{
        //     const {id,title,author} = action.payload;
        //    const isBookExist = state.books.filter((book)=>book.id===id);
        //    if(isBookExist){
        //     isBookExist[0].title = title;
        //     isBookExist[0].author = author;
        //    }
        // },
        
        // deleteBook:(state,action)=>{
        //    const id=action.payload;
        //    state.books = state.books.filter(book=>book.id!==id);
        // }
    }
});

export const {showQuiz,addTitle,addQuestionData} = questionSlice.actions;
export default questionSlice.reducer;