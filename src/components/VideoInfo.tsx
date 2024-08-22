import { IApod } from "../constants/interfaces"

interface IVideoInfoProps {
    data: IApod,
}

const VideoInfo = ({ data }: IVideoInfoProps) => {
    return (<>
        {data.url &&
            <div style={{ height: "100%" }}>
                <div className='imageDiv'>
                    {data.thumbnail_url && <img src={data.thumbnail_url} alt="Vite logo" style={{ maxWidth: "100%" }} />}
                </div>
                <div className='textOverImage'>
                    <h2>{data.title}</h2>
                    <h3>{data.copyright}</h3>
                </div>
                <div style={{ height: "75%", maxWidth: "50%", padding: 0, marginLeft: "auto", marginRight: "auto", border: "1px solid white", justifyContent: "center", }}>
                    <iframe src={data.url} className="videoDiv" style={{ height: "100%", margin: 0 }}></iframe>
                </div>
                <br /><a className='textOverImage' href={data.url} target="_blank">abrir em nova aba</a>
                <p className='textOverImage'>{data.explanation}</p>
            </div>
        }</>)
}

export default VideoInfo