/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Row } from "antd";
import PHForm from "../../../component/form/PHForm";
import PHSelect from "../../../component/form/PHSelect";
import PHInput from "../../../component/form/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../types/global";
import { TCourse } from "../../../types/courseManagement.type";
import { toast } from "sonner";

const CreateCourse = () => {
  const { data: course } = useGetAllCoursesQuery(undefined);
  const [addCourse] = useAddCourseMutation();
  const courseOptions =
    course?.data?.map((item) => ({
      value: item._id,
      label: `${item.title}`,
    })) || [];
  const defaultvalue = {
    title: "Dom Manipulation",
    prefix: "JS",
    code: 108,
    credits: 3,
  };

  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("...creating");
    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      preRequisiteCourses: data.preRequisiteCourses
        ? data.preRequisiteCourses?.map((item: any) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };
    console.log(courseData);
    try {
      const res = (await addCourse(courseData)) as TResponse<Partial<TCourse>>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Successfully created a Course", { id: toastId });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Row>
        <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
          <PHForm onSubmit={onsubmit} defaultValues={defaultvalue}>
            <PHInput type="text" name="title" label="Title" />
            <PHInput type="text" name="prefix" label="Prefix" />
            <PHInput type="text" name="code" label="Code" />
            <PHInput type="text" name="credits" label="Credits" />
            <PHSelect
              label="Pre-Requisite Courses"
              name="preRequisiteCourses"
              options={courseOptions}
              mode="multiple"
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

export default CreateCourse;
