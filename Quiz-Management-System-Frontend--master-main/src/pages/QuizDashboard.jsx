import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuizById, fetchQuizData } from "../feature/quiz/quizSlice";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotAvailable from "../components/NotAvailable";

const QuizDashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.User.currentUser);
 console.log(user.userUid)
  useEffect(() => {
    dispatch(fetchQuizData(user.userUid));
  }, [dispatch, user.userUid]);


  const quizzes = useSelector((state) => state.quiz.quiz);
  const loading = useSelector((state) => state.quiz.loading);

  console.log(quizzes)
  // const handleList=()=>{
  //    console.log('object')
  //    navigate("/quizz/:id")
  // }
  // console.log(quizzes.length)

  function secondsToTimeString(seconds) { 
    const minutes = Math.floor(seconds / 60);
    const timeString = `${minutes} min`;
    return timeString;
  }
  

  const handleDeleteByID = async (id) => {
    const result = await deleteQuizById(id);
    if (result) {
    // [...quizzes]
      toast.success(result.message);
    }
  };

  return (
    <div className="h-[50rem] w-full flex flex-col  mt-10">
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="font-bold text-4xl">My Created Quizzes</p>
        <p className="text-[#524C42] text-xl">
          you can view or delete quiz any time
        </p>
      </div>

      {loading ? (
        <Loader />
      ) : quizzes.length>0 ?
       (
        <div className="rounded-3xl border-4 border-[#524C42] lg:px-4 overflow-x-auto px-5 md:px-0 w-[100%] md:w-[90%] mx-auto mt-4">
          <table className="bg-[#F97300] text-black w-full shadow-md  border mx-auto border-black my-6">
            <thead>
              <tr className="  text-sm md:text-lg">
                <th className="py-3 px-6 text-left border-black border">Quiz Title</th>
                <th className="py-3 px-6 text-left border-black border">Questions</th>
                <th className="py-3 px-6 text-left border-black border">TimeLimit</th>
                <th className="py-3 px-6 text-center border-black border">Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Render quiz data here */}
              {quizzes.map((quiz) => (
                <tr
                  key={quiz._id}
                  className="bg-[#E2DFD0] hover:bg-gray-50 transition duration-300"
                >
                  <td className="py-4 px-6 border-black border text-left">{quiz.title}</td>
                  <td className="py-4 px-6 border-black border text-left">
                    {quiz.questions?.length}
                  </td>
                  <td className="py-4 px-6 border-black border text-left">
                    {secondsToTimeString(quiz.timeLimit)}
                  </td>
                  <td className="py-4 px-6 border-black border-b text-center flex gap-2">
                    <Link to={`quiz-view/${quiz._id}`}>
                      {" "}
                      <button className="rounded-lg bg-[#6C0345] hover:bg-sky-800 px-3 py-1 text-lg text-white duration-300 active:scale-95">
                        View
                      </button>
                    </Link>
                    {/* <button className="rounded-lg bg-sky-500 hover:bg-sky-800 px-3 py-1 text-lg text-white duration-300 active:scale-95">
                      Update
                    </button> */}
                    <button
                      onClick={() => handleDeleteByID(quiz._id)}
                      className="rounded-lg bg-[#6C0345] hover:bg-sky-800 px-3 py-1 text-lg text-white duration-300 active:scale-95"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NotAvailable/>
      )}
      <ToastContainer />
    </div>
  );
};

export default QuizDashboard;
