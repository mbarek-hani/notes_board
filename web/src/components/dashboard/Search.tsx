type SearchProps = {
	search: string;
	handleSearch: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
};

function Search({ search, handleSearch }: SearchProps) {
	return (
		<div className="searchBox">
			<span style={{ fontSize: 16, opacity: 0.7 }}>Search</span>
			<input
				value={search}
				onChange={handleSearch}
				placeholder="user email, role…"
				className="searchInput"
			/>
		</div>
	);
}

export default Search;
