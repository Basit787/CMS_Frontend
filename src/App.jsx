import { useSelector } from "react-redux";
import Main from "./Main";
import CMSnackBar from "./components/CMSnackbar";
import Login from "./Pages/Login/Login";
import CMDialogBox from "./components/CMDialogPopup";

function App() {
  const login = useSelector((state) => state.Login.token);

  return (
    <div>
      <CMSnackBar />
      <CMDialogBox />
      {login ? <Main /> : <Login />}
    </div>
  );
}

export default App;
