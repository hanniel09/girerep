"use client";

import { useState, useEffect, use } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Trash2 } from "lucide-react";
import Header from "../../../components/header";
import ProtectedRoute from "../../../components/ProtectedRoute";
import { useRouter } from "next/navigation";

type User = { id: string; username: string; role: string };

const API = process.env.NEXT_PUBLIC_API_URL;

export default function UserAdminPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuth();
  const { token } = useAuth();

  const [ users, setUsers ] = useState<User[]>([]);
  const [ page, setPage ] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    } else if (!isAdmin) {
      router.replace("/home");
    }
  }, [isAuthenticated, isAdmin]);

  if (!isAuthenticated || !isAdmin) {
    return <div className="flex text-4xl items-center justify-center">Acesso negado </div>;
  }

  async function fetchUsers() {
    const res = await fetch(`${API}/admin/users?page=${page}&size=20`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setUsers(data.content);
    }
  }

  useEffect(() => { if (token) fetchUsers(); }, [token, page]);

  const handleDelete = async (id: string) => {
    await fetch(`${API}/admin/users/${id}`, {
      method: "DELETE", headers: { Authorization: `Bearer ${token}` }
    });
    fetchUsers();
  };

  return (
    <ProtectedRoute>
      <main className="max-w-[1680px] mx-auto p-6">
        <Header />
        <div className="max-w-[1280px] mx-auto p-6">
          <h1 className="text-3xl font-bold mb-4">Gestão de Usuários</h1>
          <div className="flex justify-end mb-4">
            <CreateUserDialog onCreated={fetchUsers} />
          </div>
          <div className="space-y-2">
            {users.map(u => (
              <div key={u.id} className="flex justify-between p-4 border rounded">
                <div>
                  <p><strong>{u.username}</strong> <span className="text-sm">({u.role})</span></p>
                </div>
                <Button variant="destructive" size="icon" onClick={() => handleDelete(u.id)} className="cursor-pointer">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}

function CreateUserDialog({ onCreated }: { onCreated: () => void }) {
  const { token } = useAuth();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"USER" | "ADMIN">("USER");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API}/admin/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ username, password, role })
    });
    if (res.ok) {
      onCreated();
      setOpen(false);
      setUsername(""); setPassword(""); setRole("USER");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">Criar Usuário</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar Novo Usuário</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            required
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)} />
          <Input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)} />
          <select
            className="border rounded px-2 py-1"
            value={role}
            onChange={e => setRole(e.target.value as any)}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          <Button type="submit" className="cursor-pointer">Criar</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
