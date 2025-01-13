
const app = require("./app");

const connectDB = require("./config/db");

require("dotenv").config();
const port = process.env.PORT || 3000;

app.get('/' , (req , res)=>{
  res.send('<h2>Hello from Home Page</h2>');
})

const dbURL = `mongodb+srv://Adnan:LPL1MheB0B4bsCvg@cluster0.mpobb6h.mongodb.net/Quiz-Management?retryWrites=true&w=majority&appName=Cluster0`;
connectDB(dbURL)
.then(() => {
  console.log(`Connected to MongoDB at ${dbURL}`);
  console.log(`Server is up and running on http://localhost:${port}`);
})
.catch((error) => {
  console.error("Failed to connect to MongoDB:", error);
  process.exit(1); 
});





 app.listen( port, ()=> {
  //  const dbURL = process.env.DB_URL|| "mongodb://localhost:27017/QuizManagement";

   console.log(`Server is up and running on http://localhost:${port}`)
  
});
