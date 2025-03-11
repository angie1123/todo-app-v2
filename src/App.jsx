import { Container, Nav, Navbar } from "react-bootstrap";
import useLocalStorage from "use-local-storage";
import { TodoContext } from "./context/TodoContext";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AddTodo from "./pages/AddTodo";
import ErrorPage from "./pages/ErrorPage";
import EditTodo from "./pages/EditTodo";
import LoginPage from "./pages/LoginPage";
import { UserContext} from "./context/UserContext";
import { useState } from "react";

function Layout() {
  return (
    <>
      
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">Todos</Navbar.Brand>
        <Nav className="me-auto">{/*me-auto to force sibling away from one another */}
          <Nav.Link href="/addTodo">Add Todo</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
      <Outlet/>{/*allows us to render child content inside of our parent component */}
      
    </>
  )
}

export default function App() {
  const [todos, setTodos] = useLocalStorage('todos', [])
  const [user,setUser]=useState(null)
  
  return (
    <UserContext.Provider value={{user,setUser}}>
    <TodoContext.Provider value={{ todos, setTodos }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="addTodo" element={<AddTodo />} />
             
            <Route path="*" element={<ErrorPage />} />
             {/* ":" before id is an indicator that inform react that this is a dynamic Route and "id" is now a property of useParams */}
            <Route path="todo/:id" element={<EditTodo/>} />
            </Route>
      </Routes>
      </BrowserRouter>
      </TodoContext.Provider>
      </UserContext.Provider>
  )
}