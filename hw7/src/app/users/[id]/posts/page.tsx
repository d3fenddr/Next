import Link from "next/link";

export const dynamicParams = true;

type Post = {
  id: number;
  title: string;
  userId: number;
};

async function getPostsByUser(id: string): Promise<Post[]> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}/posts`
  );
  if (!res.ok) return [];
  return res.json();
}

export default async function UserPostsPage({
  params,
}: {
  params: { id: string };
}) {
  const posts = await getPostsByUser(params.id);

  return (
    <main style={{ padding: 24 }}>
      <h1>Posts of user {params.id}</h1>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {posts.map((p) => (
            <li key={p.id}>{p.title}</li>
          ))}
        </ul>
      )}

      <p>
        <Link href={`/users/${params.id}`}>← To the user profile</Link>
      </p>
    </main>
  );
}
