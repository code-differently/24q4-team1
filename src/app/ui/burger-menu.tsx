export default function BurgerMenu() {
    return (
        <div className="flex">
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#fff"
            className="w-7 h-9 ml-2 mr-2 cursor-pointer "
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
            />
        </svg>
        </div>
    );
}