import { headers } from "next/headers";
import { notFound } from "next/navigation";

type ParamsObj = Record<string, string | string[] | undefined>;

function buildQuery(paramsObj: ParamsObj) {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(paramsObj)) {
    if (v === undefined) continue;
    if (Array.isArray(v)) v.forEach((x) => qs.append(k, x));
    else qs.set(k, v);
  }
  return qs;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<ParamsObj>;
}) {
  const params = await searchParams;

  const qs = buildQuery(params);
  const urlPath = `/api/products${qs.size ? `?${qs}` : ""}`;

  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (!host) throw new Error("Missing Host header");
  const baseUrl = `${proto}://${host}`;

  const res = await fetch(`${baseUrl}${urlPath}`, {
    cache: "no-store",
    headers: {
      cookie: h.get("cookie") ?? "",
      "user-agent": h.get("user-agent") ?? "",
    },
  });

  if (res.status === 404) notFound();
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  const data = await res.json();

  return (
    <main style={{ padding: 24 }}>
      <h1>Products</h1>
      <p>
        Example:{" "}
        <code>
          /products?category=fruits&amp;minPrice=1.0&amp;sortBy=price&amp;order=desc
        </code>
      </p>
      <ul style={{ marginTop: 16 }}>
        {data.map((p: any) => (
          <li key={p.id}>
            #{p.id} — <b>{p.name}</b> ({p.category}) — ${p.price}
          </li>
        ))}
      </ul>
    </main>
  );
}
