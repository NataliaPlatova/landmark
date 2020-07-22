import React from "react";

import s from "./CommentList.module.scss";
import Comment from "../Comment";

class CommentList extends React.Component{
    render() {
        const{commentsList}=this.props;
        return(
            <div className={s.commentList}>
                {
                    commentsList.map((item) =>
                        <button
                            onClick={()=>console.log(item.id)}
                            className={s.commentTab}
                        >
                            <Comment
                            comment={item}
                            key={item.id}
                        />
                        </button>
                    )
                }
            </div>
        );
    }
}

export default CommentList;
