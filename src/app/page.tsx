import Image from "next/image";
import NavLinks from "./ui/nav-links";
import BurgerMenu from "./ui/burger-menu";
import logo from "./img-assets/zenshop-white.png";
import Hero from "./hero";

export default function Home() {
  return (
    <div>
      <main className="relative">
        <div id="nav-div" className="flex justify-between w-full absolute z-10">
          <NavLinks/>
          <Image src={logo} alt="logo" className="flex-shrink-0 pl-4" width={150} />
          <BurgerMenu />
        </div>
        <Hero />
      </main>
    </div>
  );
}