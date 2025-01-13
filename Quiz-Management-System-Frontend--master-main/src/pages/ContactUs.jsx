const ContactUs = () => {
  return (
    <div className="w-lg -mt-20  h-auto grid justify-center items-center dark:bg-gray-900">
      <div className="mt-32 flex flex-col-3 justify-center items-center min-w-md p-10 gap-6 mb-12">
        <div className="w-auto bg-[#8361df] border-2 border-[#524C42] flex flex-col rounded-md items-center justify-center overflow-hidden shadow-lg ">
          <img
            className="rounded-full h-80 w-80 mt-3"
            src="/images/tasin.jpg"
            alt="Sunset in the mountains"
          />
          <div className="text-center px-6 py-4">
            <div className="font-bold text-xl mb-2"><a href="https://toshifurrahman.github.io/Portfolio-01/?fbclid=IwAR2AiAe7sxbDsOvaQIgTMtA3RqX_lONmea2wdrhVAUZUykKsbbcp4FLBMMg" className="hover:underline ">Toshifur Rahman Tasin</a></div>
            <p className="text-gray-700 text-base">
            <p className="text-white">Q/A Manager</p>
             <p className="text-white">C213021</p>
            </p>
          </div>
        </div>
        <div className="w-auto border-2 bg-[#8361df] border-[#524C42] flex flex-col rounded-md items-center justify-center overflow-hidden shadow-lg ">
          <img
            className="rounded-full h-80 w-80 mt-3"
            src="/images/adnan.JPG"
            alt="Sunset in the mountains"
          />
          <div className="text-center px-6 py-4">
            <div className="font-bold text-xl mb-2"><a href="https://github.com/Adnan4141" className="hover:underline ">Mokaddes Hossain Adnan</a></div>
            <p className="text-gray-700 text-base">
            <p className="text-white">Developer</p>
            <p className="text-white">C213001</p>
            </p>
          </div>
        </div>
        <div className="w-auto border-2 bg-[#8361df] border-[#524C42] flex flex-col rounded-md items-center justify-center overflow-hidden shadow-lg ">
          <img
            className="rounded-full h-80 w-80 mt-3"
            src="/images/fahad.jpg"
            alt="Sunset in the mountains"
          />
          <div className="text-center px-6 py-4">
            <div className="font-bold text-xl mb-2"><a href="https://al-fahad4889.github.io/My-Portfolio/" className="hover:underline ">Al-Fahad</a></div>
            <p className="text-gray-700 text-base">
            <p className="text-white">UI/UX Designer</p>
             <p className="text-white">C213001</p>
            </p>
          </div>
        </div>
      </div>

      <div className="border-[#524C42] border-4 rounded-2xl max-w-7xl dark:bg-gray-950 dark:text-white mx-auto mb-6">
        <form className="w-full p-4 rounded shadow-md" action="" method="post">
          <h2 className="text-xl mb-4 tracking-wider font-lighter text-gray-900 dark:text-gray-200">
            Leave a Comment
          </h2>
          <p className="text-gray-600 mb-4">
            Your email address will not be published. Required fields are marked
            *
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="mb-4 col-span-1 md:col-span-3">
              <textarea
                id="comment"
                name="comment"
                className="w-full px-3 py-2 dark:bg-gray-900 rounded-sm border dark:border-none border-gray-300 focus:outline-none border-solid focus:border-dashed resize-none"
                placeholder="Type Comment...*"
                rows="5"
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 dark:bg-gray-900 rounded-sm border dark:border-none border-gray-300 focus:outline-none border-solid focus:border-dashed"
                placeholder="Name*"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 dark:bg-gray-900 rounded-sm border dark:border-none border-gray-300 focus:outline-none border-solid focus:border-dashed"
                placeholder="Email*"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="id"
                name="id"
                className="w-full px-3 py-2 dark:bg-gray-900 rounded-sm border dark:border-none border-gray-300 focus:outline-none border-solid focus:border-dashed"
                placeholder="Id"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="py-4 px-6 bg-blue-950 text-white rounded-sm hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800"
            >
              Send Message →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
