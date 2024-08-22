import Tootltip from "./Tootltip"

const Button = ({ message, onClick, children }: any) => {
    return (
        <Tootltip message={message}>
            <button onClick={onClick} className="botao">{children}</button>
        </Tootltip>
    )
}

export default Button