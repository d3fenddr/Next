export default function DashboardLayout({
  posts,
  users,
  todos,
}: {
  posts: React.ReactNode;
  users: React.ReactNode;
  todos: React.ReactNode;
}) {
  return (
    <main
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "16px",
        padding: "16px",
      }}
    >
      <section>
        <h2 style={{ fontWeight: 600, marginBottom: 15 }}>Posts</h2>
        {posts}
      </section>
      <section>
        <h2 style={{ fontWeight: 600, marginBottom: 15 }}>Users</h2>
        {users}
      </section>
      <section>
        <h2 style={{ fontWeight: 600, marginBottom: 15 }}>Todos</h2>
        {todos}
      </section>
    </main>
  );
}
