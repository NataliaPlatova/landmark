import React from "react";
import s from "./NewCommentForm.module.scss";
import { CommentListActions } from "../../actions/CommentActions";
import moment from "moment";
import { useDispatch } from "react-redux";

const NewCommentForm = (props) => {
    const { onDismiss, myPoint, myUid } = props;
    const dispatch = useDispatch();

    const makeNewComment = (formElements) => {
        const newComment = {
            id: moment().format(),
            name: formElements[0].value,
            website: formElements[1].value,
            address: {
                geo: {
                    lat: myPoint.lat,
                    lng: myPoint.lng,
                },
            },
            uid: myUid,
        };
        dispatch(CommentListActions.createComment(newComment));
        onDismiss();
    };

    return (
        <>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative p-4 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                makeNewComment(e.target.elements);
                            }}
                            className={s.form}
                        >
                            <input
                                placeholder="Name"
                                className="rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                type="text"
                            />
                            <textarea
                                placeholder="Text"
                                className="rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                type="text"
                            />
                            <div className={s.formClose}>
                                <button onClick={onDismiss}>Close</button>
                                <button type="submit">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default NewCommentForm;
