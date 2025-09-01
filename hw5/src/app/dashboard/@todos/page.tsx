type SP =
  | Promise<Record<string, string | string[] | undefined>>
  | Record<string, string | string[] | undefined>;

async function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export default async function TodosList({
  searchParams,
}: {
  searchParams: SP;
}) {
  const sp = (await searchParams) as Record<string, string | string[] | undefined>;
  if (sp?.todosError === "1") {
    throw new Error("Todos endpoint failed");
  }
  await delay(2000);
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10",
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }
  const todos: { id: number; title: string; completed: boolean }[] =
    await res.json();
  return (
    <ul style={{ display: "grid", gap: 8 }}>
      {todos.map((t) => (
        <li key={t.id}>
          <span style={{ fontWeight: 500 }}>{t.title}</span>{" "}
          <span style={{ opacity: 0.7 }}>
            {t.completed ? "(done)" : "(pending)"}
          </span>
        </li>
      ))}
    </ul>
  );
}
