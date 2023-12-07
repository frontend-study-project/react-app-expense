import PropTypes from "prop-types";
import styled from "./Pagination.module.css";
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import {useEffect, useState} from "react";
const Pagination = () => {
	// pagination
	const DUMMY_EXPENSES = [
		{
			id: "e1",
			type: "outcome", // type 추가
			category: "쇼핑",
			title: "Toilet Paper",
			amount: 94.12,
			date: new Date(2020, 7, 14),
		},
		{
			id: "e2",
			type: "outcome",
			category: "쇼핑",
			title: "New TV",
			amount: 799.49,
			date: new Date(2021, 2, 12),
		},
		{
			id: "e3",
			type: "outcome",
			category: "보험",
			title: "Car Insurance",
			amount: 294.67,
			date: new Date(2021, 2, 28),
		},
		{
			id: "e4",
			type: "outcome",
			category: "쇼핑",
			title: "New Desk (Wooden)",
			amount: 450,
			date: new Date(2021, 5, 12),
		}
	];
	const [item, setItem] = useState(DUMMY_EXPENSES);
	const total = item.length
	const postPerPage = 3; //페이지당 글갯수
	const [currentPage, setCurrentPage] = useState(1); //현재 페이지
	const [currentPageItem, setCurrentPageItem] = useState(DUMMY_EXPENSES);
	useEffect(() => {
		// 현재페이지에 표시할 시작인덱스와 끝인덱스
		// 0,1,2 -> 1페이지
		// 3,4,5 -> 2페이지
		// 6,7,8 -> 3페이지
		if(item) {
			const startIndex = (currentPage - 1) * postPerPage;
			const endIndex = startIndex + postPerPage;
			setCurrentPageItem(item.slice(startIndex, endIndex));
		}
	}, [currentPage, item, postPerPage]);


	// 페이지당 3개씩 보여지도록 처리예정 -> 17 / 3 = 5.666 -> 6로 올림 - js
	const endPage =  Math.ceil(total / postPerPage); // 마지막 페이지
	const pageGroupSize = 5; // 한 그룹당 표시할 페이지 개수
	// 1/5, 2/5, 3/5, 4/5, 5/5 -> 그룹 1
	// 6/5, 7/5, 8/5, 9/5, 10/5 -> 그룹 2
	const currentPageGroup = Math.ceil(currentPage / pageGroupSize);
	// 현재 페이지가 속한 페이지 그룹의 첫번째페이지넘버
	const startPageNum = (currentPageGroup - 1) * pageGroupSize + 1;
	// 현재 페이지가 속한 페이지 그룹의 마지막페이지넘버
	const endPageNum = Math.min(startPageNum + pageGroupSize - 1, endPage);
  // 현재 페이지 그룹에서 보여질 페이지 번호를 나타내는 배열
	//const pageNumbers = Array.from({ length: endPageNum - startPageNum + 1 }, (_, index) => startPageNum + index);
	const pageNumbers = [];
	for (let i = startPageNum; i <= endPageNum; i++) {
		pageNumbers.push(i);
	}

	const pageClick = (data) => {
		setCurrentPage(data);
	}

	const prePage = () => {
		if(currentPage !== pageNumbers[0] || currentPageGroup > 1) {
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
				{/*<div>총 글 갯수: {total}</div>*/}
				<div>
					<SlArrowLeft className={`${styled["pagination__prev"]} ${currentPage === 1? styled["pagination__prev-grey"] : ""}`} onClick={prePage} />
					{
						pageNumbers.map((data) => (
							<span
								key={data}
								className={`${styled["pagination__number"]} ${data === currentPage ? styled["pagination__number-active"] : "" }`}
								onClick={() => pageClick(data)}
							>
								{data}
							</span>
						))
					}
					<SlArrowRight className={`${styled["pagination__next"]} ${currentPage === endPage? styled["pagination__prev-grey"] : ""}`} onClick={nextPage} />
				</div>
				<div className={styled["pagination__current"]}>
					<span>{currentPage}</span>
					/
					<span>{endPage}</span>
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