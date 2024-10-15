import { Box, Card } from "@mui/material";
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
        email: submitData.email.trim(),
        password: submitData.password.trim(),
      });
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
      <Card className="md:w-1/3 w-full p-2">
        <CMDynamicForm formFields={LoginFields} onSubmit={handleSubmit} />
      </Card>
    </Box>
  );
};

export default Login;
