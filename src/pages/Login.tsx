import { FieldValues, useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utiles/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      id: "A-0001",
      password: "admin123",
    },
  });
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("...logging in");
    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(
        setUser({
          user: user,
          token: res.data.accessToken,
        })
      );
      toast.success("logged in", { id: toastId });
      navigate(`/${user.role}/dashboard`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("somethig went wrong", { id: toastId });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("id")} />
        <input type="password" {...register("password")} />

        <input type="submit" />
      </form>
    </>
  );
};

export default Login;
