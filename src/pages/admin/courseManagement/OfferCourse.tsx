import { useState } from "react";
import {
  useAddOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import {
  useAllAcademciDepartmentQuery,
  useAllAcademciFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import moment from "moment";
import { Button, Col, Flex } from "antd";
import PHForm from "../../../component/form/PHForm";
import PHSelect from "../../../component/form/PHSelect";
import PHSelectWithWatch from "../../../component/form/PHSelectWithWatch";
import PHInput from "../../../component/form/PHInput";
import { weekDaysOptions } from "../../../constants/global";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");

  const [addOfferedCourse] = useAddOfferedCourseMutation();

  const { data: semesterRegistrationData } = useGetAllRegisteredSemestersQuery([
    { name: "sort", value: "year" },
    { name: "status", value: "UPCOMING" },
  ]);

  const { data: academicFacultyData } = useAllAcademciFacultyQuery(undefined);

  const { data: academicDepartmentData } =
    useAllAcademciDepartmentQuery(undefined);

  const { data: coursesData } = useGetAllCoursesQuery(undefined);

  const { data: facultiesData, isFetching: fetchingFaculties } =
    useGetCourseFacultiesQuery(courseId, { skip: !courseId });

  const semesterRegistrationOptions =
    semesterRegistrationData?.data?.map((item) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })) || [];

  const academicFacultyOptions =
    academicFacultyData?.data?.map((item) => ({
      value: item._id,
      label: item.name,
    })) || [];

  const academicDepartmentOptions =
    academicDepartmentData?.data?.map((item) => ({
      value: item._id,
      label: item.name,
    })) || [];

  const courseOptions =
    coursesData?.data?.map((item) => ({
      value: item._id,
      label: item.title,
    })) || [];

  const facultiesOptions =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    facultiesData?.data?.faculties?.map((item: any) => ({
      value: item._id,
      label: item.fullName,
    })) || [];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };

    const res = await addOfferedCourse(offeredCourseData);
    console.log(res);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect
            name="semesterRegistration"
            label="Semester Registrations"
            options={semesterRegistrationOptions}
          />
          <PHSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={academicFacultyOptions}
          />
          <PHSelect
            name="academicDepartment"
            label="Academic Department"
            options={academicDepartmentOptions}
          />
          <PHSelectWithWatch
            onValueChange={setCourseId}
            options={courseOptions}
            name="course"
            label="Course"
          />
          <PHSelect
            disabled={!courseId || fetchingFaculties}
            name="faculty"
            label="Faculty"
            options={facultiesOptions}
          />
          <PHInput type="text" name="section" label="Section" />
          <PHInput type="text" name="maxCapacity" label="Max Capacity" />
          <PHSelect
            mode="multiple"
            options={weekDaysOptions}
            name="days"
            label="Days"
          />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
