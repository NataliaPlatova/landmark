import React, { useState } from "react";

import s from "./NewCommentButton.module.scss";

const NewCommentButton = (props) => {
    const { openFormHandler } = props;
    const [isShrinked, setIsShrinked] = useState(true);
    return (
        <div className={s.container}>
            <button
                className={s.shrinked}
                onMouseEnter={() => setIsShrinked(false)}
                onMouseLeave={() => setIsShrinked(true)}
                onClick={() => openFormHandler()}
            >
                 +
            </button>
            {!isShrinked && <div>Add new comment</div>}
        </div>
    );
};

export default NewCommentButton;
