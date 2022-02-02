import React from 'react';

import s from './Search.module.scss';

class Search extends React.Component {
    render() {
        const { onSearch, uid } = this.props;
        return(
            <input type="text" placeholder="Search" onChange={(e)=>onSearch(e.target.value, uid)}/>
        );
    }
}

export default Search;
