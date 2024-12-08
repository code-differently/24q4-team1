import Image from "next/image";
import guy from "./img-assets/coolguy.png";
import StartShoppingButton from "./ui/start-shopping-button";
export default function Hero() {
    return (
        <div id="hero-div" className="bg-[var(--zenteal)] h-[550px] w-full relative z-0 overflow-hidden md:h-[600px]">
            <div id="parallellogram-behind-person" className="w-[900px] h-[450px] skew-x-[-20deg] bg-[#ffd700] absolute top-1/2 -right-20 -translate-y-1/2 translate-x-1/4 rounded-2xl z-8 md:translate-x-[50px]"></div>
            <p className="font-medium text-white absolute text-7xl translate-y-[65px] z-10 md:translate-x-[100px] lg:translate-x-[400px]">END OF YEAR</p>
            <div id="parallellogram-sale" className="w-[288px] h-[120px] skew-x-[-20deg] bg-[#e10531] translate-y-[70px] absolute rounded-2xl z-10 md:translate-x-[-200px] lg:translate-x-[866px]">
                <p className="font-medium text-white text-8xl translate-y-[10px] skew-x-[20deg] md:translate-x-[50px] lg:translate-x-[35px]">SALE</p>
            </div>
            <div id="circle" className="w-[200px] h-[200px] bg-[#000] absolute rounded-full translate-y-[200px] z-10 lg:translate-x-[860px]">
                <p className="font-medium text-white text-8xl translate-y-[52px] translate-x-[16px]">OFF</p>
            </div>
            <div id="parallellogram-dark" className="w-[740px] h-[280px] skew-x-[-20deg] bg-[#004c4c] absolute rounded-2xl translate-y-[60%]  z-8 lg:translate-x-[350px]">
                <p className="font-semibold text-white skew-x-[20deg] translate-y-[20px] text-4xl lg:translate-x-[21px]">UP TO</p>
                <p className="font-medium text-white absolute skew-x-[20deg] text-[1500%] translate-y-[-70px] z-10 lg:translate-x-[50px]">50%</p>
            </div>
            <Image src={guy} alt="guy" className="absolute drop-shadow-[5px_0_5px_rgba(0,0,0,0.5)] left-1/2 top-1/2 translate-x-[250px] -translate-y-[295px] z-20" width={520} height={520} />
            <StartShoppingButton />
        </div>
    );
}