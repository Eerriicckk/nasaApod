import { useEffect, useState } from 'react'
import VideoInfo from './components/VideoInfo'
import ImageInfo from './components/ImageInfo'
import { IApod } from './constants/interfaces'
import NavBar from './components/NavBar'
import Button from './components/Button'
import Loading from './components/Loading'

const emptyApod: IApod = {
	url: "",
	title: "",
	copyright: "",
	explanation: "",
	thumbnail_url: "",
	media_type: "image",
}

function App() {
	const [datePick, setDatePick] = useState("none");
	const [imageInHd, setimageInHd] = useState(true);
	const [infoApod, setInfoApod] = useState<IApod>(emptyApod);
	const [loading, setLoading] = useState(false);
	const keyMock = "2zxglbElMymAqt7X5A0rzt5tnOOivTYOhiRD8b8p";

	const requestExample = async () => {
		const dateToday = new Date();
		const selectedDate = new Date(datePick);
		setLoading(true)
		try {
			if (selectedDate > dateToday) return console.log("data invalida")
			const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${keyMock}&date=${datePick}`);
			const data = await res.json();
			setInfoApod(data);
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		const dataAtu = new Date();
		let dateInString = dataAtu.toLocaleString().split(', ')[0].split('/');
		setDatePick(`${dateInString[2]}-${dateInString[1]}-${dateInString[0]}`)
	}, [])

	useEffect(() => {
		if (datePick === "none") return
		requestExample()
	}, [datePick])

	const changeDate = (amountToChange: number) => {
		console.log(datePick)
		const dataAtu = new Date(datePick + "T00:00:00");
		dataAtu.setDate(dataAtu.getDate() + amountToChange);
		setDatePick(dataAtu.toISOString().split('T')[0])
	}

	//2024 August 11 - video interativo
	//2022 January 25 - video

	console.log(infoApod.media_type)

	return (
		<div className='app'>
			<div style={{ height: "100%" }}>
				<NavBar>
					<h4 className='textOverImage'>Aperte para pesquisar a imagem do dia</h4>
					<div style={{
						display:'flex',
						flexDirection:'row'
					}}>
						<span className='textOverImage'>Data da imagem</span>
						<Button onClick={() => changeDate(-1)} message="anterior">{"<"}</Button>
						<input type="date" value={datePick} onChange={(e) => setDatePick(e.target.value)} />
						<Button onClick={() => changeDate(1)} message="próximo">{">"}</Button>
					</div>

					<div>
						<label>
							<span className='textOverImage'>Imagem em alta definição</span>
							<input type="checkbox" checked={imageInHd} onChange={(e) => setimageInHd(e.target.checked)} />
						</label>
					</div>

					<div>
						<Button onClick={requestExample}>Pesquisar imagem</Button>
					</div>
				</NavBar>
				{loading ? <Loading /> :
					<div style={{ height: "100%" }}>
						{infoApod.url !== "" &&
							<div style={{ height: "100%", textAlign: "center" }}>
								{infoApod.media_type === "image" ?
									<ImageInfo data={infoApod} isHd={imageInHd} />
									:
									<VideoInfo data={infoApod} />
								}
							</div>
						}
					</div>
				}
			</div>
		</div>
	)
}

export default App
