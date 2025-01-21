import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  setUser,
  TUser,
  useCurrentToken,
} from "../redux/features/auth/authSlice";
import { verifyToken } from "../utiles/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../component/form/PHForm";
import PHInput from "../component/form/PHInput";
import { Button, Col, Row } from "antd";
import { useEffect } from "react";

const Login = () => {
  const token = useAppSelector(useCurrentToken);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  useEffect(() => {
    if (token) {
      const user = verifyToken(token) as TUser;
      navigate(`/${user.role}/dashboard`);
    }
  }, [token, navigate]);
  const defaultValues = {
    id: "A-0001",
    password: "admin123",
  };
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
      <Row
        justify="center" // Center horizontally
        align="middle" // Center vertically
        style={{ height: "100vh" }} // Full viewport height
      >
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
            <PHInput type="text" label="Your Id" name="id"></PHInput>
            <PHInput
              type="password"
              label="Your Password"
              name="password"
            ></PHInput>
            <Button
              size="large"
              block
              style={{
                backgroundColor: "#1890ff",
                borderColor: "#1890ff",
                color: "#fff",
                fontWeight: "bold",
                boxShadow: "0 4px 8px rgba(24, 144, 255, 0.6)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#40a9ff"; // Lighter blue on hover
                e.currentTarget.style.boxShadow =
                  "0 6px 12px rgba(64, 169, 255, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#1890ff";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(24, 144, 255, 0.6)";
              }}
              htmlType="submit"
            >
              Login
            </Button>
          </PHForm>
        </Col>
      </Row>
    </>
  );
};

export default Login;
