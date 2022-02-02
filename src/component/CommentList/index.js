import React from "react";

import s from "./CommentList.module.scss";
import Comment from "../Comment";
import Search from "../Search";
import FilterCommentsButton from "../FilterCommentsButton";

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
        const { commentsList, activeComment, onCommentClick, onFiltersChange,  inputMask, uid, myUid }=this.props;
        const { commentSelected } = this.state;

        return(
            <div className={s.commentList}>
                <div className={s.filters}>
                    <Search onSearch={onFiltersChange} uid={uid} myUid={myUid}/>
                    <FilterCommentsButton filterClickHandler={onFiltersChange} inputMask={inputMask}  myUid={myUid} />
                </div>
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
