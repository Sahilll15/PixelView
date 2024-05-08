const express = require('express');
const cors=require('cors')
const userRoutes=require('./routes/user.routes')
const imageRoutes=require('./routes/image.routes')
require('dotenv').config()


const mongoose=require('mongoose')
console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connected to the database')
})
.catch((error)=>{
  console.log(error)
    console.log('Error connecting to the database')
})



const app = express();
const port =  process.env.PORT || 4000

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(express.urlencoded({ extended: true }));
app.use('/uploads',express.static('uploads'))



app.use(express.json());
app.use(cors())
app.use('/api/users',userRoutes)
app.use('/api/images',imageRoutes)




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});