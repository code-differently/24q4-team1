import Image from "next/image";
import NavLinks from "./ui/nav-links";
import BurgerMenu from "./ui/burger-menu";
import logo from "./img-assets/zenshop-white.png";
import Hero from "./hero";

export default function Home() {
  return (
    <div>
      <main>
        <div id="nav-div" className="flex justify-between w-full relative bg-[var(--zenteal)]">
          <Image src={logo} alt="logo" className="flex-shrink-0 pl-4" width={150} />
          <NavLinks />
          <BurgerMenu />
        </div>
        <Hero />
      </main>
    </div>
  );
}