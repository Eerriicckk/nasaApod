import { useState } from 'react'

const Tootltip = ({ message, children }: { message?: any, children: any }) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <div onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            {children}
            {isHover && message ?
                <div style={{
                    color: 'white',
                    backgroundColor: 'gray',
                    borderRadius: "10px",
                    borderInline: "1px solid white",
                    position: 'absolute',
                    padding: 4
                }}>
                    {message}
                </div>
                : <></>
            }
        </div>
    )
}

export default Tootltip