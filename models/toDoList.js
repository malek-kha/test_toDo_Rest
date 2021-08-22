let mongoose = require('mongoose');

let ToDoSchema = mongoose.Schema({
    name: {
      type: String,
      required: true
    }
});

let ToDoListSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  toDos: [ToDoSchema]
});


module.exports = mongoose.model('ToDoList', ToDoListSchema);