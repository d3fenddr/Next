export type Gender = "Male" | "Female";

export type Staff = {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  staffId: string;
  phone: string;
  role: string;
  designation: string;
  email?: string;
  officialEmail?: string;
  photo?: string;
};
