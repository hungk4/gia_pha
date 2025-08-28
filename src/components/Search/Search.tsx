import "./Search.css";

interface SearchProps {
  placeholder?: string;
  icon?:string;
}

function Search(props: SearchProps) {
  return (
    <div className="search-component">
      <input
        type="text"
        placeholder={props.placeholder}
        className="search-input p2-r"
      />
      <span className="material-symbols-outlined">
        {props.icon ? props.icon : "search"}
      </span>
    </div>
  );
}

export default Search;
