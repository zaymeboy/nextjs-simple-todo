type PopupProp={
    success: boolean;
    message: string;
}

export default function Popup({success, message}: PopupProp){

    return(
        <>
        <div className="absolute bottom-5 right-5 overflow-hidden">
            <div className={`bg-white p-4 border-1 rounded-lg border-neutral-300 test`}>
                <p className="text-neutral-700 ">Notification</p>
                <p className={`text-base font-light ${success ? "text-green-500": "text-red-500"}`}>{message}</p>
            </div>
        </div>
        </>
    );
}