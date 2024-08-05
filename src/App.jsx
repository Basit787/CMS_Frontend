import { useSelector } from "react-redux";
import Login from "./Login/Login";
import Main from "./Main";

function App() {
  const login = useSelector((state) => state.Login.token);

  return <div>{login ? <Main /> : <Login />}</div>;
}

export default App;
