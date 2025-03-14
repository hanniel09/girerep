import { Button } from "@/components/ui/button";

export default function Homepage() {
  return (
    <main className="max-w-[1680px] mx-auto">
      <div className="p-6 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-stone-700">Girê Representações</h1>
        <div className="flex space-x-4">
          <Button variant="default" className="bg-green-600 hover:bg-green-900 hover:scale-105">
            Clientes
          </Button>
          <Button variant="default" className="bg-green-600 hover:bg-green-900 hover:scale-105">
            Relatórios
          </Button>

          <Button variant="default" className="bg-green-600 hover:bg-green-900 hover:scale-105">
            Comissões
          </Button>

        </div>
      </div>
    </main>
  );
}