import React from "react";

import s from "./Comment.module.scss";

class Comment extends React.Component {
    render() {
        const {comment} = this.props;
        return(
            <div className={s.comment}>
                <span className={s.name}>{comment.name}</span>
                <p>{comment.text}</p>
            </div>
        );
    }
}

export default Comment;
