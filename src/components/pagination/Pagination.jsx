import PropTypes from "prop-types";
import styled from "./Pagination.module.css";
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { useFetchItems } from "../../hooks/useItems.js";

const Pagination = ({ currentPage, setCurrentPage }) => {
	const { data: items } = useFetchItems();
	const postPerPage = 3;

	const endPage = Math.ceil(items.length / postPerPage);
	const pageGroupSize = 5;
	const currentPageGroup = Math.ceil(currentPage / pageGroupSize);
	const startPageNum = (currentPageGroup - 1) * pageGroupSize + 1;
	const endPageNum = Math.min(startPageNum + pageGroupSize - 1, endPage);
	const pageNumbers = Array.from({ length: endPageNum - startPageNum + 1 }, (_, index) => startPageNum + index);

	const pageClick = (data) => {
		setCurrentPage(data);
	};

	const prePage = () => {
		if (currentPage !== pageNumbers[0] || currentPageGroup > 1) {
			setCurrentPage(currentPage - 1);
		} else {
			alert("This is the first page");
		}
	};

	const nextPage = () => {
		if (currentPage !== endPage) {
			setCurrentPage(currentPage + 1);
		} else {
			alert("This is the last page");
		}
	};

	return (
		<div className={styled["pagination"]}>
			<div className={styled["pagination__content"]}>
				<SlArrowLeft className={`${styled["pagination__prev"]} ${currentPage === 1 ? styled["pagination__prev-grey"] : ""}`} onClick={prePage} />
				{pageNumbers.map((data) => (
					<span
						key={data}
						className={`${styled["pagination__number"]} ${data === currentPage ? styled["pagination__number-active"] : ""}`}
						onClick={() => pageClick(data)}
					>
            {data}
          </span>
				))}
				<SlArrowRight className={`${styled["pagination__next"]} ${currentPage === endPage ? styled["pagination__prev-grey"] : ""}`} onClick={nextPage} />
			</div>
			<div className={styled["pagination__current"]}>
				<span>{currentPage}</span>
				/
				<span>{endPage}</span>
			</div>
		</div>
	);
};

Pagination.propTypes = {
	currentPage: PropTypes.number,
	setCurrentPage: PropTypes.func
};

export default Pagination;
