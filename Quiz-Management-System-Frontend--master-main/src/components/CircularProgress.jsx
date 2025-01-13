import  { useState, useEffect } from 'react';

const CircularProgress = ({percentageValue }) => {

  // State for the current percentage
  const [currentPercentage, setCurrentPercentage] = useState(0);

  // Optimized useEffect for performance and color logic
  useEffect(() => {
    let intervalId;

    if (percentageValue > currentPercentage) {
      intervalId = setInterval(() => {
        setCurrentPercentage(prevPercentage => Math.min(prevPercentage + 1, percentageValue));
      }, 30); // Adjust interval duration as needed
    }

    // Cleanup function to clear the interval on unmount or value change
    return () => clearInterval(intervalId);
  }, [percentageValue, currentPercentage]);

  const getColor = () => {
    return percentageValue <= 49 ? 'text-red-500' : 'text-blue-600';
  };

  // Render the circular progress component
  return (
    <div className="relative w-36 h-36">
      <svg className="w-full h-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        {/* Background Circle */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-gray-200 dark:text-neutral-700"
          strokeWidth="2"
        />
        {/* Progress Circle inside a group with rotation */}
        <g className="origin-center -rotate-90 transform">
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            className={`stroke-current transition ${getColor()}`} // Apply color dynamically
            strokeWidth="2"
            strokeDasharray="100"
            strokeDashoffset={100 - currentPercentage} // Use currentPercentage for accurate animation
          />
        </g>
      </svg>
      {/* Percentage Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <span className="text-center text-2xl font-bold text-gray-800 dark:text-white">
          {currentPercentage}%
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;
