/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Row } from "antd";
import PHSelect from "../../../component/form/PHSelect";
import { semesterOptions } from "../../../constants/semester";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { monthOptions } from "../../../constants/global";
import PHForm from "../../../component/form/PHForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { academiCemesterSchema } from "../../../schema/AcademicManagement.schema";
import { toast } from "sonner";
import { useAddAcademciSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { TResponse } from "../../../types/global";
import { TAcademicSemester } from "../../../types/academicManagement.type";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [addSemester] = useAddAcademciSemesterMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("....Creating");
    const name = semesterOptions[Number(data?.name) - 1]?.label;
    console.log(data);
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    try {
      const res = (await addSemester(semesterData)) as TResponse<
        Partial<TAcademicSemester>
      >;
      console.log(res);
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        toast.success("Semester Created Successfully", { id: toastId });
      }
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    }
  };

  return (
    <>
      <Row>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHForm
            onSubmit={onSubmit}
            resolver={zodResolver(academiCemesterSchema)}
          >
            <PHSelect label="Name" name="name" options={semesterOptions} />
            <PHSelect label="Year" name="year" options={yearOptions} />
            <PHSelect
              label="Start Month"
              name="startMonth"
              options={monthOptions}
            />
            <PHSelect
              label="End Month"
              name="endMonth"
              options={monthOptions}
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
  );
};

export default CreateAcademicSemester;
