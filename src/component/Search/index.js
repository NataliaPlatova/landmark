import React from "react";

class Search extends React.Component {
    render() {
        const { onSearch, uid } = this.props;
        return (
            <input
                className="rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="text"
                placeholder="Search"
                onChange={(e) => onSearch(e.target.value, uid)}
            />
        );
    }
}

export default Search;
