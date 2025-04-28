import { Button } from "@/components/ui/button";

export default function Homepage() {
  return (
    <main className="max-w-[1680px] mx-auto">
      <div className="p-6 flex justify-between items-center">
        <h1 className="text-4xl font-bold text-stone-700">Girê Representações</h1>
        <div className="flex space-x-4">
          <Button variant="link" className="text-stone-600 font-semibold text-2xl cursor-pointer hover:scale-105">
            Clientes
          </Button>
          <Button variant="link" className="text-stone-600 font-semibold text-2xl cursor-pointer hover:scale-105">
            Relatórios
          </Button>

          <Button variant="link" className="text-stone-600 font-semibold text-2xl cursor-pointer hover:scale-105">
            Comissões
          </Button>
        </div>
      </div>
      <div className="px-4 py-2 flex flex-col w-full">
        <div className="p-1">
          <Button variant="link" className="text-stone-700 text-2xl font-semibold cursor-pointer hover:scale-105">Últimos Clientes Cadastrados</Button>
        </div>
        <div className="py-3">
          <div className="border-1 border-gray-100 bg-gray-200 h-[480px] w-full rounded-lg shadow-sm">
            <div className="flex flex-col p-3 gap-5">
              <div className="flex justify-between items-center h-15 border-1 border-white px-2">
                hello world
              </div>
              <div className="flex justify-between items-center h-15 border-1 border-white px-2">
                hello world
              </div>
              <div className="flex justify-between items-center h-15 border-1 border-white px-2">
                hello world
              </div>
              <div className="flex justify-between items-center h-15 border-1 border-white px-2">
                hello world
              </div>
              <div className="flex justify-between items-center h-15 border-1 border-white px-2">
                hello world
              </div>
              <div className="flex justify-between items-center h-15 border-1 border-white px-2">
                hello world
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-2 flex flex-col w-full">
        <div>
          <Button variant="link" className="text-stone-700 text-2xl font-semibold cursor-pointer hover:scale-105">Últimos Relatórios Gerados</Button>
        </div>
        <div className="py-3">
          <div className="border-1 border-gray-100 bg-gray-200 h-[320px] max-w-[1680px] rounded-lg shadow-sm">
            <div className="flex flex-col p-3 gap-5">
              <div className="flex justify-between items-center h-15 border-1 border-white px-2">
                Hello world
              </div>
              <div className="flex justify-between items-center h-15 border-1 border-white px-2">
                Hello world
              </div>
              <div className="flex justify-between items-center h-15  border-1 border-white px-2">
                Hello world
              </div>
              <div className="flex justify-between items-center h-15 border-1 border-white px-2">
                Hello world
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className="px-4 py-2 flex flex-col w-full">
        <div className="py-3">
          <Button variant="link" className="text-stone-700 text-2xl font-semibold cursor-pointer hover:scale-105">Últimas Comissões Geradas</Button>
        </div>
        <div className="border-1 border-gray-100 bg-gray-200 h-[320px] max-w-[1680px] rounded-lg shadow-sm">
          <div className="flex flex-col p-3 gap-5">
            <div className="flex justify-between items-center h-15 border-1 border-white px-2">
              Hello world
            </div>
            <div className="flex justify-between items-center h-15 border-1 border-white px-2">
              Hello world
            </div>
            <div className="flex justify-between items-center h-15 border-1 border-white px-2">
              Hello world
            </div>
            <div className="flex justify-between items-center h-15 border-1 border-white px-2">
              Hello world
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}