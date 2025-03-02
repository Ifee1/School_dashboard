export type TeacherTableColumn = {
  header: string;
  accessor: string;
  className?: string;
};

export interface TableProps {
  columns: TeacherTableColumn[];
  renderRow: (rowData: any) => React.ReactNode;
  data: any[];
}

export type renderRowTeacher = {
  id: number;
  teacherId: string;
  name: string;
  phone: string;
  subjects: string[];
  classes: string[];
  address: string;
  email?: string;
  photo: string;
};

export type renderRowStudent = {
  id: number;
  studentId: string;
  name: string;
  phone?: string;
  grade: number;
  class: string;
  address: string;
  email?: string;
  photo: string;
};

export type renderRowParent = {
  id: number;
  students: string[];
  name: string;
  phone: string;
  address: string;
  email?: string;
};

export type renderRowSubject = {
  id: number;
  name: string;
  teachers: string[];
};

export type renderRowClasses = {
  id: number;
  name: string;
  capacity: number;
  grade: number;
  supervisor: string;
};

export type renderRowLessons = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
};

export type renderRowExams = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  date: string;
};

export type renderRowAssignments = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  dueDate: string;
};

export type renderRowResults = {
  id: number;
  subject: string;
  class: string;
  teacher: string;
  student: string;
  date: string;
  type: "exam" | "assignment";
  score: number;
};

export type renderRowEvents = {
  id: number;
  title: string;
  class: string;
  date: string;
  startTime: string;
  endTime: string;
};

export type renderRowAnnouncements = {
  id: number;
  title: string;
  class: string;
  date: string;
};
