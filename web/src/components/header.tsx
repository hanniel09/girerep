import { Button } from "./ui/button";

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
        >
          Clientes
        </Button>
        <Button
          variant="link"
          className="text-stone-600 font-semibold text-2xl cursor-pointer hover:scale-105"
        >
          Relatórios
        </Button>
        <Button
          variant="link"
          className="text-stone-600 font-semibold text-2xl cursor-pointer hover:scale-105"
        >
          Comissões
        </Button>
      </>
    );
 }
  return(
    <div className="p-6 flex justify-between items-center">
      <h1 className="text-4xl font-bold text-stone-700">{title || "Girê Representações"}</h1>
     <div className="flex space-x-4">{renderedButtons}</div>
    </div>
  );
}