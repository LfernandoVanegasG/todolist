import 'semantic-ui-css/semantic.min.css';
import { useState, useEffect } from 'react';
import './App.css';
import Container from './Components/Container';
import Header from './Components/Header';
import InputTask from './Components/InputTask';
import TaskContent from './Components/TaskContent';




function App() {

//pasar las tareas
let initialTask = JSON.parse(localStorage.getItem("tasks"));
if (! initialTask){
   initialTask= [];


}
const [tasks, setTasks] = useState (initialTask);

  useEffect (() =>{
    if(initialTask){
        localStorage.setItem("tasks", JSON.stringify(tasks));
  } else{
        localStorage.setItem("tasks", JSON.stringify([]));
  }   
  }, [initialTask, tasks]);
  
  const createTask =(newTask) =>{
    // ayquie
    setTasks([...tasks, newTask]);
  };

const deleteTask = (id) => {
    const currentTask = tasks.filter ((task) => task.idTask !== id);
    setTasks(currentTask);

  }
// Este nuevo useEffect se asegura de que las tareas se guarden en localStorage cuando cambian
useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);


  return (
    <Container>
      <Header />
      <InputTask createTask={createTask}/>
      <TaskContent tasks={tasks} deleteTask={deleteTask}/>
    </Container>


  );
}

export default App;
