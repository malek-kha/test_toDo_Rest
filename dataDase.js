
const mongoose = require('mongoose');


//database connection
mongoose.connect("mongodb+srv://malek:M123456*@cluster0.jbpcf.mongodb.net/test_toDo?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true  })
let connection = mongoose.connection;

//check db connection
connection.once('open',()=>{
    console.log("connected to mongodb");
});
//check for db error
connection.on('error',(err)=>{
    console.log(err)
});

module.exports = connection;
