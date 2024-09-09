
interface TerminalLoadingProps {
    currentIndex : number,
    messages:string[],
}

const TerminalLoading = ({ messages, currentIndex } : TerminalLoadingProps) => (
    <div id="terminal" className="text-xs space-y-1 p-5 font-semibold">
        {messages.slice(0, currentIndex).map((message, index) => (
            <p key={index}>{message}</p>
        ))}
    </div>
);



export default TerminalLoading;