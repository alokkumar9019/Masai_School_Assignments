import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { toggleTask, removeTask } from "../taskSlice";

function TaskList() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  return (
    <div>
      <ul>
       {tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                marginRight: 10,
              }}
            >
              {task.text}
            </span>
            <button onClick={() => dispatch(toggleTask(task.id))}>
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button
              onClick={() => dispatch(removeTask(task.id))}
              style={{ marginLeft: 5 }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;