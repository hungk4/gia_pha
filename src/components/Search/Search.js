import "./Search.css"
function Search(props) {
  return (
    <div className="search-component">
      <input type="text" placeholder={props.placeholder} className="search-input p2-r" />
      <span class="material-symbols-outlined">search</span>
    </div>
  );
}

export default Search;
