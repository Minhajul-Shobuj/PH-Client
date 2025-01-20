import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../component/form/PHForm";
import PHInput from "../../../component/form/PHInput";
import { Button, Col, Row } from "antd";
import { useAddAcademciFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import { TAcademicFaculty } from "../../../types/academicManagement.type";

const CreateAcademicFaculty = () => {
  const [addFaculty] = useAddAcademciFacultyMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("....Creating");
    try {
      const res = (await addFaculty(data)) as TResponse<
        Partial<TAcademicFaculty>
      >;
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        toast.success("Faculty Created Successfully", { id: toastId });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    }
  };
  return (
    <>
      <Row>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHForm onSubmit={onSubmit}>
            <PHInput name="name" label="Add Academic Faculty" type="text" />
            <Button
              type="primary"
              shape="round"
              size="large"
              style={{
                backgroundColor: "#1890ff",
                borderColor: "#1890ff",
                fontWeight: "bold",
                padding: "0 24px",
                color: "#fff",
              }}
              htmlType="submit"
            >
              Submit
            </Button>
          </PHForm>
        </Col>
      </Row>
    </>
  );
};

export default CreateAcademicFaculty;
