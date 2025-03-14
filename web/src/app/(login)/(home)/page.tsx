import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { KeyRound, User } from "lucide-react";

export default function Home() {
  return (
    <main className="h-screen bg-gradient-to-b from-green-700 to-green-900 flex justify-center items-center">
      <div className="flex-row justify-center bg-gray-100 h-[320px] w-[480px] border border-gray-100 rounded-2xl shadow-sm p-6">
        <div>
          <h1 className="text-2xl font-bold text-center">Girê Representações Login</h1>
        </div>

        <label className="relative px-4 py-3 mt-6 block group">
          <Input type="text" className="pr-10 group-hover:border-gray-500  group-focus-within:border-gray-600" placeholder="Usuário" />
          <User className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-gray-600 group-focus-within:text-gray-600 cursor-pointer" />
        </label>
        <label className="relative px-4 py-3 block group">
          <Input type="password" className="pr-10 group-hover:border-gray-500 group-focus-within:border-gray-600" placeholder="Senha" />
          <KeyRound className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-gray-600 group-focus-within:text-gray-600 cursor-pointer" />
        </label>

        <div className="px-4 py-3 flex justify-center ">
          <Button variant="default" className="w-[200px] bg-green-600 hover:bg-green-900 hover:scale-105">
            Entrar
          </Button>
        </div>
      </div>
    </main>
  );
}
