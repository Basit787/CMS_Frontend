import { Box } from "@mui/material";
import { Endpoints } from "../../apis/apiContsants";
import instance from "../../apis/apiRequest";
import CMDynamicForm from "../../components/CMDynamicForm";
import useLoginStore from "../../stores/LoginStore";
import useSnackBarStore, { SnackbarType } from "../../stores/SnacbarStore";
import "./Login.scss";
import LoginFields from "./LoginForm.json";

const Login = () => {
  const { login } = useLoginStore((state) => state);
  const { openSnackbar } = useSnackBarStore((state) => state);

  const handleSubmit = async (submitData) => {
    try {
      const userData = await instance.post(Endpoints.student_Login, {
        email: submitData.email,
        password: submitData.password,
      });
      const token = userData.data.data.token;
      localStorage.setItem("token", token);
      login(userData.data.data);
    } catch (error) {
      console.log("login failed" + error);
      openSnackbar({
        type: SnackbarType.error,
        message: "Failed to login",
      });
    }
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
