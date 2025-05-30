"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

interface HeaderProps {
  title?: string;
  buttonQuant?: number;
  buttonTitles?: string[];
}

export default function Header ({
  title,
  buttonQuant,
  buttonTitles,
  ...props
}: HeaderProps){
  const router = useRouter();
  const { logout } = useAuth();

  let renderedButtons;

  if (buttonTitles && buttonTitles.length > 0 && buttonQuant) {
    renderedButtons = buttonTitles.slice(0, buttonQuant).map((btnTitle, index) => (
      <Button
        key={index}
        variant="link"
        className="text-stone-600 font-semibold text-2xl cursor-pointer hover:scale-105"
      >
        {btnTitle}
      </Button>
    ));
  } else {
    renderedButtons = (
      <>
        <Button
          variant="link"
          className="text-stone-600 font-semibold text-2xl cursor-pointer hover:scale-105"
          onClick={() => router.push('/clientes')}
        >
          Clientes
        </Button>
        <Button
          variant="link"
          className="text-stone-600 font-semibold text-2xl cursor-pointer hover:scale-105"
          onClick={() => router.push('/comissoes')}
        >
          Comissões
        </Button>
        <Button
          variant="link"
          className="text-red-600 font-semibold text-2xl cursor-pointer hover:scale-105"
          onClick={logout}
        >
          Logout
        </Button>
      </>
    );
 }
  return(
    <div className="p-6 flex justify-between items-center">
      <h1 onClick={() => router.push('/home')} className="text-4xl font-bold text-stone-700 cursor-pointer hover:underline hover:scale-101">{title || "Girê Representações"}</h1>
     <div className="flex space-x-4">{renderedButtons}</div>
    </div>
  );
}