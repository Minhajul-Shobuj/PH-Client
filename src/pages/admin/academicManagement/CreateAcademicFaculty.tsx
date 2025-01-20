import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../component/form/PHForm";
import PHInput from "../../../component/form/PHInput";
import { Button, Col, Row } from "antd";

const CreateAcademicFaculty = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
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
