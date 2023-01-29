import React, { useState } from 'react';
import axios from 'axios';
import '../../App.css';

function Game({ rawgID, style, href, src, rating, children }) {
    const [notFound, setNotFound] = useState(false);
    const [saved, setSaved] = useState(false);
    const [method, setMethod] = useState('post');

    try {
        axios.get(`http://127.0.0.1:8000/api/games/${rawgID}`).then(() => {
            setSaved(true);
            setMethod('delete');
        })
    } catch {
        setNotFound(true);
    };

    const saveGame = () => {
        axios.post("http://127.0.0.1:8000/api/games/", { rawgID: rawgID, title: children }).then(setSaved(true)).then(setMethod('delete'));
    };

    const deleteGame = () => {
        if (!notFound) {
            axios.delete(`http://127.0.0.1:8000/api/games/${rawgID}`).then(setSaved(false)).then(setMethod('post'));
        };
    };

    return (
        <li className={`${style}`}>
            <div className="rounded-lg">
                <a className="hover:opacity-90" href={href}>
                    <img className="rounded-lg object-cover h-48 w-96" src={src} alt="Imagem" />
                </a>
            </div>
            <div className="text-slate-700">
                {children}
            </div>
            <div className="flex justify-between text-sky-600">
                <div className="flex">
                    <svg viewBox="0 0 20 20" width="26" height="26" fill="currentColor" aria-hidden="true" className="-ml-1 mr-1 stroke-sky-600">
                        <path d="m12 5 2 5h5l-4 4 2.103 5L12 16l-5.103 3L9 14l-4-4h5l2-5Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="font-light text-sm mt-1">{rating}</span>
                </div>
                <button type="submit" onClick={method === 'post' ? saveGame : deleteGame}>
                    <svg viewBox="0 -2 20 20" width="24" height="24" fill={`${saved ? "currentColor" : "none"}`} aria-hidden="true" className="mt-1 mr-1 stroke-sky-600">
                        <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>
        </li>
    );
}

export default Game;