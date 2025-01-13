import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="grid  md:grid-cols-2  h-[800px] md:h-[400px] mx-10">
        <div className="h-full flex flex-col justify-center items-center gap-5">
          <p className="text-4xl">Learn new concepts for each question</p>
          <p className="text-center text-xl text-custom-dark-quiz">
          Prepare for exams and quizzes with our comprehensive study resources and tailored assistance.{" "}
          </p>
          <div className="flex flex-col md:flex-row gap-5 text-lg">
            <Link to={"/quiz-main"}>
              <button className="rounded-full bg-[#32012F] hover:bg-white hover:text-black px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50">
                Start Solving
              </button>
            </Link>
            <Link to={"/create-quiz"}>
              <button className="rounded-full bg-[#524C42] hover:bg-white hover:text-black px-5 py-3 text-base mb-3 font-medium text-white transition duration-200  active:bg-blue-700 hover:shadow-lg hover:shadow-[#524C42]/50">
                Create Quiz
              </button>
            </Link>
          </div>
        </div>

        <div className="h-full flex justify-center items-center">
          <img
            className="rounded-full h-80 w-80"
            src="https://th.bing.com/th/id/OIG1.D_nIofkvzfesI43oESDr?pid=ImgGn"
            alt="bannerlogo"
          />
        </div>
      </div>

      <div className="-mt-10 ml-6 sm:mt-24">
        <p className="text-base ml-12 text-gray-600 sm:text-xl lg:text-lg xl:text-xl">
          Unleash your inner quizmaster with our captivating collection of
          brain-teasers! From history to pop culture, challenge yourself and
          discover something new with every question. Ready to test your
          knowledge? Let's play!
        </p>
        <div className="mt-12 ml-8 mr-8">
          <div className="grid grid-row-3  gap-0 sm:gap-6 xl:gap-8">
            <div className="text-center sm:flex sm:items-center sm:justify-start">
              <div className="sm:flex-shrink-0">
                <div className="flow-root">
                  <div className="border w-fit transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 inline-flex items-center justify-center px-3 py-0.5 text-sm font-medium leading-5 text-orange-600 bg-orange-100 rounded-full">
                    Features
                  </div>
                  <a
                    href="#"
                    className="mt-2 p-3 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <img
                      className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                      src="/images/hp1.PNG"
                      alt=""
                    />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Customize Your Question
                      </h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        You can not only set questions,but also add pictures,hints,explantation
                        </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="text-center sm:flex sm:items-center sm:justify-end">
              <div className="sm:flex-shrink-0">
                <div className="flow-root">
                  <div className="border w-fit transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 inline-flex items-center justify-center px-3 py-0.5 text-sm font-medium leading-5 text-orange-600 bg-orange-100 rounded-full">
                    Learing
                  </div>
                  <a
                    href="#"
                    className="mt-2 p-3 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row-reverse md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <img
                      className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-r-lg"
                      src="/images/hp2.PNG"
                      alt=""
                    />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Self Testing
                      </h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Students can also test their knowledge by creating and taking custom tests for each other.
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="text-center sm:flex sm:items-center sm:justify-start">
              <div className="sm:flex-shrink-0">
                <div className="flow-root">
                  <div className="border w-fit transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 inline-flex items-center justify-center px-3 py-0.5 text-sm font-medium leading-5 text-orange-600 bg-orange-100 rounded-full">
                    Results
                  </div>
                  <a
                    href="#"
                    className="mt-2 p-3 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    <img
                      className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                      src="/images/hp3.PNG"
                      alt=""
                    />
                    <div className="flex flex-col justify-between p-4 leading-normal">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Correction
                      </h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        Correct your mistakes by checking the correct answer after your test
                         </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex justify-center space-x-3">
          
        </div>
      </div>
    </>
  );
};

export default HomePage;
