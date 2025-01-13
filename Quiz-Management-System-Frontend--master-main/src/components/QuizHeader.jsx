
import { motion } from "framer-motion";
import { useEffect, useState } from "react";



const QuizHeader = ({ timer,handleTimeout,passTime,questionsData}) => {

  
 
  const [countdownTime, setCountdownTime] = useState(timer);
  // Effect to start the countdown timer
  useEffect(() => {
    const countdownInterval = setInterval(() => {
      // Decrease countdown time
      if (countdownTime > 0) {
        setCountdownTime((prevTime) => prevTime - 1);
        passTime(countdownTime)
    }
    else {
      clearInterval(countdownInterval);
      // Redirect to another page
      handleTimeout();
      alert("Time's up!");
    }
      
    }, 1000);

    // Cleanup function to clear interval on component unmount
    return () => {
      clearInterval(countdownInterval)
    };
  }, [countdownTime]);

  // Function to format the time
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };








  return (
    <motion.section
      className="shadow-sm my-0 py-2 sticky top-0 bg-[#524C42] text-white z-10 max-w-6xl mx-auto"
      id="alertContainer"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="max-w-5xl mx-auto px-5 flex md:flex-row flex-col justify-between items-center">
          <motion.div
            className="font-normal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="text-white bg-red-700 font-bold rounded-lg p-1">Attention!</span> You have {formatTime(timer)} minutes to answer {questionsData.length} questions.
            <br />
            Please keep an eye on the timer and make sure to answer all questions before time runs out.
          </motion.div>
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.p
              className="mr-2 text-xl text-gray-700"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <i className="fa-solid fa-clock-rotate-left"></i>
            </motion.p>
            <div className="text-left bg-green-600 rounded-lg p-2">
              <motion.h1
                className=" text-white text-xl"
                id="count"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >

            {formatTime(countdownTime)}

                <motion.sub
                  className="text-xs ml-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  sec
                </motion.sub>
              </motion.h1>
              <motion.p
                className="text-xs -mt-1 text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                Time Consumed
              </motion.p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default QuizHeader;
