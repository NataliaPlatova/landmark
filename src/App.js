import React from 'react';
import s from './App.module.scss';
import CommentList from "./component/CommentList";
import markersList from "./data/markers";
import Map from "./component/Map";
import NewCommentButton from "./component/NewCommentButton";
import NewCommentForm from "./component/NewCommentForm";

let markers = [];
for (let i=0; i<2; i++) {
    markers.push(markersList[i]);
}

class App extends React.Component{
    state = {
        activeMarker: "",
        formIsOpened: false,
        inputMask: "",
    };

    changeActiveMarker = (point) => {
        this.setState({
            activeMarker: point,
            formIsOpened: this.state.formIsOpened,
            inputMask: this.state.inputMask,
        })
    };

    openForm = () => {
        this.setState({
            activeMarker: this.state.activeMarker,
            formIsOpened: true,
            inputMask: this.state.inputMask,
        })
    };

    makeNewComment = (formElements) => {
        const newComment = {
            "id": markers.length+1,
            "name": formElements[0].value,
            "text": formElements[1].value,
            "lat": 20,
            "lng": 37.337844
        };
        markers.push(newComment);
        this.setState({
            activeMarker: this.state.activeMarker,
            formIsOpened: false,
            inputMask: this.state.inputMask,
        });
    };

    changeInputMask = (mask) => {
        this.setState({
            activeMarker: this.state.activeMarker,
            formIsOpened: this.state.formIsOpened,
            inputMask: new RegExp(`${mask}`),
        })
    };

    render() {
        const { activeMarker, formIsOpened, myPoint, inputMask } = this.state;

        let filteredComments=[];
        for(let i=0; i<2; i++) {
            if((inputMask.length!==0) && ((inputMask.test(markers[i].name))||(inputMask.test(markers[i].text)))) {
                filteredComments.push(markers[i]);
            }
        }
        return (
            <div className="App">
                <div className={s.container}>
                    <Map onMarkerClick={this.changeActiveMarker} activeMarker={activeMarker} markersList={inputMask===""? markers:filteredComments} openFormHandler={this.openForm}/>
                    <div className={s.sideBlock}>
                        <NewCommentButton openFormHandler={this.openForm}/>
                        {
                            formIsOpened?
                                <NewCommentForm onFormSubmit={this.makeNewComment}/>:<CommentList
                                    activeComment={activeMarker}
                                    commentsList={inputMask.length===0? markers:filteredComments}
                                    onCommentClick={this.changeActiveMarker}
                                    searchHandler={this.changeInputMask}
                                />

                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
