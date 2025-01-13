import axios from "axios";
import { BaseUrl } from "../../app/api";




// create a participants
export async function createParticipant(participantData) {
   console.log(participantData)
  try {
    const response = await axios.post(`${BaseUrl}/participants`, participantData);
    
    if (response.status === 201) {
      const savedParticipant = response.data;
      console.log('New participant created:', savedParticipant);
      // Optionally return the saved participant data
      return savedParticipant;
    } else {
      console.error('Error creating participant:', response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('Error creating participant:', error.message);
    throw error;
  }
}



export const fetchUserDataById = async (userId) => {
  console.log("userId :"+userId)
  try {
    const response = await axios.get(`${BaseUrl}/participants/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error('Failed to fetch user data');
  }
};






  // get participant quiz  history
  // /:userUid/quizId/:quizId








  export const submitQuizForParticipant = async (obj) => {
    console.log(obj)
//   try {
//     const response = await axios.post('http://localhost:3000/participants/:id/attempts', obj, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
    // });

//     if (!response.status === 200) {
//       throw new Error('Failed to submit quizzes');
//     }

//     const responseData = response.data;
//     console.log(responseData);

//     // Handle successful form submission
//     console.log('Quiz submitted successfully');
//   } catch (error) {
//     console.error('Error:', error);
//     console.log(error.message);
//   }

};
