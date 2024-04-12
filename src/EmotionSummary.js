import { useEffect, useState } from "react";
import styles from "./EmotionSummary.module.css";

export default function EmotionSummary({ emotion }) {
	const [maxEmotionKr, setMaxEmotionKr] = useState("");

	useEffect(() => {
		if (emotion) {
			if (emotion.maxEmotion === "Anger") {
				setMaxEmotionKr("분노");
			} else if (emotion.maxEmotion === "Disgust") {
				setMaxEmotionKr("혐오");
			} else if (emotion.maxEmotion === "Fear") {
				setMaxEmotionKr("두려움");
			} else if (emotion.maxEmotion === "Joy") {
				setMaxEmotionKr("즐거움");
			} else if (emotion.maxEmotion === "Sadness") {
				setMaxEmotionKr("슬픔");
			} else if (emotion.maxEmotion === "Surprise") {
				setMaxEmotionKr("놀람");
			}
		}
	}, [emotion]);

	return (
		<div className={styles.emotion__summary}>
			<a href={`/${emotion.id}`}>
				<h1>{emotion.createdAt}의 감정</h1>
				<p>
					가장 강한 감정 - {maxEmotionKr}: {emotion[emotion.maxEmotion]}%
				</p>
			</a>
		</div>
	);
}
