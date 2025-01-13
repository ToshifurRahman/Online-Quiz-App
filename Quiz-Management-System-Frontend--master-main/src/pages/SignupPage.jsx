/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithRedirect,
  getAuth,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../feature/participant/participantSlice";
import { Link, useNavigate } from "react-router-dom";
import { createParticipant } from "../feature/participant/participantFetch";





const SignupPage = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const user = useSelector((state) => {
    return state.User.currentUser;
  });
  const dispatch = useDispatch();
  console.log(user);
  const [firebaseErr, setFirebaseErr] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

 
  console.log(auth.currentUser);
  // console.log(auth.currentUser.uid)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
    if (formData.password != formData.confirmPassword) {
      console.log("not submit");
    } else {
      console.log("submit");
      formData,
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
          .then((userCredential) => {
            updateProfile(auth.currentUser, {
              displayName: formData.name,
              photoURL:
                "https://imgv3.fotor.com/images/blog-richtext-image/10-profile-picture-ideas-to-make-you-stand-out.jpg",
            });
          
            // Sign up
            const demoUrl ="https://avatar.iran.liara.run/public/boy"
            const user = userCredential.user;
            console.log(user)
            const userObj = {
                ...formData,
                userUid:user.uid,
                photoURL:user.photoURL?user.photoURL:demoUrl,
            }
            dispatch(signInSuccess(userObj));
            createParticipant(userObj)
            console.log(formData)
            console.log(user);
            console.log(userObj);
            navigate("/");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode && errorCode.includes("auth/email-already-in-use")) {
              setFirebaseErr("Email Already in use ,Try another one");
            }
            console.log(error);
            console.log(errorMessage);
            console.log(errorCode);
            // ..
          });
    }
  };

