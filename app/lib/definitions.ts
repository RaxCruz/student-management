// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  student_id: string;
  email: string;
  person_id: string;
  phone_1: string;
  phone_2: string;
  mobile: string;
  emergency_phone: string;
  emergency_contact: string;
  residence_addr: string;
  mailing_addr: string;
};

export type Score = {
  id: string;
  student_id: string;
  school_year: number;
  semester: number;
  chinese_score: number;
  math_score: number;
  english_score: number;
};
