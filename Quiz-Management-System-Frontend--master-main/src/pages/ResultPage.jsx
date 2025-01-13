import { AiOutlineMail } from "react-icons/ai";

import { MdAccountBox } from "react-icons/md";
import { BiTimeFive } from "react-icons/bi";

// ResultPage.js
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import CircularProgress from "../components/CircularProgress";
import { VscPass } from "react-icons/vsc";
import { useParams } from "react-router-dom";
import { fetchQuizById } from "../feature/quiz/quizFetch";
import { BaseUrl } from "../app/api";

const ResultPage = ({ quizId }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [Preview, setPreview] = useState(false);
  const [participantHistory, setParticipantHistory] = useState([]);
  const [participant, setParticipant] = useState([]);
  const [info, setInfo] = useState({});
  const userUid = useParams().id;
  const quizzesId = useParams().quizId;
  console.log(quizzesId);
  console.log(useParams());
  console.log(userUid);

  useEffect(() => {
    const fetchParticipantHistory = async () => {
      try {
        const url = `${BaseUrl}/participants/${userUid}/quizId/${quizzesId}`;
        const response = await axios.get(url);
        setLoading(false);
        console.log(response.data);
        const { participant, history } = response.data;
        setParticipant(participant);
        setParticipantHistory(history[history.length - 1]);
        const result = await fetchQuizById(quizzesId);
        setQuestions(result.questions);
        setInfo(result);
      } catch (error) {
        console.error("Error fetching participant history:", error);
        console.log(error.message);
        setLoading(false);
      }
    };

    fetchParticipantHistory();
  }, [quizId]);

  function millisecondsToLocalTimeString(milliseconds) {
    // Create a new Date object with milliseconds
    var date = new Date(milliseconds);

    // Use built-in Date methods to get components of the date/time
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    // Ensure two digits format (e.g., 01 instead of 1)
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Construct the time string in HH:MM:SS format
    var timeString = hours + ":" + minutes + ":" + seconds;

    return timeString;
  }

  function secondsToTimeString(totalSeconds) {
    // Calculate hours, minutes, and seconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Format hours, minutes, and seconds with leading zeros if necessary
    const hoursString = String(hours).padStart(2, "0");
    const minutesString = String(minutes).padStart(2, "0");
    const secondsString = String(seconds).padStart(2, "0");

    // Construct the time string in HH:MM:SS format
    return `${hoursString}:${minutesString}:${secondsString}`;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  console.log(questions);
  console.log(participantHistory);
  const { correctAnswer, userResponses } = participantHistory;
  console.log(correctAnswer);
  console.log(userResponses);

  const { completionTimestamp, startTime, endTime, date } = participantHistory;
  console.log(startTime);

  const totalTime = secondsToTimeString(info.timeLimit);
  const timeSpan = secondsToTimeString(completionTimestamp);

  const calculateTimeSpanInPercent = Math.round(
    (completionTimestamp / info.timeLimit) * 100
  );
  console.log(calculateTimeSpanInPercent);

  console.log(timeSpan);
  const quizStartTime = millisecondsToLocalTimeString(startTime);
  const quizEndTime = millisecondsToLocalTimeString(endTime);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div>
        <div className="sm:max-w-7xl md:mx-auto bg-gray-10 py-10 mt-10 rounded-xl mb-6">
          {/* user Info */}
          <div className="px-5 mt-10 ">
            <p className="font-serif">User Result</p>
            <div className="flex gap-3 text-xl items-center font-serif">
              <p className="text-2xl">
                <MdAccountBox />
              </p>
              <p className="font-semibold">{participant.name}</p>
            </div>
            <div className="flex gap-3 text-lg items-center font-serif">
              <p className="text-xl pl-1 ">
                <AiOutlineMail />
              </p>
              <p className="font-serif">{participant.email}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 grid-cols-1   p-5 gap-10 ">
            <div className="grid grid-cols-2  rounded-xl shadow-lg">
              <div className="p-5">
                <div
                  className={`flex mt-2 gap-2 items-center font-bold ${
                    participantHistory.quizScore > 49
                      ? "text-green-500"
                      : "text-red-500"
                  } text-green-500`}
                >
                  <p className="text-2xl font-bold  ">
                    <VscPass />
                  </p>
                  <p className="text-xl font-serif">
                    Test{" "}
                    {participantHistory.quizScore > 49 ? "Passed" : "Failed"}
                  </p>
                </div>
                <div className="text-xl font-mono ">
                  <p>Grade</p>
                  <p>B</p>
                </div>
              </div>
              <div className="p-3">
                <CircularProgress
                  percentageValue={participantHistory.quizScore}
                />
              </div>
            </div>

            <div className="rounded-xl text-black   p-2 shadow-lg">
              <div className=" mt-2   ">
                <div className="flex items-center gap-3 font-bold ">
                  <p>
                    <BiTimeFive />
                  </p>
                  <p>Total Time</p>
                </div>

                <div className="px-6 space-y-5 mt-2 font-semibold ">
                  <div>
                    <p>
                      {timeSpan} / {totalTime}
                    </p>
                  </div>

                  {/* progressBar start */}
                  <div className="flex flex-col w-[350px] mx-auto gap-2">
                    <div
                      className={`flex h-2 w-full  items-center justify-center rounded-full bg-gray-300`}
                    >
                      <div
                        style={{ width: `${calculateTimeSpanInPercent}%` }}
                        className={` mr-auto h-2 w-0 rounded-full  bg-gray-800 transition-width duration-500`}
                      ></div>
                    </div>
                  </div>
                  {/* progressBar end */}

                  <div className="flex  justify-between">
                    <p>Start Time : {quizStartTime}</p>
                    <p>Date : {formatDate(date)}</p>
                  </div>

                  <p>End Time : {quizEndTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* preview */}
        <div className="text-center">
          <button onClick={()=>setPreview(!Preview)}
           className="relative mb-6 h-14 w-32 origin-top transform rounded-lg border-4 border-[#32012F] text-xl text-black before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-[#32012F]">
          {Preview?"Hide":"Preview"}
          </button>
        </div>
      </div>

      {
        Preview && 
        <div className="my-10 px-10 ">
        {questions &&
          questions.map((question, index) => (
            <div className="my-5" key={question._id}>
              <h2 className="text-2xl font-semibold">Question {index + 1}</h2>

              {questions[index].media && (
                <div className="w-full h-40 my-2 flex justify-center">
                  <img
                    src={questions[index].media}
                    alt={questions[index].text}
                  />
                </div>
              )}

              <p className="text-xl font-mono my-1 text-gray-900">
                {question.text} {/* Replace dynamic content with static */}
              </p>
              <div className="grid md:grid-cols-2 gap-2">
                {questions[index].options.map((option, indx) => (
                  <div
                    className={`${
                      correctAnswer[index] === option
                        ? "correct rounded-md"
                        : userResponses[index] === option
                        ? "wrong rounded-md"
                        : "defaults"
                    }`}
                    key={indx}
                  >
                    <label htmlFor={`option-${index}`}>
                      {index + 1}.{option}{" "}
                    </label>
                  </div>
                ))}
              </div>
              {/* <p className="text-xl font-serif my-1">Explanation</p> */}
            </div>
          ))}
      </div>
      }
    </>
  );
};

export default ResultPage;
