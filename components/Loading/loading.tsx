type LoadingProp= {
    show:boolean;
}
export default function Loading({show}:LoadingProp){
    if (!show) return null;
    return(
        <> 
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="bg-white p-10 rounded-2xl flex flex-col gap-5">
                    <h2 className="font-bold text-xl">LOADING...</h2>
                </div>
            </div>
        </>
    )
}