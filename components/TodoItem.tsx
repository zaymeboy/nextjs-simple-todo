'use client';
import { useState } from "react";

type Todo = {
    text: string;
    editClicked?:()=>void;
    deleteClicked?:()=>void;
    isDone: boolean;
    onChecked:()=>void;
}


export default function TodoItem({text , editClicked , deleteClicked , isDone, onChecked}:Todo) {
    return (
        <>
            <div className="flex justify-between items-center gap-2">
                <div className="flex gap-2 items-center  w-full">
                    <input type="checkbox" checked={isDone} onChange={onChecked}/>
                    <p className={`${isDone ?"line-through decoration-black text-neutral-300" : ""}`}>{text}</p>
                </div>
                <div className="flex gap-2 items-center">
                    <button onClick={editClicked} className="bg-yellow-400 text-white py-1 px-3 rounded">edit</button>
                    <button onClick={deleteClicked} className="bg-red-600 text-white py-1 px-3 rounded">delete</button>
                </div>
            </div>
        </>
    );
}