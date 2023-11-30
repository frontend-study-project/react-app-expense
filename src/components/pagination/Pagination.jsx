import PropTypes from "prop-types";
import styled from "./Pagination.module.css";
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
const Pagination = ({total, postPerPage, setCurrentPage, currentPage}) => {
	// 페이지당 3개씩 보여지도록 처리예정 -> 4 / 3 = 1.333 -> 2로 올림 - js
	const endPage =  Math.ceil(total / postPerPage);
	const pageGroupSize = 5; // 한 그룹당 표시할 페이지 개수
	// 1/5, 2/5, 3/5, 4/5, 5/5 -> 그룹 1
	// 6/5, 7/5, 8/5, 9/5, 10/5 -> 그룹 2
	const currentPageGroup = Math.ceil(currentPage / pageGroupSize);
	const startPage = Math.max((currentPageGroup - 1) * pageGroupSize + 1, 1);
	const endPageGroup = Math.min(startPage + pageGroupSize - 1, endPage);
	const pageNumbers = Array.from({ length: endPageGroup - startPage + 1 }, (_, index) => startPage + index);

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
		} else if(currentPageGroup > 1){
			// 현재 페이지가 그룹의 첫 페이지이면서 그룹이 첫 번째 그룹이 아닌 경우에만 이전 그룹으로 이동
			setCurrentPage(currentPage - 1)
		} else{
			alert("첫번째 페이지입니다")
		}
	}
	const nextPage = () => {
		if(currentPage !== endPage) {
			setCurrentPage(currentPage + 1)
		}else{
			alert("마지막 페이지입니다")
		}
	}


	return (
		<div className={styled["pagination"]}>
			<div className={styled["pagination__content"]}>
				{/*<div>페이지당 갯수: {postPerPage}</div>*/}
				{/*<div>총 글 갯수: {total}</div>*/}
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