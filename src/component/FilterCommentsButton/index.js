import React from 'react';

import s from "./FilterCommentsButton.module.scss";

class FilterCommentsButton extends React.Component {
    state = {
        allCommentsDisplayed: true
    };

    changeFiltersState = () => {
      this.setState({
          allCommentsDisplayed: !this.state.allCommentsDisplayed
      })
    };

    render() {
        const { allCommentsDisplayed } = this.state;
        const { filterClickHandler, inputMask, myUid } = this.props;
        return(
            <button className={s.filterButton}
                onClick={()=>{this.changeFiltersState();
                allCommentsDisplayed? filterClickHandler(inputMask, myUid):filterClickHandler(inputMask, "")}}>
                {allCommentsDisplayed?"My comments":"All comments"}
            </button>
        );
    }
}

export default FilterCommentsButton;
