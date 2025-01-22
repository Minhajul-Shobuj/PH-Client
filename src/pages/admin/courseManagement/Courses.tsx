/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Table } from "antd";
import {
  useAddFacultiesMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import PHForm from "../../../component/form/PHForm";
import PHSelect from "../../../component/form/PHSelect";
import { useState } from "react";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";

const Courses = () => {
  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

  const tableData = courses?.data?.map(({ _id, title, prefix, code }) => ({
    key: _id,
    title,
    code: `${prefix}${code}`,
  }));

  const columns = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },
    {
      title: "Action",
      key: "x",
      render: (item: any) => {
        return <AddFacultyModal facultyInfo={item} />;
      },
    },
  ];
  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        pagination={false}
      />
    </>
  );
};

const AddFacultyModal = ({ facultyInfo }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  const [addFaculties] = useAddFacultiesMutation();

  const facultiesOption =
    facultiesData?.data?.map((item) => ({
      value: item._id,
      label: item.fullName,
    })) || [];

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const facultyData = {
      courseId: facultyInfo.key,
      data,
    };

    console.log(facultyData);

    addFaculties(facultyData);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            mode="multiple"
            options={facultiesOption}
            name="faculties"
            label="Faculty"
          />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default Courses;
