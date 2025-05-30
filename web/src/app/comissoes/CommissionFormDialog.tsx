"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

export type CommissionForm = {
  sellerName: string;
  saleAmountInCents: number;
  commissionPercentage: number;
  commissionAmountInCents: number;
  month: number;
  year: number;
};

function formatCurrency(cents: number): string {
  return (cents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function parseCurrency(input: string): number {
  const onlyDigits = input.replace(/\D/g, "");
  return Number(onlyDigits);
}

export function CommissionFormDialog(props: {
  trigger: React.ReactNode;
  initial?: Partial<CommissionForm>;
  onSubmit: (form: CommissionForm) => Promise<void>;
  title: string;
}) {
  const { trigger, initial, onSubmit, title } = props;

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<CommissionForm>({
    sellerName: "",
    saleAmountInCents: 0,
    commissionPercentage: 0,
    commissionAmountInCents: 0,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  useEffect(() => {
    if (open && initial) {
      setForm(f => ({
        ...f,
        ...initial,
      } as CommissionForm));
    }
  }, [open, initial]);

  useEffect(() => {
    const result = Math.round((form.saleAmountInCents * form.commissionPercentage) / 100);
    setForm(f => ({ ...f, commissionAmountInCents: result }));
  }, [form.saleAmountInCents, form.commissionPercentage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "saleAmountInCents") {
      setForm(f => ({ ...f, saleAmountInCents: parseCurrency(value) }));
    } else if (["commissionPercentage", "month", "year"].includes(name)) {
      setForm(f => ({ ...f, [name]: Number(value) }));
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
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            name="sellerName"
            value={form.sellerName}
            onChange={handleChange}
            placeholder="Nome do Vendedor"
            required
          />
          <Input
            name="saleAmountInCents"
            value={formatCurrency(form.saleAmountInCents)}
            onChange={handleChange}
            placeholder="Valor da Venda"
            required
          />
          <Input
            type="number"
            name="commissionPercentage"
            value={form.commissionPercentage}
            onChange={handleChange}
            placeholder="Porcentagem da Comissão (%)"
            required
          />
          <Input
            disabled
            value={formatCurrency(form.commissionAmountInCents)}
            placeholder="Valor da Comissão"
          />
          <Input
            type="number"
            name="month"
            value={form.month}
            onChange={handleChange}
            placeholder="Mês (1-12)"
            min={1}
            max={12}
            required
          />
          <Input
            type="number"
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="Ano"
            required
          />
          <Button type="submit">{title.includes("Editar") ? "Atualizar" : "Salvar"}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
