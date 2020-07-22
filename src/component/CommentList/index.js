import React from "react";

import s from "./CommentList.module.scss";
import Comment from "../Comment";
import NewCommentButton from "../NewCommentButton";

class CommentList extends React.Component{
    state = {
        commentSelected: "",
    };

    componentDidUpdate(prevProps) {
        if (prevProps.activeComment !== this.props.activeComment) {
            this.changeSelectedComment(this.props.activeComment);
        }
    }

    changeSelectedComment = (comment) => {
        this.setState({
            commentSelected: comment,
        })
    };

    render() {
        const { commentsList, activeComment, onCommentClick }=this.props;
        const { commentSelected } = this.state;
        return(
            <div className={s.commentList}>
                {
                    commentsList.map((item) =>
                        <button
                            onClick={()=>onCommentClick(item)}
                            className={
                                commentSelected.id===item.id? `${s.commentTab} ${s.commentTab_active}`:`${s.commentTab}`
                            }
                            key={item.id}
                        >
                            <Comment
                            comment={item}
                        />
                        </button>
                    )
                }
            </div>
        );
    }
}

export default CommentList;
