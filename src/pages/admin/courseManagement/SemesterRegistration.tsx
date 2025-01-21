import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../component/form/PHForm";
import PHInput from "../../../component/form/PHInput";
import PHSelect from "../../../component/form/PHSelect";
import PHDatePicker from "../../../component/form/PHDatePicker";
import { useAcademciSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import { Button, Col, Row } from "antd";
import { useAddRegisteredSemesterMutation } from "../../../redux/features/admin/courseManagement.api";
import { semesterStatusOptions } from "../../../constants/semester";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";
import { TSemester } from "../../../types/courseManagement.type";

const SemesterRegistration = () => {
  const { data: semeatarData } = useAcademciSemesterQuery(undefined);
  const [addSemester] = useAddRegisteredSemesterMutation();
  const semesterOptions =
    semeatarData?.data?.map((item) => ({
      value: item._id,
      label: `${item.name} ${item.year}`,
    })) || [];
  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    console.log(semesterData);

    try {
      const res = (await addSemester(semesterData)) as TResponse<
        Partial<TSemester>
      >;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Semester created", { id: toastId });
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
          <PHForm onSubmit={onsubmit}>
            <PHSelect
              label="Academic Semester"
              name="academicSemester"
              options={semesterOptions}
            />
            <PHSelect
              name="status"
              label="Status"
              options={semesterStatusOptions}
            />
            <PHDatePicker name="startDate" label="Start Date" />
            <PHDatePicker name="endDate" label="End Date" />
            <PHInput type="text" name="minCredit" label="Minumum Credit" />
            <PHInput type="text" name="maxCredit" label="Max Credit" />
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

export default SemesterRegistration;
