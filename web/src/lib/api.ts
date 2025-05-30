export async function fetchClients(): Promise<Client[]> {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API}/clients`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch clients");
  }
  const data = await res.json();
}