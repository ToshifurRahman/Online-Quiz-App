import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./shared/Navbar";
import QuizDashboard from "./pages/QuizDashboard";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import CreateQuiz from "./pages/CreateQuiz";
import QuizMain from "./pages/QuizMain";
import QuizPage from "./pages/QuizPage";
import QuizDetails from "./pages/QuizDetails";
import ResultPage from "./pages/ResultPage";
import ContactUs from "./pages/ContactUs";
import Timeline from "./pages/Timeline";
import Footer from "./shared/Footer";

const App = () => {
  


  return (
   
     <BrowserRouter>
     <div className="bg-[#E2DFD0] overflow-y-hidden ">
      <Navbar />
     <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/timeline" element={<Timeline />} />

        <Route
          path="/quiz-page/:id"
          element={<QuizPage />}
          loader={({ params }) => {
            return fetch(`http://localhost:3000/quizzes/${params.id}`)
              .then((response) => response.json())
              .then((data) => {
                // Do something with the fetched data
                console.log(data);
                return data;
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
              });
          }}
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <QuizDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/result/userUid/:id/quizId/:quizId"
          element={
            <PrivateRoute>
              <ResultPage />
            </PrivateRoute>
          }
        />
      
        <Route
          path="dashboard/quiz-view/:id/"
          element={
            <PrivateRoute>
              <QuizDetails/>
            </PrivateRoute>
          }
        />

        <Route
          path="/create-quiz"
          element={
            <PrivateRoute>
              <CreateQuiz />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz-main"
          element={
            <PrivateRoute>
              <QuizMain />
            </PrivateRoute>
          }
        />

    
        <Route path="*" element={<NotFound />} />
      </Routes>
     
     <Footer>
      
     </Footer>
     </div>

    </BrowserRouter>

  

  );
};

export default App;