const signWithGoogleBtn = ()=>{
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  signInWithRedirect(auth, provider)
  .then((auth)=>
  console.log(auth.currentUser))
  console.log(auth)
 if(auth.currentUser){
  createParticipant({
    name:auth.currentUser.name,
    email:auth.currentUser.email,
    password:auth.currentUser.password?auth.currentUser.password:"",
    userUid:auth.currentUser.uid,
    photoURL:auth.currentUser.photoURL?auth.currentUser.photoURL:"",
  })
  dispatch(signInSuccess(auth.currentUser))
 }
 else alert("NO")


  
}


  return (
    <div className="max-w-7xl mx-auto my-10 flex justify-center items-center flex-col">
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl border bg-white font-sans mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-600">
          Register
        </h1>
        <form action="" onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 text-sm">
            <label htmlFor="name" className="block">
              Name
            </label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              id="name"
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
            />
          </div>
          <div className="space-y-2 text-sm">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              id="email"
              placeholder="Your email"
              className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
            />
          </div>
          <div className="space-y-2 text-sm">
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              type="password"
              onChange={handleChange}
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
            />
          </div>
          <div className="space-y-2 text-sm">
            <label htmlFor="confirmPassword" className="block">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              id="confirmPassword"
              placeholder="Confirm Password"
              className="w-full px-4 py-3 rounded-md border border-indigo-300 focus:outline-none focus:ring"
            />
          </div>
          { firebaseErr &&
          <p className="text-red-400 font-semibold ">! {firebaseErr}</p>

         }
          <button className="text-lg rounded-xl relative p-[10px] block w-full bg-indigo-600 text-white border-y-4 duration-500 overflow-hidden focus:border-indigo-500 z-50 group">
            Register
            <span className="absolute opacity-0 group-hover:opacity-100 duration-100 group-hover:duration-1000 ease-out flex justify-center inset-0 items-center z-10 text-white">
              Let's go
            </span>
            <span className="bg-indigo-800 absolute inset-0 -translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
            <span className="bg-indigo-800 absolute inset-0 translate-y-full group-hover:translate-y-0 group-hover:duration-1000"></span>
            <span className="bg-indigo-800 absolute inset-0 translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
            <span className="bg-indigo-800 absolute inset-0 -translate-x-full group-hover:translate-x-0 group-hover:delay-300 delay-100 duration-1000"></span>
          </button>
        </form>
       
      <div>
      <div className="flex items-center pt-4 space-x-2">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="text-sm text-gray-600">Register with social accounts</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button 
          onClick={signWithGoogleBtn}
            aria-label="Register with Google"
            className="p-3 rounded-full hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
          </button>
          <button
            aria-label="Register with Twitter"
            className="p-3 rounded-full hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-6 h-6 fill-current"
            >
              <path d="M21.95 5.005l-3.306-.004c-3.206 0-5.277 2.124-5.277 5.415v2.495H10.05v4.515h3.317l-.004 9.575h4.641l.004-9.575h3.806l-.003-4.514h-3.803v-2.117c0-1.018.241-1.533 1.566-1.533l2.366-.001.01-4.256z"></path>
            </svg>
          </button>
          <button
            aria-label="Register with GitHub"
            className="p-3 rounded-full hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
            </svg>
          </button>
        </div>
        <p className="text-sm text-center gap-2 flex justify-center sm:px-6 ">
          Already have an account?
          <Link className="underline hover:text-indigo-600" to={"/signin"}>
            Log in
            </Link>
        </p>
      </div>

      </div>
    </div>
  );
 
  
  // return (
  //   <div className="max-w-7xl mx-auto h-[40rem] flex justify-center items-center flex-col">
  //      <div>
  //       <p className="text text-3xl my-2 text-blue-700 font-serif">
  //       Sign Up
  //       </p>
  //      </div>
  //   <form action="" onSubmit={handleSubmit}
  //   className="border-[2px] p-10  w-1/2  rounded border-gray-700 flex flex-col gap-3">
  //       <div className="text-xl flex flex-col gap-1">
  //           <label className="text-gray-700 text-xl font-semibold" htmlFor="name">Name</label>
  //           <input  type="name" name="name" placeholder="Enter your name"
  //           onChange={handleChange}
  //           className="border-[2px] pl-2 py-2"
  //           />
  //       </div>
  //       <div className="text-xl flex flex-col gap-1">
  //           <label className="text-gray-700 text-xl font-semibold" htmlFor="email">Email</label>
  //           <input  type="email" name="email" placeholder="Enter your email"
  //           onChange={handleChange}
  //           className="border-[2px] pl-2 py-2"
  //           />
  //           {
  //             firebaseErr &&
  //             <p className="text-lg font-semibold text-red-700">!{firebaseErr}</p>
  //           }
  //       </div>

  //       <div className="text-xl flex flex-col gap-1">
  //           <label className="text-gray-700 text-xl font-semibold" htmlFor="password">Password</label>
  //           <input  type="password" name="password" placeholder="Enter your password"
  //           onChange={handleChange}
  //           className="border-[2px] pl-2 py-3"
  //           />
  //       </div>
  //       <div className="text-xl flex flex-col gap-1">
  //           <label className="text-gray-700 text-xl font-semibold" htmlFor="cpassword">Confirm Password</label>
  //           <input  type="password" name="confirmPassword" placeholder="Confirm your password"
  //           onChange={handleChange}
  //           className="border-[2px] pl-2 py-3"
  //           />
  //       </div>

  //       <div className="w-full my-5">
  //           <button className="w-full rounded-full px-6 py-2 border-[2px] text-xl bg-[#0061FF] border-blue-600 text-white
  //           hover:bg-blue-700 active:bg-blue-950">Sign Up</button>
  //       </div>

  //     <Link to={"/signin"}><p className="text-center hover:opacity-40 text-red-400 font-semibold">Already have an account? <span className="text-red-400 font-semibold">sign in</span></p></Link>
  //   </form>

  //   </div>
  // )
};

export default SignupPage;
