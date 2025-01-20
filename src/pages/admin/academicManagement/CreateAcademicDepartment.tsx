import { Button, Col, Row } from "antd";
import PHForm from "../../../component/form/PHForm";
import PHInput from "../../../component/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../component/form/PHSelect";
import {
  useAddAcademciDepartmentMutation,
  useAllAcademciFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import { TAcademicDepartment } from "../../../types/academicManagement.type";

const CreateAcademicDepartment = () => {
  const { data: facultyData, isLoading } =
    useAllAcademciFacultyQuery(undefined);
  const facultyOptions =
    facultyData?.data?.map((item) => ({
      value: item._id,
      label: item.name,
    })) || [];
  const [addDepartment] = useAddAcademciDepartmentMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("....creating");
    try {
      const res = (await addDepartment(data)) as TResponse<
        Partial<TAcademicDepartment>
      >;
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        toast.success("Department Created Successfully", { id: toastId });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    }
  };
  return (
    <>
      <>
        <Row>
          <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
            <PHForm onSubmit={onSubmit}>
              <PHInput name="name" label="Department Name" type="text" />
              <PHSelect
                label="Academic Faculty"
                name="academicFaculty"
                options={facultyOptions}
                disabled={isLoading}
              />
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
    </>
  );
};

export default CreateAcademicDepartment;
