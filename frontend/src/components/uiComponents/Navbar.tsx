import { GithubIcon } from "../icons/GithubIcon";

export const Navbar = () => {
    return (
        <div className="flex justify-center items-center h-14">
            <div className="w-[1100px] justify-between items-center flex">
                <p className="font-bold text-lg">EasySudoku</p>
                <a
                    href="https://github.com/dgox16/easySudoku"
                    rel="noopener noreferrer"
                    target="_blank"
                    className="hover:brightness-125 hover:scale-105 transition"
                >
                    <GithubIcon />
                </a>
            </div>
        </div>
    );
};
