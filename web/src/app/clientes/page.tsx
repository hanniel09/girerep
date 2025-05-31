"use client";

import { useEffect, useState } from "react";
import { Pencil, Search, Trash2 } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { Client } from "../../types";
import { ClientFormDialog, ClientForm } from "./ClientDialog";
import Header from "../../components/header";
import { Button } from "../../components/ui/button";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Input } from "../../components/ui/input";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function Page() {
  const { token } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [query, setQuery] = useState("");

  async function fetchClients(q = "") {
    if (!token) return;
    const url = q
      ? `${API}/clients/search?query=${encodeURIComponent(q)}`
      : `${API}/clients?page=0&size=40`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      setClients([]);
      return;
    }

    const data = await res.json();

    if (Array.isArray(data)) {
      setClients(data as Client[]);
    }
    else if (data.content && Array.isArray(data.content)) {
      setClients(data.content as Client[]);
    }
    else {
      setClients([]);
    }
  }

  useEffect(() => {
    if (token) fetchClients();
  }, [token]);

  useEffect(() => {
    if (token) fetchClients(query.trim());
  }, [token, query]);

  const handleCreate = async (form: ClientForm) => {
    await fetch(`${API}/clients`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    await fetchClients();
  };

  const handleEdit = async (id: string, form: ClientForm) => {
    await fetch(`${API}/clients/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    await fetchClients();
  };

  const handleDelete = async (id: string) => {
    await fetch(`${API}/clients/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setClients(clients.filter((c) => c.id !== id));
  };


  return (
    <ProtectedRoute>
      <div className="max-w-[1680px] mx-auto p-6">
        <Header />

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-stone-700 ml-10">Clientes</h1>
          <div className="flex items-center space-x-4 mr-10">
            <div className="relative">
              <Input
                placeholder="Procurar cliente"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <ClientFormDialog
              trigger={
                <Button
                  className="bg-green-600 hover:bg-green-700 cursor-pointer"
                  aria-label="Novo cliente"
                >
                  Novo Cliente
                </Button>
              }
              title="Novo Cliente"
              onSubmit={handleCreate} />
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          {Array.isArray(clients) && clients.map((client) => (
            <div
              key={client.id}
              className="max-w-[1600px] w-full rounded-xl h-[100px] shadow-sm border bg-white hover:shadow-md transition mx-auto"
            >
              <div className="grid grid-cols-[repeat(8,_1fr)_auto] items-center gap-2 px-4 h-full">
                {[
                  ["Nome", client.name],
                  ["Comprador", client.buyer_name],
                  ["Fantasia", client.fantasy_name],
                  ["Razão", client.corporate_reason],
                  ["Email", client.email],
                  ["Telefone", client.phone],
                  ["Endereço", client.address],
                  ["CEP", client.postal_code],
                ].map(([label, value], i) => (
                  <div key={i} className="flex flex-col text-sm">
                    <span className="font-bold text-gray-800">{label}</span>
                    <span className="mt-1 truncate">{value}</span>
                  </div>
                ))}


                <div className="flex flex-col justify-center items-center space-y-2">
                  <ClientFormDialog trigger={
                    <Button
                      size="sm"
                      aria-label="Editar cliente"
                      className="bg-gray-800 hover:bg-gray-950 cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  }
                    initial={client as ClientForm}
                    title="Editar Cliente"
                    onSubmit={(form) => handleEdit(client.id, form)}
                  />
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(client.id)}
                    aria-label="Excluir cliente"
                    className="bg-red-700 hover:bg-red-900 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}