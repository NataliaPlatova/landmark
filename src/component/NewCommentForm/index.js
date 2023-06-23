import React from "react";
import s from "./NewCommentForm.module.scss";

class NewCommentForm extends React.Component {
    render() {
        const { onFormSubmit, onDismiss } = this.props;
        return (
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onFormSubmit(e.target.elements);
                }}
                className={s.form}
            >
                <input
                    placeholder="Name"
                    className="rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="text"
                />
                <input
                    placeholder="Text"
                    className="rounded-md border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    type="text"
                />
                <div className={s.formClose}>
                    <button onClick={onDismiss}>Close</button>
                    <button type="submit">Add</button>
                </div>
            </form>
        );
    }
}
export default NewCommentForm;
