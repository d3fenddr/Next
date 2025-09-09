export type CircularStatus = "Published" | "Draft";

export type Circular = {
  id: string;
  sn: string;
  title: string;
  department: string;
  createdBy: string;
  date: string;
  status: CircularStatus;
};
