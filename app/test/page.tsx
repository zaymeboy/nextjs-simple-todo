'use client';
import Popup from "@/components/Popup/Popup";
import { useState } from "react";
export default function test() {
    const [clicked, setClicked] = useState(false);
    function handleClick() {
        setTimeout(() => {
            setClicked(true);
        }, 500);
        setClicked(false);
    }
    return (
        <>
            <button onClick={handleClick} className="bg-black p-2 text-white">popup</button>
            {clicked ? <Popup success={true} message="New task added successfully!" /> : <></>}

        </>
    );
}