import { BiUpArrowAlt } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { deleteParticipant, fetchQuizById } from "../feature/quiz/quizFetch";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";


const QuizDetails = () => {
  const [quiz, setQuiz] = useState(null);
  const { id } = useParams();
  const participants = quiz ? quiz.participantHistory : [];
  console.log(participants);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard

      .writeText(text)
      .then(() => alert("Copied to clipboard", text))
      .catch((error) => console.error("Failed to copy:", error));
  };

  useEffect(() => {
    const fetchSpecificData = async () => {
      try {
        const result = await fetchQuizById(id);
        console.log(result);
        setQuiz(result);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    fetchSpecificData();
  }, [id]);

  if (!quiz) {
    return <Loader />;
  }

  console.log(quiz);

  const handleParticipantDelete = (participantId) => {
    deleteParticipant(id, participantId);
  };
  const exportToExcel = () => {
    const headers = ["Metric ID", "Name", "Email", "Score", "Time Spent"];
    const data = participants.map(participant => [
      participant.metricId,
      participant.name,
      participant.email,
      participant.quizScore,
      participant.completionTimestamp
    ]);
    data.unshift(headers);
    const ws = XLSX.utils.aoa_to_sheet(data);
    ws["!cols"] = [{ wch: 15 }, { wch: 20 }, { wch: 30 }, { wch: 10 }, { wch: 15 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Participants");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
    saveAs(blob, "participants.xlsx");

  }; 

  function secondsToTimeString(seconds) { 
    const minutes = Math.floor(seconds / 60);
    const timeString = `${minutes} min`;
    return timeString;
  }
  return (
    <>
      <div className="lg:container lg:mx-auto lg:py-16 md:py-12 md:px-6 py-12 px-4">
        <h1 className="text-center dark:text-white lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 font-semibold">
          Quiz Details
        </h1>

        <div className="flex flex-wrap -mx-3 mb-5">
          <div className="w-full max-w-full px-3 mb-6 mx-auto">
            <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
              <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
                {/* card body  */}
                <div className="flex-auto block py-8 pt-6 px-9">
                  <div className="overflow-x-auto">
                    <table className="w-full my-0 align-middle text-dark border-neutral-200">
                      <thead className="align-bottom">
                        <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                          <th className="pb-3 text-start min-w-[175px] ">
                            Quiz Title
                          </th>
                          <th className="pb-3 text-start min-w-[100px]">
                            Total Question
                          </th>
                          <th className="pb-3 pr-0 text-center min-w-[175px]">
                            STATUS
                          </th>
                          <th className="pb-3  text-start min-w-[100px]">
                            Duration
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-dashed last:border-b-0">
                          <td className="py-3 pr-0 text-start">
                            <span className="font-semibold  text-light-inverse text-md/normal">
                              {quiz.title}
                            </span>
                          </td>

                          <td className="p-3 pr-5 text-c">
                            <span className="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">
                              {" "}
                              5{" "}
                            </span>
                          </td>
                          <td className=" text-center">
                            <span className="font-semibold  text-light-inverse text-md/normal">
                              Enable
                            </span>
                          </td>
                          <td className=" text-start cursor-pointer">
                            <span className="font-semibold  text-light-inverse text-md/normal">
                              {secondsToTimeString(quiz.timeLimit)}
                            </span>
                          </td>
                        </tr>
                        {/* Add more table rows here */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xl font-bold font-mono mb-1">Quiz Id</p>
        <div className="w-full flex justify-center ">
          <div className="rounded-md border-2 border-[#32012F] relative flex h-12 w-full min-w-[200px] max-w-[24rem]">
            <button
              className="!absolute right-1 top-1 z-10 select-none rounded bg-[#32012F] py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-[#32012F]/20 transition-all hover:shadow-lg hover:shadow-[#32012F]/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
              onClick={() => copyToClipboard(quiz._id)}
              data-ripple-light="true"
            >
              Copy
            </button>
            <input
              type="email"
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#32012F]   disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              value={quiz._id}
              required
            />
          </div>
        </div>

        <div className="lg:mt-5 bg-gray-100 dark:bg-gray-800 md:mt-10 mt-8 lg:py-7 lg:px-6 md:p-6 py-6 px-4 lg:w-8/12 w-full mx-auto">
          <div className="flex justify-between md:flex-row flex-col">
            <div className="md:mb-0 mb-8 md:text-left text-center">
              <h2 className="font-medium dark:text-white text-xl leading-5 text-gray-800 lg:mb-2 mb-4">
                Questions
              </h2>
              <p className="font-normal dark:text-gray-300 text-sm leading-5 text-gray-600 md:w-8/12 md:ml-0 w-11/12 mx-auto">
                If you don’t find your answer, Please contact us or Leave a
                Message, we’ll be more than happy to assist you.
              </p>
            </div>

            <div className="flex justify-center items-center">
              <div className="border-2 border-[#32012F] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 flex bg-white md:justify-center justify-between items-center px-4 py-3 w-full">
                <input
                  className="focus:outline-none bg-white"
                  type="text"
                  placeholder="Search"
                />
                <img
                  src="https://tuk-cdn.s3.amazonaws.com/can-uploader/faq-8-svg1.svg"
                  alt="search"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-8/12 w-full mx-auto">
          <hr className="w-full lg:mt-10 md:mt-12 md:mb-8 my-8" />
   
          {quiz.questions.map((question, index) => (
            <div className="w-full md:px-6" key={index}>
              <div className="flex justify-between items-center w-full">
                <div>
                  <p className="flex justify-center items-center dark:text-white font-medium text-base leading-6 md:leading-4 text-gray-800">
                    <span className="lg:mr-6 mr-4 dark:text-white lg:text-2xl md:text-xl text-lg leading-6 md:leading-5 lg:leading-4 font-semibold text-gray-800">
                      Q{index + 1}.
                    </span>
                    {question.text} ?
                  </p>
                </div>
                <button
                  aria-label="toggler"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                  onClick={toggleMenu}
                >
                  <img
                    className={`transform  ${
                      isOpen ? "hidden" : "block"
                    } dark:hidden`}
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/faq-8-svg2.svg"
                    alt="toggler"
                  />
                  <BiUpArrowAlt
                    className={`transform text-3xl text-gray-500 ${
                      isOpen ? "block" : "hidden"
                    } dark:block`}
                  />
                </button>
              </div>
              <div className={`mt-6 w-full p-5 bg-gray-200 ${isOpen ? "" : "hidden"}`}>
                <p className="text-base leading-6 text-gray-600 dark:text-gray-300 font-normal">
                  <span className="text-base font-bold">
                    Answer:{" "}
                  </span>
                  {question.options[question.answer-1]}
                </p>
              </div>
            </div>
          ))}
        
        </div>
      </div>

 
      <div className=" shadow-sm"></div>

      {!participants.length < 1 && (
        <div className="bg-[#F97300] overflow-x-auto p-2 mb-6">
          <div className="border-2 border-[#E2DFD0] w-32 rounded-lg"><button onClick={exportToExcel} className="rounded-md bg-transparent flex items-center w-12 h-12 gap-3 " ><img src="/images/pngwing.com.png"></img><p className="font-bold text-white">Export</p></button></div>
          <p className="text-4xl text-center text-white font-bold">
           Participants
          </p>
          <table className="min-w-[90%] shadow-md border mx-auto border-[#32012F] my-6">
            <thead>
              <tr className="bg-[#32012F] text-white">
                <th className="py-4 px-6 text-lg text-left border-b">ID</th>
                <th className="py-4 px-6 text-lg text-left border-b">Name</th>
                <th className="py-4 px-6 text-lg text-left border-b">Email</th>
                <th className="py-4 px-6 text-lg text-left border-b">Score</th>
                <th className="py-4 px-6 text-lg border-b  text-left">
                  Timespend
                </th>
                <th className="py-4 px-6 text-lg border-b text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((user) => (
                <tr
                  key={user.userUid}
                  className="bg-white hover:bg-gray-50 border-b transition duration-300"
                >
                  {/* <td className="py-4 px-4 flex justify-start">
                  <img
                  
                    src="https://source.unsplash.com/64x64/?microphone"
                    alt="table navigate ui"
                    className="h-16 w-16 object-cover bg-gray-300"
                  />
                </td> */}
                  <td className="py-4 px-6 border-b text-xl font-medium">
                    {user.metricId}
                  </td>
                  <td className="py-4 px-6 border-b text-xl font-medium">
                    {user.name}
                  </td>
                  <td className="py-4 px-6 border-b text-xl font-medium">
                    {user.email}
                  </td>
                  <td className="py-4 px-6 border-b text-lg md:text-left text-center  font-medium">
                    {user.quizScore}
                  </td>
                  <td className="py-4 px-6 border-b text-lg  text-center md:text-left font-medium">
                    {user.completionTimestamp}
                  </td>
                  <td className="py-4 px-6 border-b text-end">
                    <button
                      onClick={() => handleParticipantDelete(user.userUid)}
                      className="bg-red-500 hover:scale-110 scale-100 transition-all duration-100 text-white py-2 px-4 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default QuizDetails;
