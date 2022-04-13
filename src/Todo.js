import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
} from "@mui/material";
import db from "./firebase";
import React, { useState } from "react";
import "./Todo.css";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const Todo = ({ todo }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');

  const updateTodo = () => {
    //update the todo with the new input text
    db.collection('todos').doc(todo.id).set({
      todo:input,
    },{merge: true})
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <Box sx={style}>
          <div>
            <h1>I am a modal</h1>
            <input placeholder = {todo.todo} value={input} onChange= {e => setInput(e.target.value)} />
            <Button onClick={updateTodo}>Update Todo</Button>
          </div>
        </Box>
      </Modal>

      <List className="todo__list">
        <ListItem>
          <ListItemAvatar>
            <Avatar></Avatar>
          </ListItemAvatar>
          <ListItemText primary={todo.todo} secondary="Dummy Deadline :alarm" />
        </ListItem>
        <button onClick={(e) => setOpen(true)}>Edit</button>
        <DeleteForeverIcon
          onClick={(e) => db.collection("todos").doc(todo.id).delete()}
        />
      </List>
    </>
  );
};

export default Todo;
