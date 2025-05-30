"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

export type ClientForm = {
  name: string;
  buyer_name: string;
  fantasy_name: string;
  corporate_reason: string;
  email: string;
  phone: string;
  address: string;
  postal_code: string;
};

export function ClientFormDialog(props: {
  trigger: React.ReactNode;
  initial?: Partial<ClientForm>;
  onSubmit: (form: ClientForm) => Promise<void>;
  title: string;
}) {
  const { trigger, initial, onSubmit, title } = props;
  const [form, setForm] = useState<ClientForm>({
    name: "",
    buyer_name: "",
    fantasy_name: "",
    corporate_reason: "",
    email: "",
    phone: "",
    address: "",
    postal_code: "",
    ...initial,
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (initial) {
      setForm(f => ({ ...f, ...initial }));
    }
  }, [initial]);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").substr(0, 11);
    if (digits.length <= 2) {
      return `(${digits}`;
    } else if (digits.length <= 7) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    } else {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      setForm(f => ({ ...f, phone: formatPhone(value) }));
    } else if (name === "postal_code") {
      const digits = value.replace(/\D/g, "");
      let formatted = digits;
      if (digits.length > 5) {
        formatted = `${digits.slice(0, 5)}-${digits.slice(5, 8)}`;
      }
      setForm(f => ({ ...f, postal_code: formatted }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">
            {title}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {[
            { label: "Nome", name: "name", type: "text" },
            { label: "Comprador", name: "buyer_name", type: "text" },
            { label: "Nome Fantasia", name: "fantasy_name", type: "text" },
            { label: "Razão Social", name: "corporate_reason", type: "text" },
            { label: "Email", name: "email", type: "email" },
            {
              label: "Telefone",
              name: "phone",
              type: "tel",
              placeholder: "(XX) XXXXX-XXXX",
            },
            { label: "Endereço", name: "address", type: "text" },
            { label: "CEP", name: "postal_code", type: "text" },
          ].map(field => (
            <Input
              key={field.name}
              type={field.type as any}
              name={field.name}
              value={form[field.name as keyof ClientForm] ?? ""}
              onChange={handleChange}
              placeholder={field.placeholder ?? field.label}
              className="border rounded px-3 py-2"
              required
            />
          ))}
          <Button type="submit" className="cursor-pointer">
            {title.includes("Editar") ? "Atualizar" : "Salvar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
