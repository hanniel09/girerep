"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/header";
import { Client } from "@/types";
import { Pencil, Trash2 } from "lucide-react";

import { ClientFormDialog, ClientForm } from "@/app/clientes/ClientDialog";
import { CommissionFormDialog, CommissionForm } from "@/app/comissoes/CommissionFormDialog";

type CommissionResponse = CommissionForm & { id: string; monthYear: string };

const API = process.env.NEXT_PUBLIC_API_URL;

export default function Homepage() {
  const router = useRouter();
  const { token, logout, role } = useAuth();

  const [clients, setClients] = useState<Client[]>([]);
  const [commissions, setCommissions] = useState<CommissionResponse[]>([]);

  async function fetchClients() {
    if (!token) return;
    const res = await fetch(`${API}/clients?page=0&size=5`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setClients(data.content);
    }
  }

  async function fetchCommissions() {
    if (!token) return;
    const res = await fetch(`${API}/commissions/latest`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data: CommissionResponse[] = await res.json();
      setCommissions(data);
    }
  }

  useEffect(() => {
    fetchClients();
    fetchCommissions();
  }, [token]);

  return (
    <ProtectedRoute>
      <main className="max-w-[1680px] mx-auto p-6 space-y-8">

        <div className="flex justify-between items-center">
          <h1
            className="text-4xl font-bold text-stone-700 cursor-pointer"
            onClick={() => router.push("/home")}
          >
            Girê Representações
          </h1>
          <div className="flex space-x-4 mr-20">
            <Button variant="link" onClick={() => router.push("/clientes")} className="text-2xl cursor-pointer">
              Clientes
            </Button>
            <Button variant="link" onClick={() => router.push("/comissoes")} className="text-2xl cursor-pointer">
              Comissões
            </Button>
            {role === "ADMIN" && (
              <Button
                variant="link"
                onClick={() => router.push("/admin/users")}
                className="text-2xl cursor-pointer text-blue-800"
              >
                Gerenciar Usuários
              </Button>
            )}
            <Button variant="link" onClick={logout} className="text-2xl cursor-pointer text-red-600">
              Logout
            </Button>
          </div>
        </div>

        <section>
          <div className="flex justify-between items-center mb-4">
            <Button variant="link" onClick={() => router.push("/clientes")} className="text-2xl cursor-pointer">
              Últimos Clientes Cadastrados
            </Button>
          </div>
          <div className="space-y-4">
            {clients.map((client) => (
              <div
                key={client.id}
                className="max-w-[1280px] w-full rounded-xl h-[100px] shadow-sm border bg-white hover:shadow-md transition mx-auto p-4 grid grid-cols-[repeat(8,_1fr)_auto] items-center gap-2"
              >

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
                  <ClientFormDialog
                    title="Editar Cliente"
                    initial={client as ClientForm}
                    onSubmit={async (form) => {
                      await fetch(
                        `${API}/clients/${client.id}`,
                        {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify(form),
                        }
                      );
                      fetchClients();
                    }}
                    trigger={
                      <Button
                        size="icon"
                        className="bg-gray-800 hover:bg-gray-950 cursor-pointer"
                        aria-label="Editar cliente"
                      >
                        <Pencil className="w-4 h-4 text-white" />
                      </Button>
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-4">
            <Button variant="link" onClick={() => router.push("/comissoes")} className="text-2xl cursor-pointer">
              Últimas Comissões Geradas
            </Button>
          </div>
          <div className="space-y-4">
            {commissions.map((c) => (
              <div
                key={c.id}
                className="max-w-[1280px] w-full rounded-xl h-[100px] shadow-sm border bg-white hover:shadow-md transition mx-auto p-4 grid grid-cols-[repeat(4,_1fr)_auto] items-center gap-2"
              >
                {[
                  ["Vendedor", c.sellerName],
                  ["Venda", `R$ ${(c.saleAmountInCents / 100).toFixed(2)}`],
                  [
                    "Comissão",
                    `${c.commissionPercentage}% → R$ ${(c.commissionAmountInCents / 100).toFixed(2)
                    }`,
                  ],
                  ["Data", c.monthYear],
                ].map(([label, value], i) => (
                  <div key={i} className="flex flex-col text-sm">
                    <span className="font-bold text-gray-800">{label}</span>
                    <span className="mt-1 truncate">{value}</span>
                  </div>
                ))}

                <div className="flex flex-col justify-center items-center space-y-2">
                  <CommissionFormDialog
                    title="Editar Comissão"
                    initial={c}
                    onSubmit={async (form) => {
                      await fetch(`${API}/commissions/${c.id}`, {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify(form),
                      });
                      fetchCommissions();
                    }}
                    trigger={
                      <Button
                        size="icon"
                        className="bg-gray-800 hover:bg-gray-950 cursor-pointer"
                        aria-label="Editar comissão"
                      >
                        <Pencil className="w-4 h-4 text-white" />
                      </Button>
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}
