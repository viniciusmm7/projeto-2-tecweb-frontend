import React from 'react';
import '../../App.css';

function HeaderItem({ href, isActive, style, children }) {
    return (
        <li>
            <a href={href} className={`py-1 px-3 rounded-full place-self-center ${style} ${isActive ? "bg-slate-200 hover:bg-slate-300" : "hover:bg-slate-200"}`}>{children}</a>
        </li>
    );
}

export default HeaderItem;