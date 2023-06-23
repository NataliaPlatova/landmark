import React, { useState } from "react";

import s from "./NewCommentButton.module.scss";

const NewCommentButton = (props) => {
    const { openFormHandler } = props;
    const [isShrinked, setIsShrinked] = useState(true);
    return (
        <div className={s.container}>
            {!isShrinked && (
                <div className={s.tooltip}>
                    <span>Add new comment</span>
                </div>
            )}
            <button
                className={s.shrinked}
                onMouseEnter={() => setIsShrinked(false)}
                onMouseLeave={() => setIsShrinked(true)}
                onClick={() => openFormHandler()}
            >
                +
            </button>
        </div>
    );
};

export default NewCommentButton;
