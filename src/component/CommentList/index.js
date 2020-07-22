import React from "react";

import s from "./CommentList.module.scss";
import Comment from "../Comment";

class CommentList extends React.Component{

    render() {
        const { commentsList, activeComment }=this.props;
        return(
            <div className={s.commentList}>
                {
                    commentsList.map((item) =>
                        <button
                            onClick={()=>console.log(item.id)}
                            className={
                                activeComment===item.id? `${s.commentTab} ${s.commentTab_active}`:`${s.commentTab}`
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
