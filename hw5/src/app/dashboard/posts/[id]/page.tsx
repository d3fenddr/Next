type SP =
  | Promise<Record<string, string | string[] | undefined>>
  | Record<string, string | string[] | undefined>;

async function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export default async function PostDetails({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: SP;
}) {
  const { id } = await params;
  const sp = (await searchParams) as Record<string, string | string[] | undefined>;

  if (sp?.postsError === "1") {
    throw new Error("Posts endpoint failed");
  }

  await delay(2000);

  const postRes = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    { cache: "no-store" }
  );
  if (!postRes.ok) {
    throw new Error("Failed to fetch post");
  }

  const post: { id: number; userId: number; title: string; body: string } =
    await postRes.json();

  const userRes = await fetch(
    `https://jsonplaceholder.typicode.com/users/${post.userId}`,
    { cache: "no-store" }
  );
  if (!userRes.ok) {
    throw new Error("Failed to fetch author");
  }

  const user: { id: number; name: string } = await userRes.json();

  return (
    <article style={{ display: "grid", gap: 8 }}>
      <h3 style={{ fontSize: 20, fontWeight: 600 }}>{post.title}</h3>
      <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{post.body}</p>
      <p style={{ opacity: 0.8 }}>Author: {user.name}</p>
    </article>
  );
}
