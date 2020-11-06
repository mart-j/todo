import React, { useState } from 'react';





import './App.css';

type Task = {
  name: string,
  finished: boolean,
  edit: boolean,
  editValue: string
}

const TodoApp = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [inputTask, setInputTask] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [isDone, seIsDone] = useState(false)




  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTask(e.target.value)
  }

  const buttonClickHandler = () => {
    if (inputTask === '') {
      return
    } else {
      setTasks([
        ...tasks,
        {
          name: inputTask,
          finished: false,
          edit: false,
          editValue: ''
        }
      ])
    }
    setInputTask('')
  }

  const finishedChangeHandler = (index: number) => {
    const newTasks = [...tasks]
    newTasks[index].finished = !newTasks[index].finished
    setTasks(newTasks)
  }

  const deleteButton = (index: number) => {
    const newTasks = [...tasks]
    newTasks.splice(index, 1)
    setTasks(newTasks)
  }

  const editButton = (index: number) => {
    const newTasks = [...tasks]
    newTasks[index].edit = !newTasks[index].edit
    newTasks[index].editValue = newTasks[index].name
    setTasks(newTasks)
  }

  const saveButton = (index: number) => {
    const newTasks = [...tasks]
    newTasks[index].name = newTasks[index].editValue
    newTasks[index].edit = false
    setTasks(newTasks)
  }

  const cancelButton = (index: number) => {
    const newTasks = [...tasks]

    newTasks[index].edit = false
    setTasks(newTasks)
  }

  const copyButton = (index: number) => {
    const taskCopy = { ...tasks[index] }


    setTasks([...tasks, taskCopy])
  }

  const editInputHandler = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newTasks = [...tasks]
    newTasks[index].editValue = e.target.value
    setTasks(newTasks)
  }


  const showAllTasks = () => {
    return tasks.map(({ name, finished, edit, editValue }, index) => {
      return (
        <div key={index} className="todo-app__task">

          {!edit ? (<div>
            <input

              checked={finished}
              onChange={() => finishedChangeHandler(index)}
              className="todo-app__checkbox"
              type="checkbox"
              id={`${index}`} />
            <label
              className={`todo-app__text ${finished && 'todo-app__text--finished'}`}
              htmlFor={`${index}`}>
              {name}
            </label>
          </div>)
            : (<input
              value={editValue}
              type="text"
              onChange={(e) => editInputHandler(e, index)}

            />)
          }

          {!edit ?
            <button onClick={() => editButton(index)} >Edit</button>
            : <button onClick={(e) => saveButton(index)} >Save</button>}
          {!edit ?
            <button onClick={() => deleteButton(index)} >Delete</button>
            : <button onClick={() => cancelButton(index)} >Cancel</button>}
          <button onClick={() => copyButton(index)}>Copy</button>



        </div>
      )
    })
  }



  const showDoneTasks = () => {
    return tasks.map((task, i) => {
      if  (task.finished) {
        return showAllTasks()[i]
      }
      
    })
    
  }




  const showUndoneTasks = () => {
    return tasks.map((task, i) => {
      if  (!task.finished) {
        return showAllTasks()[i]
      } 
      
    })
  }


  return (
    <div className="todo-app">
      <h1>Todo List</h1>

      <form action="#">
        <input
          type="text"
          value={inputTask}
          onChange={(e) => inputChangeHandler(e)}
        />
        <button type="submit" className="todo-app__button" onClick={buttonClickHandler}>Add task</button>
      </form>

      <div className="todo-app__task-types">
      <button
          disabled={showAll}
          onClick={ ()=> {
            setShowAll(true)
            seIsDone(false)
          }
            
          }
        >
          Show All</button>
        <button
        disabled={isDone}
        onClick={()=>{
          seIsDone(true)
          setShowAll(false)
        }}
       
          
        >Show Done</button>
        
        <button
             onClick={ ()=> {
              setShowAll(false)
              seIsDone(false)
            }
              
            }
          disabled={(!isDone && !showAll) && true}
        >
          Show Undone</button>
          

      </div>



            <div className="todo-app__main-content-wrapper">
      <div className="todo-app__main-content">
        {showAll ? showAllTasks()
          : !isDone ? showUndoneTasks() : showDoneTasks()}
      </div>
      </div>

    </div>
  );
}
export default TodoApp;