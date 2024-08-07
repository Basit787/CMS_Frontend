import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { Endpoints } from "../../apis/apiContsants";
import instance from "../../apis/apiRequest";
import CMDynamicForm from "../../components/CMDynamicForm";
import { login } from "../../reducers/LoginSlice";
import { setSnackBarOpen, SnackbarType } from "../../reducers/SnacbarSlice";
import "./Login.scss";
import LoginFields from "./LoginForm.json";

const Login = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    instance
      .post(Endpoints.student_Login, {
        email: event.email,
        password: event.password,
      })
      .then((response) => {
        const token = response.data.data.token;
        localStorage.setItem("token", token);
        dispatch(login(response.data.data));
      })
      .catch((error) => {
        console.log("login failed" + error);
        dispatch(
          setSnackBarOpen({
            type: SnackbarType.error,
            message: "Failed to login",
          })
        );
      });
  };
  return (
    <Box className="flex justify-center items-center min-h-screen bgImg ">
      <Box className="md:w-1/3 w-full">
        <CMDynamicForm formFields={LoginFields} onSubmit={handleSubmit} />
      </Box>
    </Box>
  );
};
export default Login;
