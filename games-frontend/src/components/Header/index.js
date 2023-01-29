import React from 'react';
import HeaderItem from '../HeaderItem';
import '../../App.css';

function Header() {
    return (
        <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md py-4 px-8 font-normal text-lg mx-auto mb-8 grid md:gap-x-20 grid-cols-3 md:grid-cols-5 shadow-xl">
            <a href="#" className="place-self-center w-max">
                <img src="/expand.png" alt="Logo" className="h-12" />
            </a>
            <ul className="flex justify-evenly place-items-center md:col-span-3">
                <HeaderItem href="#" style="hidden md:block">
                    Home
                </HeaderItem>
                <HeaderItem href="#" style="" isActive>
                    Games
                </HeaderItem>
                <HeaderItem href="#" style="hidden md:block">
                    Exemplo
                </HeaderItem>
                <HeaderItem href="#" style="hidden md:block">
                    Teste
                </HeaderItem>
            </ul>
            <a className="col-start-5 place-self-center py-1 px-3 rounded-full bg-sky-600 hover:bg-sky-500 text-white" href="#">
                Login
            </a>
        </div>
    );
}

export default Header;