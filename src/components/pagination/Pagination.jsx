import PropTypes from "prop-types";
import styled from "./Pagination.module.css";
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
const Pagination = ({total, postPerPage, setCurrentPage, currentPage}) => {
	// 페이지당 3개씩 보여지도록 처리예정 -> 4 / 3 = 1.333 -> 2로 올림 - js
	let pageNumbers = [];
	const endPage =  Math.ceil(total / postPerPage);
	for(let i=1; i<=endPage; i++){
		pageNumbers.push(i);
	}
	const pageClick = (data) => {
		setCurrentPage(data);
	}
	const result = pageNumbers.map((data) => (
			<span
				key={data}
				className={`${styled["pagination__number"]} ${data === currentPage ? styled["pagination__number-active"] : "" }`}
				onClick={() => pageClick(data)}
			>
				{data}
			</span>
		));

	const prePage = () => {
		if(currentPage !== pageNumbers[0]) {
			setCurrentPage(currentPage - 1)
		}else{
			alert("첫번째 페이지입니다")
		}
	}
	const nextPage = () => {
		if(currentPage !== pageNumbers.at(-1)) {
			setCurrentPage(currentPage + 1)
		}else{
			alert("마지막 페이지입니다")
		}
	}


	return (
		<div className={styled["pagination"]}>
			<div className={styled["pagination__content"]}>
				<div>페이지당 갯수: {props.postPerPage}</div>
				<div>총 글 갯수: {props.total}</div>
				<div>
					<SlArrowLeft className={styled["pagination__prev"]} onClick={prePage} />
					{result}
					<SlArrowRight className={styled["pagination__next"]} onClick={nextPage} />
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