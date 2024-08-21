import Main from "./Main";
import Login from "./Pages/Login/Login";
import CMDialogBox from "./components/CMDialogPopup";
import CMSnackBar from "./components/CMSnackbar";
import useLoginStore from "./stores/LoginStore";

function App() {
  const login = useLoginStore((state) => state.loginData?.token);

  return (
    <div>
      <CMSnackBar />
      <CMDialogBox />
      {login ? <Main /> : <Login />}
    </div>
  );
}

export default App;
