import { useContext, useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { TodoContext } from "../context/TodoContext";

export default function TodoCard({ todo }) {
  const completed = todo.completed;
  const border = completed ? "success" : "danger";
  const [timer, setTimer] = useState(0)
  const [timerInterval, setTimerInterval] = useState(null)
  const setTodos = useContext(TodoContext).setTodos
  const [showModal, setShowModal] = useState(false)
  
  
  //Functions related to the timer
  const startTimer = () => {
    if (timerInterval === null) {

      const intervalID = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
      }, 1000)

      setTimerInterval(intervalID)

    }
  }

  const pauseTimer = () => {
   //clearInterval method cancel a timed
    clearInterval(timerInterval)
    setTimerInterval(null)
  }

  const resetTimer = () => {
    clearInterval(timerInterval)
    setTimer(0)
    setTimerInterval(null)
  }

  const deleteTodo = () => {
    /*in react, when use state setter function like"setTodos",
    it can be passed a function as an argument

    the function receive the current state as it parameter

    react automatically provide the current state to this function,
    so dont need to manually declare or access using useContext.todos again
    
    react automatically provide current state as argument to the setter function
    */
    setTodos((prevTodos) => 
      //prevTodos take the preivious todos array
      //prevTodo.id!== todo.id//return only prevTodo.id not equal to current todo.id
      prevTodos.filter((prevTodo) => { return prevTodo.id !== todo.id })
    )
    

    
  }
  /*useEffect  ensure that the timer is cleaned up when the 
  "TodoCard" component is unmounted or when the `timeInterval` state variable changes
  */
  useEffect(() => {
   
    /*clear interval when timerInterval changes ensures that there
      are no multiple interval running simultaneously,which can cause
      unintended behaviour such as multiple increments 
      of timer per second*/
    return () => {
      clearInterval(timerInterval)
    }
  },[timerInterval])

  return (
    <>
      <Card border={border} className="my-3">
        <Card.Header>{!completed && "Not"} Completed</Card.Header>
        <Card.Body>
          <Card.Title>{todo.title}</Card.Title>
          <Card.Text>{todo.description}</Card.Text>
          <p>Timer:{timer} second</p>
          <Button onClick={startTimer}>
            <i className="bi bi-play"></i>
          </Button>
          <Button onClick={pauseTimer} className="mx-2">
          <i className="bi bi-pause-fill"></i>
          </Button>
          <Button onClick={resetTimer} className="mx-2">
          <i className="bi bi-arrow-clockwise"></i>
          </Button>
          <Button variant="secondary" href={`todo/${todo.id}`} className="ms-2">
          <i className="bi bi-pencil"></i>
          </Button>
          <Button  variant="danger" onClick={()=>setShowModal(true)} className="mx-2">
          <i className="bi bi-trash"></i>
          </Button>

        </Card.Body>
      </Card>

      {/* -backdrop refers to physical object or scenery use as background
          -while background can refer to any part of the scene behind the subject.*/
      /*specify "static" for a backdrop does not trigger an onHide when clicked */
      }

      {/*"show" takes boolean value,when true,the modal will show itself  */}
      {/*onHide- a callback fired whenthe header closeButton or non-static backdrop is clicked */}
      <Modal show={showModal} onHide={()=>setShowModal(false)} backdrop="static">

        <Modal.Header closeButton>

          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>

        <Modal.Body>Are you sure want to delete this todo ?</Modal.Body>

        <Modal.Footer>
          <Button onClick={()=>setShowModal(false)} variant="secondary" >Cancel</Button>
          <Button onClick={deleteTodo} variant="danger">Delete</Button>{/*deleteTodo cause a rerender of component,and after rerender the state of showModal is false*/}
        </Modal.Footer>

      </Modal>
    </>
  )
}