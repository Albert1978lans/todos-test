import React from 'react';
import './App.css';
import {Todolist} from "./todolist/todolist";
import {v1} from "uuid";

function App() {
  return (
    <div className="App">
      <Todolist/>
    </div>
  );
}

export default App;
