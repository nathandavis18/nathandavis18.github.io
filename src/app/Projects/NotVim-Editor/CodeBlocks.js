export default function CodeBlock({children, text = "", linkToFile = null}){
    return(
        <div>
            <div className="h-[30px] bg-zinc-300 text-teal-900 pl-5 font-semibold text-lg">
                {linkToFile != null ? <em><a href={linkToFile} target="_blank">{text}</a></em> : <em>{text}</em>}
            </div>
            <div className="border border-slate-600 py-3 pl-1">
                <code>
                    {children}
                </code>
            </div>
        </div>
    )
}