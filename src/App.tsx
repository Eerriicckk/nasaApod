import { useEffect, useState } from 'react'
import './App.css'

function App() {
	const [datePick, setDatePick] = useState("none")
	const [urlImage, setUrlImage] = useState("");
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
			setUrlImage(data.hdurl)
			console.log(data)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		const dataAtu = new Date();
		setDatePick(dataAtu.toISOString().split('T')[0])
	}, [])
//2024 August 11
//2022 January 25
	return (
		<>
			<div style={{
				position: 'absolute',
				display: "flex",
				zIndex: "-100",
				justifyContent: "center",
				top: 0,
				left: 0,
				width: "100%"
			}}>
				{urlImage && <img src={urlImage} alt="Vite logo" style={{ maxWidth: "100%" }} />}
			</div>
			{loading ? <p>Carregando</p> :
				<>
					<h1>Aperte para pegar a imagem do dia</h1>
					<div className="card">
						<button onClick={requestExample}>teste api nasa</button>
					</div>
					<div>
						<input type="date" value={datePick} onChange={(e) => setDatePick(e.target.value)} />
					</div>
				</>
			}
		</>
	)
}

export default App
