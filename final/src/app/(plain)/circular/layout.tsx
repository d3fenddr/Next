import AppShell from "../../../components/layout/AppShell";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppShell showHeader={false}>{children}</AppShell>;
}
