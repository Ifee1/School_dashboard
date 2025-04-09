import {
  Announcement,
  Assignment,
  Class,
  Event,
  Exam,
  Grade,
  Lesson,
  Parent,
  Result,
  Student,
  Subject,
  Teacher,
} from "@prisma/client";
import { Dispatch, SetStateAction } from "react";
import { FieldError } from "react-hook-form";

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
export type renderRowStudent = Student & { class: Class };

// export type renderRowStudent = {
//   id: number;
//   studentId: string;
//   name: string;
//   phone?: string;
//   grade: number;
//   class: string;
//   address: string;
//   email?: string;
//   photo: string;
// };

export type renderRowParent = Parent & { students: Student[] };

// export type renderRowParent = {
//   id: number;
//   students: string[];
//   name: string;
//   phone: string;
//   address: string;
//   email?: string;
// };

export type renderRowSubject = Subject & {
  teachers: Teacher[];
  lessons: Lesson[];
};

// export type renderRowSubject = {
//   id: number;
//   name: string;
//   teachers: string[];
// };

export type renderRowClasses = Class & {
  supervisor: Teacher;
  students: Student[];
  lessons: Lesson[];
  events: Event[];
  announcements: Announcement[];
  grade: Grade;
};
// export type renderRowClasses = {
//   id: number;
//   name: string;
//   capacity: number;
//   grade: number;
//   supervisor: string;
// };

export type renderRowLessons = Lesson & {
  subject: Subject;
  class: Class;
  teacher: Teacher;
};
// export type renderRowLessons = {
//   id: number;
//   subject: string;
//   class: string;
//   teacher: string;
// };

export type renderRowExams = Exam & {
  lesson: {
    subject: Subject;
    class: Class;
    teacher: Teacher;
  };
};
// export type renderRowExams = {
//   id: number;
//   subject: string;
//   class: string;
//   teacher: string;
//   date: string;
// };

export type renderRowAssignments = Assignment & {
  lesson: {
    subject: Subject;
    class: Class;
    teacher: Teacher;
  };
};
// export type renderRowAssignments = {
//   id: number;
//   subject: string;
//   class: string;
//   teacher: string;
//   dueDate: string;
// };

export type renderRowResults = {
  id: number;
  title: string;
  studentName: string;
  teacherName: string;
  score: number;
  className: string;
  startTime: Date;
};
// export type renderRowResults = {
//   id: number;
//   subject: string;
//   class: string;
//   teacher: string;
//   student: string;
//   date: string;
//   type: "exam" | "assignment";
//   score: number;
// };

export type renderRowEvents = Event & {
  class: Class;
};

// export type renderRowEvents = {
//   id: number;
//   title: string;
//   class: string;
//   date: string;
//   startTime: string;
//   endTime: string;
// };

export type renderRowAnnouncements = Event & {
  class: Class;
};

// export type renderRowAnnouncements = {
//   id: number;
//   title: string;
//   class: string;
//   date: string;
// };

export type formModal = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  data?: any;
  type: "create" | "update" | "delete";
  id?: any;
  setOpen?: Dispatch<SetStateAction<boolean>>;
};

export interface FormModalProps {
  modalData: formModal;
  relatedData?: any;
}

export type inputField = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  hidden?: boolean;
};

export type UserCardModal = {
  type: "admin" | "teacher" | "student" | "parent";
};

export interface UserCardModalProps {
  userModal: UserCardModal;
  relatedData?: any;
}

export type countChartType = {
  boys: number;
  girls: number;
};

export type AttendanceChartType = {
  name: string;
  present: number;
  absent: number;
}[];

export interface AttendanceChartProps {
  data: AttendanceChartType[];
}

export type BigCalendarModal = {
  type: "teacherId" | "classId";
  id: string | number;
};

export type CurrentState = {
  success: boolean;
  error: boolean;
};
