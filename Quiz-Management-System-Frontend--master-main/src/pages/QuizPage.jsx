
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import QuizHeader from "../components/QuizHeader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { fetchQuizById, submitQuizAttemptForQuizzes } from "../feature/quiz/quizFetch";
import { ProgressBar } from "../components/ProgressBar";
import { useSelector } from "react-redux";
import { submitQuizForParticipant } from "../feature/participant/participantFetch";
import NotAvailable from "../components/NotAvailable";


const QuizPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [questionsData, setQuestionsData] = useState([]);
  const [timeLimit, setTimeLimit] = useState();
  const [timeStart, setTimeStart] = useState();
  const currentUser = useSelector(state=>state.User.currentUser)
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search)
  const metricId = queryParams.get("metricId")
   
 
  //  console.log(questionsData[currentQuestionIndex])

  useEffect(() => {
    const startTime = new Date();
    setTimeStart(startTime);
      console.log(startTime.getTime())
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchQuizById(id);
        setQuestionsData(data.questions);
        setTimeLimit(data.timeLimit);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
        setLoading(false);
      }
    };
    fetchData(id);
  }, [id]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState(
    Array(questionsData.length).fill("")
  );
  // Function to handle selecting an answer for the current question
  const handleAnswerSelect = (selectedOption) => {
    const updatedResponses = [...userResponses];
    updatedResponses[currentQuestionIndex] = selectedOption;
    setUserResponses(updatedResponses);
  };

  // Function to navigate to the previous question
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Function to navigate to the next question
  const goToNextQuestion = () => {
    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };


  // function to calculate the score based on user responses and questions
  const calculateScore = (userResponses, questionsData) => {
    let score = 0;
    let totalQuestion = questionsData.length;
    let correctAnswer=[]
    questionsData.forEach((question, index) => {
      if (userResponses[index] === question.options[question.answer-1]) {
        console.log(userResponses[index])
        console.log(question.options[question.answer-1])
        score += 1;
      }
      correctAnswer.push(question.options[question.answer-1])
    });
    let totalCorrectAns = score;
    let totalWrongAns = totalQuestion-score;

    
    // Calculate the score percentage
    const quizScore = Math.round((score / questionsData.length) * 100);
   const scoreObj ={
      totalQuestion,
      totalCorrectAns,
      totalWrongAns,
      quizScore,
      correctAnswer
    }
    return scoreObj;
  
  };
  



  // Function to handle submission of user responses
  const handleSubmit = async () => {
   
    const Endtime = new Date();
    const completionTimestamp = Math.round(timeStart ? (Endtime - timeStart) / 1000 : 0);
    console.log("total timespend is:" + completionTimestamp);  
    const quizScoreObj = calculateScore(userResponses, questionsData);
     
   
        
    const ParticipantInfo = {
      name: currentUser.name,
      email: currentUser.email,
      userUid:currentUser.userUid,
      quizId: id,
      metricId,
      startTime:timeStart.getTime(),
      endTime:Endtime.getTime(),
      date:new Date().toLocaleDateString(),
      ...quizScoreObj,
      completionTimestamp,
      userResponses
    }
     
    console.log(ParticipantInfo)
     const response =  await submitQuizAttemptForQuizzes(ParticipantInfo)
     const attemptId = response.id;
     console.log(attemptId)
     console.log(currentUser.userUid)
     console.log(currentUser)
     navigate(`/result/userUid/${currentUser.userUid}/quizId/${ParticipantInfo.quizId}`)
    console.log("User Responses:", userResponses);
  };

  const handleTimeout = () => {
    handleSubmit();
  };
  
  const receiveTimePass = (time) => {
    // setTimePassed(time)
  };

  

  if (loading) {
    return <Loader />;
  }
