import { BsFillTrashFill } from "react-icons/bs"; 
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateQuestion = ({ dataPass, index, quizData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [newOption, setNewOption] = useState([""]);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const quizLength = Number(quizData.questionLength);





  const handleAddOption = (e) => {
    e.preventDefault();
    setOptions([...options, newOption]);
    setNewOption("");
  };
 
  const removeOption = (index) => {
    const updatedOptions = [...options];
    updatedOptions.splice(index, 1);
    setOptions(updatedOptions);
  };

  const handleOptionChange = (e) => {
    setNewOption(e.target.value);
  };

  const userInfo = useSelector((state) => state.User.currentUser);

  const [questionFormData, setQuestionFormData] = useState({
    text: "",
    answer: "",
    explanation: "",
    media: "",
    hint: "",
    points: "",
    options: [],
    userUid: userInfo.uid,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionFormData({ ...questionFormData, [name]: value });
  };

  const hanldleSubmit = async (e) => {
    e.preventDefault();
    setCurrentQuestionIndex((prev) => prev + 1);
    const obj = {
      ...questionFormData,
      options: options.filter((option) => option.trim() !== ""),
    };
    console.log(currentQuestionIndex);
    dataPass(obj, currentQuestionIndex);
    setSubmitted(false);
    console.log("Form submitted successfully");
    setNewOption("");
    setOptions([]);
    setQuestionFormData({
      text: "",
      answer: 0,
      explanation: "",
      media: "",
      hint: "",
      points: 0,
      options: [],
    });
    if (index == quizLength - 1) {
       navigate("/")
    }
  };



  return (
    <div className="h-auto w-full flex flex-col  items-center mt-10">
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-4xl font-serif">
          Create the Question {currentQuestionIndex + 1}
        </p>
        <p className="text-gray-400 text-xl"></p>
      </div>
      <form action="" onSubmit={hanldleSubmit} className="w-full">
        <div className="my-3 w-full flex flex-col items-center justify-center">
          <div className="w-[60%]  space-y-4">
            <div className="mb-3">
              <label
                htmlFor="title"
                className="text-base text-navy-700 dark:text-white font-bold"
              >
                Question
              </label>
              <input
                type="text"
                name="text"
                value={questionFormData.text}
                onChange={handleInputChange}
                placeholder="Enter question"
                required
                className="mt-2 flex h-12 font-mono  w-full items-center justify-center rounded-xl border p-3 text-lg placeholder:text-sm outline-none border-black text-black placeholder:text-gray-400 bg-white"
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="questionLength"
                className="text-base text-navy-700 dark:text-white font-bold"
              >
                Options
              </label>
              <input
                type="text"
                name="options"
                value={newOption}
                onChange={handleOptionChange}
                placeholder="Add the Options"
                className="mt-2 flex h-12 w-full font-serif placeholder:font-sans  placeholder:text-sm items-center justify-center rounded-xl border p-3 text-lg outline-none border-black text-black placeholder:text-gray-400 bg-white dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
              />
              <div>
             

                <button
                  className="bg-[#32012F] my-3 middle none center mr-4 rounded-lg  py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  data-ripple-light="true"
                  onClick={(e) => handleAddOption(e)}
                >
                  Add Option
                </button>
              </div>
            </div>

            {options && (
              <div className="grid md:grid-cols-2 grid-cols-1 gap-5 w-full">
                {options.map((option, index) => (
                  <p
                    key={index}
                    className="text-md relative py-2 px-1 font-semibold pl-2 border-black text-black placeholder:text-gray-400 bg-white rounded-md"
                  >
                    {index + 1}. {option}
                    <span onClick={()=>removeOption(index)}
                    className="text-red-700 bg-red-600t absolute right-2 top-3 cursor-pointer"><BsFillTrashFill /></span>
                  </p>
                ))}

               
              </div>
          ) }

       

            <div className="mb-2">
              <label
                htmlFor="answer"
                className="text-base text-navy-700 dark:text-white font-bold"
              >
                Answer
              </label>
              <input
                type="number"
                name="answer"
                value={questionFormData.answer}
                onChange={handleInputChange}
                min={1}
                max={options.length}
                placeholder="Enter Answer number this question"
                className="mt-2 flex h-12 w-full items-center justify-center rounded-xl border p-3 text-lg placeholder:text-sm outline-none border-black text-black placeholder:text-gray-400 bg-white dark:!bg-purple-800 dark:!text-red-400 dark:placeholder:!text-red-400"
              />
            </div>

            <div className="mb-3">
              <label
                htmlFor="explanation"
                className="text-base text-navy-700 dark:text-white font-bold"
              >
                Explanation
              </label>
              <input
                type="text"
                name="explanation"
                value={questionFormData.explanation}
                onChange={handleInputChange}
                placeholder="Explanation this answer if necessary"
                className="mt-2 flex h-12 font-mono  w-full items-center justify-center rounded-xl border p-3 text-lg placeholder:text-sm outline-none border-black text-black placeholder:text-gray-400 bg-white"
              />
            </div>

            <div className="mb-1">
              <label
                htmlFor="points"
                className="text-base text-navy-700 dark:text-white font-bold"
              >
                Points
              </label>
              <input
                type="number"
                name="points"
                value={questionFormData.points}
                onChange={handleInputChange}
                placeholder="Give point for this question"
                className="mt-2 flex h-12 font-mono  w-full items-center justify-center rounded-xl border p-3 text-lg placeholder:text-sm outline-none border-black text-black placeholder:text-gray-400 bg-white"
              />
            </div>

            <div className="mb-1">
              <label
                htmlFor="hint"
                className="text-base text-navy-700 dark:text-white font-bold"
              >
                Hints
              </label>
              <input
                type="text"
                name="hint"
                value={questionFormData.hint}
                onChange={handleInputChange}
                placeholder="Hint for this question"
                className="mt-2 flex h-12 font-mono  w-full items-center justify-center rounded-xl border p-3 text-lg placeholder:text-sm outline-none border-black text-black placeholder:text-gray-400 bg-white"
              />
            </div>

            <div className="mb-1 space-y-3">
            <p className="font-mono text-sm mx-2">
                Upload the question picture if necessary (Optional)
              </p>
              <label className="block ">
                <span className="sr-only">Choose profile photo</span>
                <input
                  type="file"
                value={questionFormData.media}
                onChange={handleInputChange}
                name="media"
                  className="mediaInput text-black max-w-xl border-[#524C42] border-4 rounded-lg bg-[#E2DFD0]"
                />
              </label>
            </div>
            <div className="">
        {currentQuestionIndex < quizLength && (
        
        <button  className="bg-[#32012F] mb-5 rounded-lg shadow text-center text-white text-base font-semibold w-full py-3 mt-9">{index < quizLength - 1 ? "Next" : "Submit"}</button>
      
    )}
        </div>
         
          </div>


           
        </div>
        {/* { !submitted && */}

      
      </form>

      {/* {currentQuestionIndex === quizLength && (
        <div className="w-full flex justify-center py-10 px-10">
          <button className="px-6  py-1 font-semibold text-xl border-[2px] border-yellow-500 bg-custom-Yellow-Quiz text-white hover:bg-transparent hover:border-custom-Yellow-Quiz hover:text-custom-Yellow-Quiz active:bg-yellow-200">
            Next
          </button>
        </div>
      )} */}
    </div>
  );
};

export default CreateQuestion;
