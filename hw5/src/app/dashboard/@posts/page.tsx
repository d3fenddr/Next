import Link from "next/link";

type SP =
  | Promise<Record<string, string | string[] | undefined>>
  | Record<string, string | string[] | undefined>;

async function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export default async function PostsList({
  searchParams,
}: {
  searchParams: SP;
}) {
  const sp = (await searchParams) as Record<string, string | string[] | undefined>;
  if (sp?.postsError === "1") {
    throw new Error("Posts endpoint failed");
  }
  await delay(2000);
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const posts: { id: number; title: string }[] = await res.json();
  return (
    <ul style={{ display: "grid", gap: 8 }}>
      {posts.map((p) => (
        <li key={p.id}>
          <Link href={`/dashboard/posts/${p.id}`}>{p.title}</Link>
        </li>
      ))}
    </ul>
  );
}
