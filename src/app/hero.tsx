import Image from "next/image";
import guy from "./img-assets/coolguy.png";

export default function Hero() {
    return (
        <div id="hero-div" className="bg-[var(--zengreen)] h-[550px] w-full relative z-0 overflow-hidden">
            <div id="hero-parallellogram" className="w-[65%] h-[75%] skew-x-[-20deg] bg-[#bfdc7f] absolute top-1/2 -right-20 -translate-y-1/2 translate-x-1/4 rounded-2xl z-10"></div>
            <Image src={guy} alt="guy" className="absolute drop-shadow-[5px_0_5px_rgba(0,0,0,0.5)] left-1/2 top-1/2 translate-x-[250px] -translate-y-[293px] z-20" width={500} height={500} />
        </div>
    );
}