"use client";

import { useEffect, useState } from "react";
import { CommissionForm, CommissionFormDialog } from "./CommissionFormDialog";
import { Button } from "../../components/ui/button";
import Header from "../../components/header";
import { useAuth } from "../../hooks/useAuth";
import { Pencil, Search, Trash2 } from "lucide-react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Input } from "../../components/ui/input";

type CommissionResponse = CommissionForm & { id: string };

const API = process.env.NEXT_PUBLIC_API_URL;

export default function CommissionPage() {
  const { token } = useAuth();
  const [commissions, setCommissions] = useState<CommissionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  async function fetchCommissions(q = "") {
    if (!token) return;
    setLoading(true);
    try {
      const url = q
        ? `${API}/commissions/search?query=${encodeURIComponent(q)}&page=0`
        : `${API}/commissions?page=0`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Erro ao buscar comissões");
      const data = await res.json();
      setCommissions(data.content || []);
    } catch {
      setCommissions([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCommissions();
  }, [token]);

  useEffect(() => {
    fetchCommissions(query.trim());
  }, [token, query]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };


  const handleCreate = async (data: CommissionForm) => {
    if (!token) return;

    try {
      const res = await fetch(`${API}/commissions/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Erro ao criar comissão");

      await fetchCommissions();
    } catch (error) {
      console.error("Erro ao enviar comissão:", error);
    }
  };

  const handleEdit = async (id: string, data: CommissionForm) => {
    if (!token) return alert("Você precisa estar logado");

    const res = await fetch(`${API}/commissions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) console.error("Erro ao atualizar comissão");
    await fetchCommissions();
  };

  const handleDelete = async (id: string) => {
    if (!token) return alert("Você precisa estar logado");

    const res = await fetch(`${API}/commissions/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) console.error("Erro ao excluir comissão");
    else setCommissions(comms => comms.filter(c => c.id !== id));
  };

  return (
    <ProtectedRoute>
      <div className="max-w-[1680px] mx-auto p-6">
        <Header />
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-stone-700 ml-10">Comissões</h1>
          <div className="flex items-center space-x-4 mr-10">
            <div className="relative">
              <Input
                placeholder="Procurar comissão"
                value={query}
                onChange={handleSearchChange}
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <CommissionFormDialog
              title="Nova Comissão"
              trigger={<Button className="cursor-pointer">Nova Comissão</Button>}
              onSubmit={handleCreate}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          {loading ? (
            <p className="text-muted-foreground">...</p>
          ) : commissions.length === 0 ? (
            <p className="text-muted-foreground">Nenhuma comissão encontrada.</p>
          ) : (
            <div className="grid gap-4">
              {commissions.map(commission => (
                <div
                  key={commission.id}
                  className="max-w-[1280px] w-full rounded-xl h-[100px] shadow-sm border bg-white hover:shadow-md transition mx-auto"
                >
                  <div className="grid grid-cols-[repeat(5,_1fr)_auto] items-center gap-2 px-4 h-full">
                    {[
                      ["Vendedor", commission.sellerName],
                      ["Valor da Venda", (commission.saleAmountInCents / 100).toFixed(2)],
                      ["Porcentagem da Comissão", `${commission.commissionPercentage}%`],
                      ["Valor da Comissão", (commission.commissionAmountInCents / 100).toFixed(2)],
                      ["Data", commission.monthYear],
                    ].map(([label, value], index) => (
                      <div key={index} className="flex flex-col text-sm">
                        <span className="font-bold text-gray-800">{label}</span>
                        <span className="mt-1 truncate">{value}</span>
                      </div>
                    ))}

                    <div className="flex flex-col justify-center items-center space-y-2">
                      <CommissionFormDialog
                        title="Editar Comissão"
                        trigger={
                          <Button variant="default" size="icon" aria-label="Editar Comissão" className="bg-gray-800 hover:bg-gray-950 cursor-pointer">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        }
                        initial={commission}
                        onSubmit={data => handleEdit(commission.id, data)}
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        aria-label="Excluir Comissão"
                        onClick={() => handleDelete(commission.id)}
                        className="bg-red-700 hover:bg-red-900 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}