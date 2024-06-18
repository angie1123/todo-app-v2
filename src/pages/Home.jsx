import { useContext } from "react";
import {Col,Card, Container, Row } from "react-bootstrap";
import { TodoContext } from "../context/TodoContext";
import TodoCard from "../components/TodoCard";


export default function Home() {
  const todos = useContext(TodoContext).todos
  return (
    <Container>
      <h1 className="my-3">Your todos</h1>
      <Row>
        <CardGroup todos={todos} />
      </Row>
    </Container>
  )
}

function CardGroup({ todos }) {
  return todos.map((todo) => {
    // const completed = todo.completed
    // const bg = completed ? "success" : "danger"
    
    return (
      <Col md={4} className="my-3" key={todo.id}> 
        <Card.Body>

          <TodoCard todo={todo}/>
          {/* <Card.Title>{todo.title}</Card.Title>
          <Card.Text>{todo.description}</Card.Text>
          <Badge bg={bg}>{!completed && "Not"} Completed</Badge>*/}
        
        </Card.Body> 
      </Col>
    )
  })
}