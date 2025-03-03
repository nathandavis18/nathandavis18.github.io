export function FunctionText({children}, className){
    return(
        <em className={`inline text-yellow-300 ${className}`}>{children}</em>
    )
}

export function CommentText({children}, className){
    return(
        <em className={`inline text-emerald-700 ${className}`}>{children}</em>
    )
}

export function UserVariableType({children}, className){
    return(
        <em className={`inline text-green-300 ${className}`}>{children}</em>
    )
}

export function VariableType({children}, className){
    return(
        <em className={`inline text-sky-500 ${className}`}>{children}</em>
    )
}

export function MacroType({children}, className){
    return(
        <em className={`inline text-purple-600 ${className}`}>{children}</em>
    )
}

export function ControlKeyword({children}, className){
    return(
        <em className={`inline text-fuchsia-400 ${className}`}>{children}</em>
    )
}

export function VariableName({children}, className){
    return(
        <em className={`inline text-blue-400 ${className}`}>{children}</em>
    )
}