if(questionsData.length)
return (
  <div className="min-h-screen rounded-lg border-[#524C42] border-2 bg-no-repeat max-w-6xl mx-auto mb-6 mt-6">
    <motion.div
    className="bg-transparent max-w-6xl mx-auto"
    initial={{ opacity: 0, scale: 0.5, rotate: -10, skewX: 10 }}
    animate={{ opacity: 1, scale: 1, rotate: 0, skewX: 0 }}
    transition={{ duration: 0.5 }}
  >
    <QuizHeader timer={timeLimit} 
    handleTimeout={handleTimeout} 
    passTime={receiveTimePass}
    questionsData={questionsData}
      
    />
    <motion.div
      className="my-10 px-5"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.h2
        className="text-2xl font-semibold"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Question {currentQuestionIndex + 1}
      </motion.h2>
      {questionsData[currentQuestionIndex].media && (
        <motion.div
          className="w-full h-40 my-2 flex justify-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.img
            src={questionsData[currentQuestionIndex].media}
            alt={questionsData[currentQuestionIndex].text}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
      )}
      <motion.p
        className="text-xl text-gray-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        {questionsData[currentQuestionIndex].text}
      </motion.p>
      <motion.div
        className="grid grid-cols-2 gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        {questionsData[currentQuestionIndex].options.map((option, index) => (
          <motion.div
            className="defaults bg-[#F97300] rounded-lg text-[#E2DFD0]"
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
          >
            <input
              type="radio"
              id={`option-${index}`}
              name="answer"
              value={option}
              checked={userResponses[currentQuestionIndex] === option}
              onChange={() => handleAnswerSelect(option)}
            />
            <label htmlFor={`option-${index}`}>{" "}{option}</label>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  
      <ProgressBar questionsData={questionsData} userResponses={userResponses}/>
  
    <div className="w-full flex justify-between px-2 py-4">
      <motion.button
        onClick={goToPreviousQuestion}
        className={`px-6 py-1 border-[2px] ${
          currentQuestionIndex === 0
            ? "border-[#524C42] rounded-md text-black"
            : "border-custom-Yellow-Quiz rounded-md bg-yellow-500 text-white hover:bg-transparent hover:text-black"
        }`}
        disabled={currentQuestionIndex === 0}
        whileHover={{ scale: 1.1, rotate: [0, -5, 0, 5, 0] }}
        transition={{ duration: 0.3 }}
      >
        Previous
      </motion.button>
      <motion.button
        className={`px-6 py-1 border-[2px] bg-[#32012F] ${
          currentQuestionIndex === questionsData.length - 1
            ? "text-red-500 opacity-100 border-red-500 bg-[#E2DFD0] rounded-md"
            : "border-[#524C42] rounded-md hover:bg-yellow-500 hover:text-white  text-custom-Yellow-Quiz"
        }`}
        onClick={goToNextQuestion}
        disabled={currentQuestionIndex === questionsData.length - 1}
        whileHover={{ scale: 1.1, rotate: [0, -5, 0, 5, 0] }}
        transition={{ duration: 0.3 }}
      >
        Next
      </motion.button>
    </div>
    <motion.div
      className="flex w-full justify-center items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
    >
      <motion.button
        className="px-6 py-1 border-[2px] border-green-600 text-white rounded-full bg-green-600 hover:bg-green-800 hover:text-white"
        onClick={handleSubmit}
        type="submit"
        whileHover={{ scale: 1.1, rotate: [0, -5, 0, 5, 0], backgroundColor: "#4CAF50" }}
        transition={{ duration: 0.3 }}
      >
        Submit
      </motion.button>
    </motion.div>
  </motion.div>
  
  </div>  
    )
 else{
  return (
  <div className="text-5xl font-mono  my-20 text-bl flex flex-col justify-center items-center">
    No Available Quiz
    <div className="mx-auto w-full">
          
            <div className=" flex justify-center ">
            <img className="w-[620px]  h-[520px]"
            src="/images/noAvailabel2.jpg" alt="not available " />
            </div>
        </div>
    
 </div>
 )
 }

};

export default QuizPage;
