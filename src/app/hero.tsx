import Image from "next/image";
import guy from "./img-assets/coolguy.png";
import StartShoppingButton from "./ui/start-shopping-button";
export default function Hero() {
    return (
        <div id="hero-div" className="bg-gradient-to-br from-teal-300 to-teal-600 lg:h-[550px] macairm2:h-[600px] w-full relative z-0 overflow-hidden ">
            <div id="parallellogram-behind-person" className="w-[900px] h-[450px] skew-x-[-20deg] bg-gradient-to-br from-yellow-300 to-yellow-500 absolute top-1/2 -right-20 -translate-y-[210px] translate-x-1/4 rounded-2xl z-8 macairm2:translate-x-[50px]"></div>
            <p className="font-medium text-white absolute lg:text-7xl macairm2:text-6xl lg:translate-y-[80px] macairm2:translate-y-[83px] z-10 macairm2:translate-x-[120px] lg:translate-x-[400px]">END OF YEAR</p>
            <div id="parallellogram-sale" className="lg:w-[288px] macairm2:w-[200px] lg:h-[120px] macairm2:h-[100px] skew-x-[-20deg] bg-gradient-to-br from-red-500 to-red-700 lg:translate-y-[89px] macairm2:translate-y-[90px] absolute rounded-2xl z-10 lg:translate-x-[860px] macairm2:translate-x-[510px]">
                <p className="font-medium text-white lg:text-8xl macairm2:text-7xl lg:translate-y-[10px] macairm2:translate-y-[12px] skew-x-[20deg] macairm2:translate-x-[50px] lg:translate-x-[35px] macairm2:translate-x-[20px]">SALE</p>
            </div>
            <div id="circle" className="lg:w-[200px] macairm2:w-[150px] lg:h-[200px] macairm2:h-[150px] bg-gradient-to-br from-slate-800 to-slate-900 absolute rounded-full lg:translate-y-[200px] macairm2:translate-y-[210px] z-10 lg:translate-x-[860px] macairm2:translate-x-[490px]">
                <p className="font-medium text-white lg:text-8xl macairm2:text-7xl lg:translate-y-[52px] macairm2:translate-y-[42px] lg:translate-x-[16px] macairm2:translate-x-[13px]">OFF</p>
            </div>
            <div id="parallellogram-dark" className="lg:w-[740px] macairm2:w-[580px] h-[280px] skew-x-[-20deg] bg-gradient-to-br from-teal-700 to-teal-800 absolute rounded-2xl translate-y-[60%] z-8 lg:translate-x-[350px] macairm2:translate-x-[70px]">
                <p className="font-semibold text-white skew-x-[20deg] translate-y-[20px] text-4xl lg:translate-x-[21px]">UP TO</p>
                <p className="font-medium text-white absolute skew-x-[20deg] lg:text-[1500%] macairm2:text-[1300%] lg:translate-y-[-70px] macairm2:translate-y-[-50px] z-10 lg:translate-x-[50px] macairm2:translate-x-[30px]">50%</p>
            </div>
            <Image src={guy} alt="guy" className="absolute drop-shadow-[5px_0_5px_rgba(0,0,0,0.5)] left-1/2 top-1/2 lg:translate-x-[250px] macairm2:translate-x-[100px] -translate-y-[280px] z-20" width={520} height={520} />
            <StartShoppingButton />
        </div>
    );
}