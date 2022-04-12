import React from "react";

function ToDoItem(props) {
  return (
    <div className="each-item">
      <p>{props.text}</p>
      <div className="todo-btn">
        <i class="far fa-edit"
          onClick={() => {
          props.onEdit(props.id);
        }}
        ></i>
        <i class="far fa-trash-alt"
          onClick={() => {
          props.onDelete(props.id);
        }}
        ></i>
      </div>
    </div>
  );
}

export default ToDoItem;
