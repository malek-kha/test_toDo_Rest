const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const toDoListRoutes = require('./routes/toDoList');



const app = express();
//database connection 
const database_connection = require('./dataDase');

//middlwares
app.use(bodyParser.json()); 

//routes files

app.use('/todoList',toDoListRoutes);

app.use(cors);
//listening to the server 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
