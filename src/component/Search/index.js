import React from 'react';

import s from './Search.module.scss';

class Search extends React.Component {
    state={
      value: ""
    };

    typeHandler = (inputValue) => {
      this.setState({
          value: inputValue,
      })
    };

    render() {
        const { onSearch } = this.props;
        const { value } = this.state;
        return(
            <input type="text" value={value} onChange={(e)=>{this.typeHandler(e.target.value); onSearch(e.target.value)}}/>
        );
    }
}

export default Search;
