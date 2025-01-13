import { AiOutlineClose } from "react-icons/ai";

import { CiMenuFries } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signOutSuccess } from "../feature/participant/participantSlice";
import { signOut } from "firebase/auth";
import { auth } from "../fierbase/firebase";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";




const Navbar = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);



  const handleSignOut = () => {
    console.log("object");
    signOut(auth);
    dispatch(signOutSuccess());
  };

  const user = useSelector((state) => state.User.currentUser);
 console.log(user)
  // State for sticky navbar behavior
  const [isSticky, setIsSticky] = useState(false);

  // Function to handle scroll event and update sticky state
  const handleScroll = () => {
    setIsSticky(window.scrollY > 0); // Update based on scroll position
  };

  // Use useEffect to add and remove scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // Add on mount

    return () => window.removeEventListener("scroll", handleScroll); // Remove on unmount
  }, []);

  return (
    <div className="bg-[#32012F] m-0 p-0">
      <div
      className={`flex   justify-between items-center py-5 px-5 relative ${
        isSticky ? "sticky top-0 z-50" : ""
      }`} 
    >
      <div className="w-44">
        <Link to="/">
          <img src='/images/logoQuiz.png' alt="Brand-logo" />
        </Link>
      </div>

      <ul
        className={`md:flex absolute z-50  md:static ${
          open ? "flex" : "hidden"
        } transition duration-700 delay-100 shadow-lg md:shadow-none 
         py-8 md:pb-0 pb-14 md:py-0 left-0 top-[100px] w-full  items-center  md:w-auto flex-col md:flex-row   gap-5 md:gap-10`}
      >
        <Link to={"/quiz-main"}>
          <li className="text-[#FAD961] hover:text-white font-serif">Start Quiz</li>
        </Link>
        <Link to={"create-quiz"}>
          <li className="text-[#FAD961] hover:text-white font-serif">Create Quiz</li>
        </Link>
        <Link to={"/dashboard"}>
          <li className="text-[#FAD961] hover:text-white  font-serif">Dashboard</li>
        </Link>
        <Link to={"/contact-us"}>
          <li className="text-[#FAD961] hover:text-white  font-serif">Contact Us</li>
        </Link>
          <li onClick={handleSignOut} className=" hover:text-yellow-500 md:hidden font-serif">Log Out</li>
 
      </ul>

      <div className="flex cursor-pointer z-50  gap-2 md:gap-5 w-auto items-center ">
        {user && (
          <div
            className={`h-full w-full flex-col flex justify-center text-[#FAD961] hover:text-white items-center -my-2`}
          >
            <img
              className="w-10 h-10 rounded-full"
              src={user?.photoURL}
              alt="userLogo"
            />
            <p className="text-sm font-serif">{user?.name}</p>
          </div>
        )}

        {user ? (
          <button
            onClick={handleSignOut}
            className="rounded-xl md:w-44 w-[150px]  px-3 py-3 bg-gradient-to-t from-amber-600 to-yellow-300 text-sm font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#FF914D]/50"
          >
            Log Out
          </button>
        ) : (
          <Link to={"/signin"}>
            <button className="rounded-xl md:w-44 w-[150px] px-3 py-3 bg-gradient-to-t from-amber-600 to-yellow-300 text-sm font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50">
              Login
            </button>
          </Link>
        )}
      </div>

      <motion.span
        initial={{rotate:0}}
        whileTap={{rotate:45}}
        onClick={() => setOpen(!open)}
        className="text-2xl  block md:hidden font-bold cursor-pointer"
      >
        {!open ? <CiMenuFries /> : <AiOutlineClose />}
      </motion.span>

      <span
        className={`absolute ${
          open ? "" : "border"
        } bottom-0 w-full md:border left-0 right-0`}
      ></span>
    </div>
    </div>
  );
};

export default Navbar;
