import { NextRequest } from "next/server";

const products = [
  { id: 1, name: "Banana",     category: "fruits",     price: 1.2 },
  { id: 2, name: "Apple",      category: "fruits",     price: 1.5 },
  { id: 3, name: "Carrot",     category: "vegetables", price: 0.8 },
  { id: 4, name: "Tomato",     category: "vegetables", price: 1.0 },
  { id: 5, name: "Watermelon", category: "fruits",     price: 2.5 },
];

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  "X-Data-Source": "mock-db",
} as const;

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth")?.value;
  if (token !== "token123") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: DEFAULT_HEADERS,
    });
  }

  console.log("[/api/products] UA:", req.headers.get("user-agent") ?? "unknown");

  await new Promise((res) => setTimeout(res, 1000));

  const sp = req.nextUrl.searchParams;
  const category = sp.get("category")?.toLowerCase() ?? undefined;
  const name = sp.get("name")?.toLowerCase() ?? undefined;
  const min = sp.get("minPrice") ? Number(sp.get("minPrice")) : undefined;
  const max = sp.get("maxPrice") ? Number(sp.get("maxPrice")) : undefined;
  const sortBy = sp.get("sortBy");
  const order = (sp.get("order") ?? "asc").toLowerCase();

  let list = [...products];

  if (category) list = list.filter((p) => p.category.toLowerCase() === category);
  if (typeof min === "number" && !Number.isNaN(min)) list = list.filter((p) => p.price >= min);
  if (typeof max === "number" && !Number.isNaN(max)) list = list.filter((p) => p.price <= max);
  if (name) list = list.filter((p) => p.name.toLowerCase().includes(name));

  if (sortBy === "name" || sortBy === "price") {
    const dir = order === "desc" ? -1 : 1;
    list.sort((a: any, b: any) => (a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0) * dir);
  }

  if (list.length === 0) {
    return new Response(JSON.stringify({ message: "No products found" }), {
      status: 404,
      headers: DEFAULT_HEADERS,
    });
  }

  return new Response(JSON.stringify(list), { status: 200, headers: DEFAULT_HEADERS });
}