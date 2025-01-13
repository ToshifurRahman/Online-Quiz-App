export const ProgressBar = ({questionsData,userResponses}) => {

  

    const ProgressNumber = Math.floor((userResponses.length/questionsData.length)*100); // adjust the number to increase the progress number
    return (
    <div className="flex flex-col w-[300px] mx-auto gap-2">
        <div className={`flex h-3 w-full  items-center justify-center rounded-full bg-sky-300`}>
            <div style={{ width: `${ProgressNumber}%` }} className={`transition-width mr-auto h-3 w-0 rounded-full  bg-sky-600 duration-500`} ></div>
        </div>
        <span className="text-lg font-medium text-center text-sky-500"> {ProgressNumber} %</span>
    </div>
    );
};