import PropTypes from "prop-types";
import styled from "./Pagination.module.css";
const Pagination = (props) => {
	// 페이지당 3개씩 보여지도록 처리예정 -> 4 / 3 = 1.333 -> 2로 올림 - js
	let pageNumbers = [];
	const endPage =  Math.ceil(props.total / props.postPerPage);
	for(let i=1; i<=endPage; i++){
		pageNumbers.push(i);
	}
	const pageClick = (data) => {
		props.setCurrentPage(data);
	}
	const result = pageNumbers.map((data) => (
			<span
				key={data}
				className={`${styled["pagination__number"]} ${data === props.currentPage ? styled["pagination__number-active"] : "" }`}
				onClick={() => pageClick(data)}
			>
				{data}
			</span>
		));

	const prePage = () => {
		if(props.currentPage !== pageNumbers[0]) {
			props.setCurrentPage(props.currentPage - 1)
		}
	}
	const nextPage = () => {
		if(props.currentPage !== pageNumbers.at(-1)) {
			props.setCurrentPage(props.currentPage + 1)
		}
	}


	return (
		<div className={styled["pagination"]}>
			<div className={styled["pagination__content"]}>
				<div>페이지당 갯수: {props.postPerPage}</div>
				<div>총 글 갯수: {props.total}</div>
				<div>
					<span className={styled["pagination__prev"]} onClick={prePage}>prev</span>
					{result}
					<span className={styled["pagination__next"]} onClick={nextPage}>next</span>
				</div>
			</div>
		</div>
	)
}
Pagination.propTypes = {
	postPerPage: PropTypes.number,
	total: PropTypes.number,
	endPage: PropTypes.number,
	currentPage: PropTypes.number,
	setCurrentPage: PropTypes.func
};
export default Pagination;