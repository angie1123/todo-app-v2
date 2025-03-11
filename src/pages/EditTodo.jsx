import { useContext, useState } from "react";
import {TodoContext} from "../context/TodoContext"
import {useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";

export default function EditTodo() {
  const setTodos = useContext(TodoContext).setTodos
  const todos = useContext(TodoContext).todos
  const navigate = useNavigate()
  /*useParams allow to have access to dynamic parameter in the URL */
  /*useParams().id  accessed the id property inside useParams()*/
  
  const id = parseInt(useParams().id)
  //filter out the current updating todo
  /*filter returns an array,
  therefore we need to get the item in array using the [0] */
  const currentTodo = todos.filter((todo) => todo.id === id)[0]
  const [title, setTitle] = useState(currentTodo.title);
  const [description, setDescription] = useState(currentTodo.description)
  const [completed, setCompleted] = useState(currentTodo.completed)
  
  
  function updateTodo(event) {
    event.preventDefault()
  
    //will return todos array with the specific one changes
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { id, title, description, completed }
      }
     /*if condition not meet,return original todo as it is,
     so only the condition meet todos will be updated to different todo    
     */ 
     return todo;
    })
    //the todos will be set to updatedTodos with original arrangement
    setTodos(updateTodos)
    navigate("/")
  }

  return (
    <Container>
      <h1 className="my-3">Add Todo</h1>
      <Form onSubmit={updateTodo}>

        <Form.Group className="mb-3" controlId="title">
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Get software developer job"
            required />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            as="textarea"
            row={3}
            placeholder={` 1. Create amazing project\n 2. Apply to Google & Netflix\n 3. Crush interview`}
            required
          />
        </Form.Group>

        <Form.Check
          type="checkbox"
          id="completed"
          label="Mark as completed"
          checked={completed}
          onChange={(e) => { setCompleted(e.target.checked) }}
          className="mb-3"
        />

        <Button variant="primary" type="submit">
          Submit
        </Button>

      </Form>
    </Container>
  )
}