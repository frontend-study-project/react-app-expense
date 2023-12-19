import { useState } from "react";
import styled from "./Search.module.css";
import { useFetchItems } from "../../hooks/useItems.js";
const Search = ({ searchItems }) => {
	const [ searchValue, setSearchValue ] = useState("");
	const inputChangeHandler = (e) => {
		setSearchValue(e.target.value)
	}
	const searchButtonClickHandler = (e) => {
		e.preventDefault();
		searchItems(searchValue);
	}
	return(
		<div>
			<form className={styled["search-form"]} onSubmit={searchButtonClickHandler}>
				<input
					type="search"
					placeholder="Search Expenses"
					onChange={inputChangeHandler}
				/>
				<button type="submit">Search</button>
			</form>
		</div>
	)
}
export default Search;