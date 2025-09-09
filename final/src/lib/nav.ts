export type NavItem = { label: string; href: string; exact?: boolean };

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", exact: true },
  { label: "Staff", href: "/staff" },
  { label: "Circulars", href: "/circular" },
  { label: "Payment Voucher", href: "/" },
  { label: "Payroll", href: "/" },
  { label: "Memo", href: "/" },
  { label: "Maintenance", href: "/" },
  { label: "Logistics", href: "/" },
  { label: "Office Budget", href: "/" },
  { label: "Stocks and Inventory", href: "/" },
  { label: "Notifications", href: "/" },
  { label: "Capacity Building", href: "/" },
  { label: "Procurements", href: "/" }
];
