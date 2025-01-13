import axios from "axios";
import { BaseUrl } from "../../app/api";



export const sendOneQuestionToServer = async () => {
   
    try {
        const demo = 
          {
            "text": "What is the capital of oganda?",
            "combinedOptions": ["Paris", "London", "Berlin"],
            "answerIndex": 0,
            "explanation": "Paris is the capital of France.",
            "points": 1,
            "media": null,
            "hint": "",
            "userUid": "user123" // Assuming you have user identification
          }
      
        console.log(demo)
      const response = await axios.post(`${BaseUrl}/questions`, demo);
      console.log(response)
      console.log('Question created:', response.data);

      // Call dataPass or handle the response as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
export const sendManyQuestionToServer = async (objArray) => {
   
    try {

        console.log(objArray)
      const response = await axios.post(`${BaseUrl}/questions/all`, objArray);
      console.log('Question created:', response.data);
      return response.data
      // Call dataPass or handle the response as needed
    } catch (error) {
      console.error('Error:', error);
    }
  };
  