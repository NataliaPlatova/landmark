import React from "react";

import s from "./Comment.module.scss";

class Comment extends React.Component {
    render() {
        const { comment } = this.props;
        return (
            <div className="group relative flex flex-col gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                <span className={s.name}>{comment.name}</span>
                <p>{comment.website}</p>
            </div>
        );
    }
}

export default Comment;
