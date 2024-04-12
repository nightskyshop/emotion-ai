import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import {
	Chart as Chartjs,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	ArcElement,
	Tooltip,
	Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import styles from "./Emotion.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

Chartjs.register(
	ArcElement,
	RadialLinearScale,
	PointElement,
	LineElement,
	Filler,
	Tooltip,
	Legend
);

export default function Emotion() {
	const { id } = useParams();

	const [emotion, setEmotion] = useState();
	const [maxEmotion, setMaxEmotion] = useState("");

	const [data, setData] = useState();

	console.log(id);

	const getData = async () => {
		const docRef = doc(db, "emotions", id);
		const data = await getDoc(docRef);
		setEmotion(data.data());
	};
	console.log(emotion);

	useEffect(() => {
		if (id) {
			getData();
		}
	}, [id]);

	useEffect(() => {
		if (emotion) {
			let max_key = emotion.maxEmotion;
			let backgroundColor;

			if (max_key === "Anger") {
				max_key = "분노";
				backgroundColor = "#C40C0C99";
			} else if (max_key === "Disgust") {
				max_key = "혐오";
				backgroundColor = "#0A684799";
			} else if (max_key === "Fear") {
				max_key = "두려움";
				backgroundColor = "#0C0C0C99";
			} else if (max_key === "Joy") {
				max_key = "즐거움";
				backgroundColor = "#FF980099";
			} else if (max_key === "Sadness") {
				max_key = "슬픔";
				backgroundColor = "#0E46A399";
			} else if (max_key === "Surprise") {
				max_key = "놀람";
				backgroundColor = "#FFC10099";
			}
			setMaxEmotion(max_key);

			setData({
				labels: ["분노", "혐오", "두려움", "즐거움", "슬픔", "놀람"],
				datasets: [
					{
						label: `${emotion.createdAt} 감정 상태`,
						data: [
							emotion.Anger,
							emotion.Disgust,
							emotion.Fear,
							emotion.Joy,
							emotion.Sadness,
							emotion.Surprise,
						],
						borderColor: "#F1B0BC",
						backgroundColor: backgroundColor,
						borderWidth: 1,
					},
				],
			});
		}
	}, [emotion]);

	if (!emotion || !data) return <div>로딩중...</div>;

	return (
		<div className={styles.emotion__chart}>
			<a href="/">
				<FontAwesomeIcon icon={faArrowLeft} />
			</a>

			<h1>
				{emotion.createdAt}에서 <br />
				느껴지는 가장 큰 감정은 <br />
				<i>"{maxEmotion}"</i> 입니다.
			</h1>
			{/* <p>분노: {emotion.Anger}%</p>
			<p>혐오: {emotion.Disgust}%</p>
			<p>두려움: {emotion.Fear}%</p>
			<p>즐거움: {emotion.Joy}%</p>
			<p>슬픔: {emotion.Sadness}%</p>
			<p>놀람: {emotion.Surprise}%</p> */}
			<Radar
				data={data}
				width={"500"}
				height={"500"}
				options={{
					responsive: false,
					maintainAspectRatio: false,
					scales: {
						r: {
							beginAtZero: true,
							min: 0,
							max:
								Math.ceil(
									Math.max(
										emotion.Anger,
										emotion.Disgust,
										emotion.Fear,
										emotion.Joy,
										emotion.Sadness,
										emotion.Surprise
									) / 5
								) * 5,
						},
					},
				}}
			/>
		</div>
	);
}
