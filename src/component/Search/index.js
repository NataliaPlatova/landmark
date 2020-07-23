import React from 'react';

import s from './Search.module.scss';

class Search extends React.Component {
    render() {
        const { onSearch } = this.props;
        return(
            <input type="text" onChange={(e)=>onSearch(e.target.value)}/>
        );
    }
}

export default Search;
