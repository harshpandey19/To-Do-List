import React, { useState, useEffect } from "react";
import axios from "axios";
import ToDoItem from "../components/ToDoItem";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ToDo() {
  const [inputText, setInputText] = React.useState("");
  const [items, setItems] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [itemToUpdate, setItemToUpdate] = React.useState(null);

  useEffect(() => {
      const check = async() => {
        try{
          const response = await axios.get("/users/auth");
          if(response.data === "INVALID") {
              window.location = "/";
          }
          else {
            setItems(response.data);
          }
        }
        catch(err){
          console.log(err);
        }
      }
      check();
  }, [])

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  const addItem = async(inputText) => {
    try{
      const response = await axios.post("/todo/add", {task: inputText});
      if(response.data === "INVALID" || response.data === "You Are Not Authenticated") {
          window.location = "/";
      }
      else if(response.data === "Todo item can't be blank") return;
      else {
        setItems(response.data);
      }
    }
    catch(err){
      console.log(err);
    }
  }

  const editItem = async(id) => {
    let newEditItem = items.find((todoItem) => {
      return id===todoItem._id;
    })
    console.log(newEditItem);
    setToggle(false);
    setInputText(newEditItem.data);
    setItemToUpdate(newEditItem);
  }

  const updateItem = async(id) => {
    try{
      const response = await axios.post("/todo/update", {id : id, task: inputText});
      if(response.data === "INVALID" || response.data === "You Are Not Authenticated") {
          window.location = "/";
      }
      else if(response.data === "Todo item can't be blank"){
        setToggle(true);
        setItemToUpdate(null);
      }
      else {
        setItems(response.data);
        setToggle(true);
        setItemToUpdate(null);
      }
    }
    catch(err){
      console.log(err);
    }
  }

  const deleteItem = async(id) => {
    try{
      const response = await axios.post("/todo/delete", {id: id});
      if(response.data === "INVALID" || response.data === "You Are Not Authenticated") {
          window.location = "/";
      }
      else {
        setItems(response.data);
      }
    }
    catch(err){
      console.log(err);
    }
  }

  return (
    <div>
      <Navbar/>
      <div className="container">
        <div className="heading">
          <h1>To-Do List</h1>
        </div>
        <div className="form">
          <input onChange={handleChange} type="text" value={inputText} />
          {toggle?
            <i class="fas fa-plus" 
              onClick={() => {
              addItem(inputText);
              setInputText("");
            }}>  
            </i>
            :
            <i class="far fa-edit" 
              onClick={() => {
              updateItem(itemToUpdate._id);
              setInputText("");
            }}>  
            </i>}
        </div>

        <div className="all-items">
            {items.map((todoItem, index) => (
              <ToDoItem
                key={index}
                id={todoItem._id}
                text={todoItem.data}
                onEdit={editItem}
                onDelete={deleteItem}
              />
            ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default ToDo;
