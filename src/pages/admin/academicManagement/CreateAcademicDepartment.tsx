import { Button, Col, Row } from "antd";
import PHForm from "../../../component/form/PHForm";
import PHInput from "../../../component/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../component/form/PHSelect";
import { useAcademciSemesterQuery } from "../../../redux/features/admin/academicManagement.api";

const CreateAcademicDepartment = () => {
  const { data: facultyData, isLoading } = useAcademciSemesterQuery(undefined);
  const facultyOptions =
    facultyData?.data?.map((item) => ({
      value: item._id,
      label: item.name,
    })) || [];
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
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
