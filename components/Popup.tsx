import { useState } from "react";
type PropPopup = {
    isOpen: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>)=>void;
    actionClose: () => void;
    actionEdit:()=>void;
}

export default function Popup({isOpen, value, onChange,actionClose ,actionEdit}:PropPopup) {
    if (!isOpen) return null;
    return (
        <>
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="w-screen bg-white py-10 px-5 mx-5 rounded-2xl flex flex-col gap-5">
                    <h2 className="font-bold text-2xl">Edit Tasks</h2>
                    <div className=" flex justify-between items-center gap-2 ">
                        <input type="text" value={value} onChange={onChange} className="border-1 border-neutral-300 rounded py-2 px-4 w-full" />
                        <div className="flex justify-center gap-2">
                            <button onClick={actionEdit} className="bg-green-500 text-white py-2 px-4 rounded">Confirm</button>
                            <button onClick={actionClose} className="bg-red-500 text-white py-2 px-4 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}