import styled from "./Search.module.css";
const Search = () => {
	return(
		<div>
			<form className={styled["search-form"]}>
				<input
					type="search"
					placeholder="Search events"
				/>
				<button>Search</button>
			</form>
		</div>
	)
}
export default Search;