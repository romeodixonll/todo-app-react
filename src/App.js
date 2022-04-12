import "./App.css";
import React, { useState } from "react";
import { Button, FormControl, Input, InputLabel } from "@mui/material";

function App() {
  const [todos, setTodos] = useState([
    "Take dog for a walk",
    "take the rubbish out",
    "doing a react app",
  ]);

  const [input, setInput] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (input === "") return; //if input field is empty return out of function
    //This will fire of when we click the button
    setTodos([...todos, input]);
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
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
