export type MemoRow = { sn: string; title: string; from: string; to: string; status: "Approved" | "Pending" };
export type VoucherRow = { sn: string; subject: string; date: string; status: "Approved" | "Pending" };
export type StaffRow = { sn: string; name: string; role: string; designation: string };

export const MEMOS: MemoRow[] = [
  { sn: "01", title: "Operations memo", from: "Otor John", to: "Ibrahim Sadiq", status: "Pending" },
  { sn: "02", title: "Operations project memo", from: "Fatima Faruk", to: "Shola Abiola", status: "Approved" },
  { sn: "03", title: "Project onboard notice", from: "Otor John", to: "James Emeka", status: "Approved" },
  { sn: "04", title: "Operations memo", from: "Ibrahim Musa", to: "Otor John", status: "Approved" },
  { sn: "05", title: "Security update", from: "Jane Doe", to: "IT Desk", status: "Pending" },
  { sn: "06", title: "Budget note", from: "Finance", to: "All HOD", status: "Approved" },
  { sn: "07", title: "Office move", from: "Admin", to: "All Staff", status: "Pending" },
  { sn: "08", title: "Holiday schedule", from: "HR", to: "All Staff", status: "Approved" },
  { sn: "09", title: "Policy refresh", from: "Compliance", to: "All Units", status: "Pending" },
  { sn: "10", title: "Onsite maintenance", from: "Facilities", to: "IT Desk", status: "Approved" }
];

export const VOUCHERS: VoucherRow[] = [
  { sn: "01", subject: "Request for FARS for October 2022", date: "25/01/2023", status: "Pending" },
  { sn: "02", subject: "Request for project proposal fee", date: "19/01/2023", status: "Approved" },
  { sn: "03", subject: "Request for FARS for October 2022", date: "10/01/2023", status: "Approved" },
  { sn: "04", subject: "Request for project proposal fee", date: "03/01/2023", status: "Pending" },
  { sn: "05", subject: "Equipment purchase", date: "05/01/2023", status: "Approved" },
  { sn: "06", subject: "Travel refund", date: "28/12/2022", status: "Pending" },
  { sn: "07", subject: "Office supplies", date: "20/12/2022", status: "Approved" },
  { sn: "08", subject: "Training workshop", date: "15/12/2022", status: "Approved" },
  { sn: "09", subject: "Internet service invoice", date: "08/12/2022", status: "Pending" },
  { sn: "10", subject: "Catering services", date: "02/12/2022", status: "Approved" }
];

export const STAFF: StaffRow[] = [
  { sn: "01", name: "Abubakar Ismaila Goje", role: "Admin", designation: "Human Resource Dept." },
  { sn: "02", name: "Ifeanyi Obinna", role: "Admin", designation: "Management" },
  { sn: "03", name: "Bankole Olanrewaju", role: "HOD I.T", designation: "Peoples and Operation" },
  { sn: "04", name: "Chidinma Ebere", role: "HOD Account", designation: "Accounts" },
  { sn: "05", name: "Aisha Bello", role: "Admin", designation: "Finance" },
  { sn: "06", name: "Tunde Aremu", role: "Officer", designation: "Operations" },
  { sn: "07", name: "Mary Okon", role: "Assistant", designation: "Procurement" },
  { sn: "08", name: "Samuel Ojo", role: "Supervisor", designation: "Logistics" },
  { sn: "09", name: "Halima Yusuf", role: "Coordinator", designation: "Capacity Building" },
  { sn: "10", name: "Peter Nwachukwu", role: "Analyst", designation: "Office Budget" }
];

export const APPLICATIONS = { total: 500, approved: 370, pending: 80, rejected: 50 };
