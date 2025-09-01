type SP =
  | Promise<Record<string, string | string[] | undefined>>
  | Record<string, string | string[] | undefined>;

async function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export default async function UsersList({
  searchParams,
}: {
  searchParams: SP;
}) {
  const sp = (await searchParams) as Record<string, string | string[] | undefined>;
  if (sp?.usersError === "1") {
    throw new Error("Users endpoint failed");
  }
  await delay(2000);
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }
  const users: { id: number; name: string }[] = await res.json();
  return (
    <ul style={{ display: "grid", gap: 8 }}>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
