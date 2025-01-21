import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { studentId } = useParams();
  console.log(studentId);
  return (
    <>
      <h1>Student Details of {studentId}</h1>
    </>
  );
};

export default StudentDetails;
