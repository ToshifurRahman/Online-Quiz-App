import { useState } from "react";
import CreateQuestion from "./CreateQuestion";
import { useSelector } from "react-redux";
import QuizForm from "../components/QuizForm";
import { sendManyQuestionToServer } from "../feature/question/questionFetch";
import { createQuizAndSendServer } from "../feature/quiz/quizFetch";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


const CreateQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizData, setQuizData] = useState([]);
  const [submitQuizAttempt, setSubmitQuizAttempt] = useState(false);
  const [questions, setQuestions] = useState(Array(quizData.length).fill(''));
  const [submitData, setSubmitData] = useState(false);
  const quizLength = Number(quizData.questionLength);
  const user = useSelector(state=>(state.User.currentUser))

  const handleReceiveQuizData = (data) => {
    setQuizData(data);
    setSubmitQuizAttempt(true);
  };

  const handleReceiveQuestionData = async (obj, index) => {
    setCurrentQuestionIndex(index);
    const updatedResponses = [...questions];
    updatedResponses[currentQuestionIndex] = obj;
    setQuestions(updatedResponses);
    if (currentQuestionIndex < quizLength - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    // console.log(updatedResponses)
    // console.log(quizData)
  
    if (index == quizData.questionLength- 1) {
      const data = await sendManyQuestionToServer(updatedResponses);
  
      // console.log(data )
      // console.log(data.questionIds  )
      // console.log(quizData)
      console.log(user)
      console.log(user.userUid)
      const obj = {
        ...quizData,
        timeLimit:quizData.timeLimit*60,
        CreateBy:user.userUid,
        questions: data.questionIds,
      };
      console.log(obj)
      createQuizAndSendServer(obj);
      setSubmitData(true);
    }
  };



  return (
    <div className="">
     { !submitData?
      <div>
     {!submitQuizAttempt ? (
        <QuizForm quizDataPass={handleReceiveQuizData} />
      ) : (
        <div>
          <CreateQuestion
            index={currentQuestionIndex}
            dataPass={handleReceiveQuestionData}
            quizData={quizData}
          />
         
        </div>
      )}
     </div>:
     //after submit the quiz this component will
     <div className="flex items-center justify-center border border-black w-full h-[80vh] bg-gradient-to-tr from-gray-400  to-gray-500">
            <div className="flex flex-col items-center my-10 text-white space-y-8">
               
                <h1 className="text-5xl font-semibold text-white text-center leading-[65px] ">
                    Successfully Submitted to the <span className="text-[#D85D33]">Quizz</span> <br /> 
                </h1>
              
                
                {/* buttons  */}
                <div className="flex flex-wrap gap-10 items-center py-4">
                    <Link to={"/dashboard"}>
                    <button className="flex items-center gap-4 px-8 py-3 bg-gradient-to-b from-blue-900 to-blue-500 hover:bg-gradient-to-l text-white text-lg font-medium rounded-lg">
                       View all Quizzes{' '}<svg width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">                              <path fillRule="evenodd" clipRule="evenodd" d="M12.2929 4.29289C12.6834 3.90237 13.3166 3.90237 13.7071 4.29289L20.7071 11.2929C21.0976 11.6834 21.0976 12.3166 20.7071 12.7071L13.7071 19.7071C13.3166 20.0976 12.6834 20.0976 12.2929 19.7071C11.9024 19.3166 11.9024 18.6834 12.2929 18.2929L17.5858 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H17.5858L12.2929 5.70711C11.9024 5.31658 11.9024 4.68342 12.2929 4.29289Z" fill="white"></path></g></svg>
                    </button>
                    </Link>
                    <Link><button className="flex items-center gap-4 px-8 py-3 bg-gradient-to-t from-black to-white/10 text-white text-lg font-medium rounded-lg">
                      Home{' '}
                    </button></Link>
                </div>
            </div>
        </div>
     }
     
    </div>
  );
};

export default CreateQuiz;
