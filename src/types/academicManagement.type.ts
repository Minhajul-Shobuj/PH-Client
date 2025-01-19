export type TAcademicSemester = {
  code: string;
  createdAt: string;
  endMonth: string;
  name: string;
  startMonth: string;
  updatedAt: string;
  year: string;
  _id: string;
};
export type TAcademicFaculty = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TAcademicDepartment = {
  _id: string;
  name: string;
  academicFaculty: TAcademicFaculty;
  createdAt: string;
  updatedAt: string;
};
