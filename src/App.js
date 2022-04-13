import Todo from "./Todo";
import React, { useEffect, useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import db from "./firebase";
import firebase from "firebase";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  const [input, setInput] = useState("");

  //When the app loads, we need to listen to the database and fetch new todos as they get added/remove
  useEffect(() => {
    //this code here...fires when the app.js loads
    //when a todo is added the componet will render
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        //reads the database and return an array
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
          }))
        );
      });
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (input === "") return; //if input field is empty return out of function
    //This will fire of when we click the button
    db.collection("todos").add({
      todo: input, //adds todo to firebase database
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput(""); //Clear up the input field
  };

  return (
    <div className="App">
      <h1>Todo App</h1>

      <form action="">
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
        </FormControl>
        <Button
          disabled={!input}
          type="submit"
          onClick={addTodo}
          variant="contained"
        >
          Add todo
        </Button>
      </form>
      
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
          // <li key={todo}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
