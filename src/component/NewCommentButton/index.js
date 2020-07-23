import React from "react";

import s from "./NewCommentButton.module.scss";

class NewCommentButton extends React.Component{
    render() {
        const { openFormHandler } = this.props;
        return(
            <div className={s.container}>
                <button onClick={()=>openFormHandler()}>Add new comment</button>
            </div>
        );
    }
}

export default NewCommentButton;
