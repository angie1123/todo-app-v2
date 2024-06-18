import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { Button } from "react-bootstrap";


export default function Login() {
  const { setUser } = useContext(UserContext)
  const [username, setUsername] = useState('')
  
  const handleLogin = () => {
    setUser({id:1,name:username})
  }

  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your name"
      />
      <Button onClick={handleLogin}></Button>
    </div>
  )
}