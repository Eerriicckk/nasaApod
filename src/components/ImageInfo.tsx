import { useEffect, useState } from "react"
import { IApod } from "../constants/interfaces"

interface IImageInfoProps {
    data: IApod,
    isHd: boolean
}

const ImageInfo = ({ data, isHd }: IImageInfoProps) => {
    const [image, setImage] = useState<string>("")

    useEffect(() => {
        let imgUrl = data.url;
        if (data.hdurl && isHd) imgUrl = data.hdurl;
        setImage(imgUrl);
    }, [])

    return (
        <div>
            {image &&
                <div id="divTexto" style={{ position: "relative" }}>
                    <div className='imageDiv'>
                        <img src={!data.hdurl ? data.url : data.hdurl} alt="Vite logo" id="imageBackground" />
                    </div>
                    <div className='textOverImage'>
                        <h2>{data.title}</h2>
                        <h3>{data.copyright}</h3>
                    </div>
                    <img src={image} style={{ maxHeight: "500px", border: "3px solid white" }} />
                    <br /><a className='textOverImage' href={image} download target="_blank">BAIXAR</a>
                    <p className='textOverImage'>{data.explanation}</p>
                </div>
            }
        </div>
    )
}

export default ImageInfo