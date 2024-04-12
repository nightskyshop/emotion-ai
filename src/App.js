import { db } from "./firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import {
	Chart as Chartjs,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	ArcElement,
	Tooltip,
	Legend,
	CategoryScale,
	LinearScale,
	BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import EmotionSummary from "./EmotionSummary";
import styles from "./App.module.css";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

Chartjs.register(
	ArcElement,
	RadialLinearScale,
	PointElement,
	LineElement,
	BarElement,
	CategoryScale,
	LinearScale,
	Filler,
	Tooltip,
	Legend
);

export default function App() {
	const [emotions, setEmotions] = useState([]);
	const [data, setData] = useState();

	const getData = async () => {
		const queryRef = query(
			collection(db, "emotions"),
			orderBy("createdAt"),
			limit(10)
		);

		const data = await getDocs(queryRef);
		const docsArray = data.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));
		setEmotions(docsArray);
	};

	useEffect(() => {
		getData();
	}, []);

	useEffect(() => {
		if (emotions && emotions.length != 0) {
			console.log(emotions, emotions.length != 0);
			console.log(emotions);

			setData({
				labels: emotions.map((emotion) => emotion.createdAt),
				datasets: [
					{
						label: "감정 데이터",
						data: emotions.map((emotion) => emotion[emotion.maxEmotion]),
						backgroundColor: emotions.map((emotion) => {
							if (emotion.maxEmotion === "Anger") {
								return "#C40C0CD9";
							} else if (emotion.maxEmotion === "Disgust") {
								return "#0A6847D9";
							} else if (emotion.maxEmotion === "Fear") {
								return "#0C0C0CD9";
							} else if (emotion.maxEmotion === "Joy") {
								return "#FF9800D9";
							} else if (emotion.maxEmotion === "Sadness") {
								return "#0E46A3D9";
							} else if (emotion.maxEmotion === "Surprise") {
								return "#FFC100D9";
							}
						}),
					},
				],
			});
		}
	}, [emotions]);

	return (
		<div className={styles.main}>
			<div className={styles.emotion}>
				{data ? (
					<>
						<div className={styles.collor__pallte_list}>
							<div className={`${styles.color__pallte} ${styles.orange}`}></div>
							<p className={`${styles.color__name}`}>즐거움</p>

							<div className={`${styles.color__pallte} ${styles.yellow}`}></div>
							<p className={`${styles.color__name}`}>놀람</p>

							<div className={`${styles.color__pallte} ${styles.green}`}></div>
							<p className={`${styles.color__name}`}>혐오</p>

							<div className={`${styles.color__pallte} ${styles.red}`}></div>
							<p className={`${styles.color__name}`}>분노</p>

							<div className={`${styles.color__pallte} ${styles.blue}`}></div>
							<p className={`${styles.color__name}`}>슬픔</p>

							<div className={`${styles.color__pallte} ${styles.black}`}></div>
							<p className={`${styles.color__name}`}>두려움</p>
						</div>

						<Bar
							options={{
								responsive: true,
								plugins: { legend: { display: false } },
							}}
							data={data}
						/>
					</>
				) : null}

				<a href="/create" className={styles.emotion__create_btn}>
					<FontAwesomeIcon icon={faPen} /> 새로운 감정 기록하기
				</a>

				<h1>최근 감정들</h1>

				<div className={styles.emotion__list}>
					{!emotions || emotions == [] ? (
						<h1>로딩 중...</h1>
					) : (
						emotions.map((emotion) => (
							<EmotionSummary key={emotion.id} emotion={emotion} />
						))
					)}
				</div>
			</div>
		</div>
	);
}
