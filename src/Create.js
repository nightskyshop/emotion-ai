import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import { useEffect, useReducer, useState } from "react";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";
import styles from "./Create.module.css";
import axios from "axios";

export default function Create() {
	const navigate = useNavigate();
	const recorderControls = useAudioRecorder();

	const [loading, setLoading] = useState(false);
	const [count, dispatch] = useReducer((state, action) => {
		if (action === "increment") {
			if (state == 3) return 1;
			else return state + 1;
		}
	}, 1);

	const handleSubmit = async (blob) => {
		setLoading(true);

		const video = document.querySelector(
			`video.${styles.recording__sound_wave}`
		);
		video.pause();
		video.currentTime = 0;

		const uploaded_file = await uploadBytes(
			ref(storage, `audio/${Date.now()}`),
			blob
		);

		const url = await getDownloadURL(uploaded_file.ref);

		let data;

		await axios
			.post("https://lgai.pythonanywhere.com/", {
				url,
			})
			.then((res) => {
				data = res.data;
			})
			.catch(() => {
				alert(
					"음성파일이 너무 짧거나 녹음 환경이 좋지 않습니다. 조용한 곳으로 이동하여 다시 시도해주세요...!"
				);
			});

		setLoading(false);

		if (data) {
			navigate(`/${data.id}`);
		} else {
			navigate("/");
		}
	};

	const handleStart = () => {
		const video = document.querySelector(
			`video.${styles.recording__sound_wave}`
		);
		video.play();

		recorderControls.startRecording();
	};

	const handleStop = () => {
		if (recorderControls.recordingTime < 11) {
			alert("10초 이상을 녹음해주세요");
		} else {
			recorderControls.stopRecording();
		}
	};

	useEffect(() => {
		let timer = setInterval(() => {
			dispatch("increment");
		}, 700);

		return () => clearInterval(timer);
	}, []);

	return (
		<>
			<div className={styles.main}>
				<AudioRecorder
					onRecordingComplete={handleSubmit}
					audioTrackConstraints={{
						noiseSuppression: true,
						echoCancellation: true,
					}}
					recorderControls={recorderControls}
				/>

				<div className={styles.recording__visualization}>
					<video
						name="video"
						loop
						muted
						preload="auto|metadata|none"
						poster="/sound.jpg"
						className={styles.recording__sound_wave}
					>
						<source src="/sound.mp4" type="video/mp4" />
						IE 8 이하는 비디오가 나오지 않습니다. IE 버전을 업데이트 하시길
						바랍니다.
					</video>

					<p className={styles.recording__time}>
						{String(parseInt(recorderControls.recordingTime / 60)).padStart(
							2,
							"0"
						)}
						:{String(recorderControls.recordingTime % 60).padStart(2, "0")}
					</p>
				</div>

				{recorderControls.isRecording ? (
					<div>
						<div>
							<button className={styles.button} onClick={handleStop}>
								녹음 완료하기
							</button>
							<a className={styles.button__cancel} href="/">
								녹음 취소하기
							</a>
						</div>
					</div>
				) : (
					<button className={styles.button} onClick={handleStart}>
						녹음 시작하기
					</button>
				)}
			</div>

			{loading ? (
				<div className={styles.loading}>
					<h1>로딩 중{".".repeat(count)}</h1>
				</div>
			) : null}
		</>
	);
}
