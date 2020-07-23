import React from "react";

import s from "./CommentList.module.scss";
import Comment from "../Comment";
import Search from "../Search";

class CommentList extends React.Component{
    state = {
        commentSelected: "",
        inputMask: "",
    };

    componentDidUpdate(prevProps) {
        if (prevProps.activeComment !== this.props.activeComment) {
            this.changeSelectedComment(this.props.activeComment);
        }
    }

    changeSelectedComment = (comment) => {
        this.setState({
            commentSelected: comment,
            inputMask: this.state.inputMask,
        })
    };

    render() {
        const { commentsList, activeComment, onCommentClick, searchHandler }=this.props;
        const { commentSelected, inputMask } = this.state;

        return(
            <div className={s.commentList}>
                <Search onSearch={searchHandler}/>
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
