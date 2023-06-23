import React from "react";
import { v4 as uuidv4 } from "uuid";
import { withCookies } from "react-cookie";

import s from "./HomePage.module.scss";
import CommentList from "../../component/CommentList";
import getCommentsList from "../../services/comments";
import Map from "../../component/Map";
import NewCommentButton from "../../component/NewCommentButton";
import NewCommentForm from "../../component/NewCommentForm";

class HomePage extends React.Component {
    state = {
        activeMarker: "",
        formIsOpened: false,
        commentsList: [],
        filteredComments: [],
        inputMask: "",
        uid: "",
        myUid: "",
        myPoint: {},
    };

    componentDidMount = async () => {
        const comments = await this.getComments();
        const myUid = await this.getCurrentUid();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    commentsList: comments,
                    filteredComments: comments,
                    myUid: myUid,
                    myPoint: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                });
            },
            (error) => alert("Пожалуйста, включите геолокацию", error),
        );
    };

    getComments = async () => {
        const receivedComments = await getCommentsList();
        let comments = [];
        for (let i = 0; i < Object.keys(receivedComments).length; i++) {
            const currentComment = receivedComments[i];
            comments.push({
                ...currentComment,
                address: {
                    ...currentComment.address,
                    geo: {
                        lat: parseFloat(currentComment.address.geo.lat),
                        lng: parseFloat(currentComment.address.geo.lng),
                    },
                },
            });
        }
        return comments;
    };

    getCurrentUid = async () => {
        let currentUuid = this.props.cookies.get("uuid");
        if (!currentUuid) {
            currentUuid = uuidv4();
            this.props.cookies.set("uuid", currentUuid);
        }
        return currentUuid;
    };

    changeActiveMarker = (point) => {
        const activeMarker = {
            ...point,
            address: {
                ...point.address,
                geo: {
                    ...point.address.geo,
                    lat: parseFloat(point.address.geo.lat),
                    lng: parseFloat(point.address.geo.lng),
                },
            },
        };
        this.setState({
            activeMarker: activeMarker,
            formIsOpened: this.state.formIsOpened,
        });
    };

    openForm = () => {
        this.setState({
            activeMarker: this.state.activeMarker,
            formIsOpened: true,
        });
    };
    closeForm = () => {
        this.setState({
            ...this.state,
            formIsOpened: false,
        });
    };

    makeNewComment = (formElements) => {
        const newComment = {
            id: this.state.commentsList.length + 1,
            name: formElements[0].value,
            text: formElements[1].value,
            lat: this.state.myPoint.lat,
            lng: this.state.myPoint.lng,
            uid: this.state.myUid,
        };
        this.state.commentsList.push(newComment);
        this.setState({
            activeMarker: this.state.activeMarker,
            formIsOpened: false,
        });
    };

    changeDisplayedComments = (mask, uid) => {
        let searchedComments = [];
        let usersComments = [];
        let inputMask = new RegExp(`${mask}`);
        if (mask.length !== 0) {
            for (let i = 0; i < this.state.commentsList.length; i++) {
                if (
                    inputMask.test(this.state.commentsList[i].name) ||
                    inputMask.test(this.state.commentsList[i].text)
                ) {
                    searchedComments.push(this.state.commentsList[i]);
                }
            }
        } else {
            searchedComments = this.state.commentsList;
        }

        if (uid.length !== 0) {
            for (let i = 0; i < searchedComments.length; i++) {
                if (uid === searchedComments[i].uid) {
                    usersComments.push(searchedComments[i]);
                }
            }
        } else {
            usersComments = searchedComments;
        }

        this.setState({
            filteredComments: usersComments,
            inputMask: mask,
            uid: uid,
        });
    };
    render() {
        const {
            activeMarker,
            formIsOpened,
            myPoint,
            inputMask,
            commentsList,
            filteredComments,
            uid,
            myUid,
        } = this.state;
        const { cookies } = this.props;
        return (
            <>
                <div className={s.container}>
                    <Map
                        onMarkerClick={this.changeActiveMarker}
                        activeMarker={activeMarker}
                        markersList={commentsList}
                        myPoint={myPoint}
                    />
                    <div className={s.sideBlock}>
                        {formIsOpened ? (
                            <NewCommentForm
                                onFormSubmit={this.makeNewComment}
                                onDismiss={this.closeForm}
                            />
                        ) : (
                            <CommentList
                                activeComment={activeMarker}
                                commentsList={
                                    commentsList.length === filteredComments.length
                                        ? commentsList
                                        : filteredComments
                                }
                                onCommentClick={this.changeActiveMarker}
                                onFiltersChange={this.changeDisplayedComments}
                                inputMask={inputMask}
                                uid={uid}
                                myUid={myUid}
                            />
                        )}
                    </div>
                    {!formIsOpened && <NewCommentButton openFormHandler={this.openForm} />}
                </div>
            </>
        );
    }
}

export default withCookies(HomePage);
