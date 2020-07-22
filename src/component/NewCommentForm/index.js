import React from "react";

import s from "./NewCommentForm.module.scss";

class NewCommentForm extends React.Component{
    render() {
        const { onFormSubmit } = this.props;
        return(
            <form onSubmit={(e)=>{e.preventDefault(); onFormSubmit(e.target.elements);}}>
                <label>
                    Name
                    <input type="text"/>
                </label>
                <label>
                    Text
                    <input type="text"/>
                </label>
                <button type="submit">Add</button>
            </form>
        );
    }
}
export default NewCommentForm;
