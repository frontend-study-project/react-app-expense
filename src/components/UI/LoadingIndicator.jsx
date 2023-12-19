import styled from "./LoadingIndicator.module.css";
export default function LoadingIndicator() {
	return (
		<div className={styled["loading"]}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}
