import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = false;

type User = {
  id: number;
  name: string;
};

export async function generateStaticParams() {
  // Предгенерируем только первых 5 пользователей
  return ["1", "2", "3", "4", "5"].map((id) => ({ id }));
}

async function getUser(id: string): Promise<User | null> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data?.id ? data : null;
}

export default async function UserPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser(params.id);
  if (!user) notFound();

  return (
    <main style={{ padding: 24 }}>
      <h1>{user.name}</h1>
      <p>
        <Link href={`/users/${user.id}/posts`}>Go to user's posts</Link>
      </p>
      <p>
        <Link href="/users">← Back to users list</Link>
      </p>
    </main>
  );
}
