import React from "react";
import { v4 as uuidv4 } from "uuid";
import { withCookies } from "react-cookie";
import s from "./HomePage.module.scss";
import CommentList from "../../component/CommentList";
import Map from "../../component/Map";
import NewCommentButton from "../../component/NewCommentButton";
import NewCommentForm from "../../component/NewCommentForm";

class HomePage extends React.Component {
    state = {
        activeMarker: "",
        formIsOpened: false,
        filteredComments: [],
        inputMask: "",
        uid: "",
        myUid: "",
        myPoint: {},
    };

    componentDidMount = async () => {
        const myUid = await this.getCurrentUid();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
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

    /*getComments = () => {
        /*const receivedComments = await getCommentsList();
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
    };*/

    getCurrentUid = async () => {
        let currentUuid = this.props.cookies.get("uuid");
        if (!currentUuid) {
            currentUuid = uuidv4();
            this.props.cookies.set("uuid", currentUuid);
        }
        return currentUuid;
    };

    changeActiveComment = (point) => {
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
        this.setActiveMarker(activeMarker);
    };

    changeActiveCommentByMap = (point) => {
        const activeMarker = {
            ...point,
            address: {
                geo: {
                    lat: parseFloat(point.lat),
                    lng: parseFloat(point.lng),
                },
            },
        };
        this.setActiveMarker(activeMarker);
    };

    setActiveMarker = (activeMarker) =>
        this.setState({ ...this.state, activeMarker: activeMarker });

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
            //filteredComments: usersComments,
            inputMask: mask,
            uid: uid,
        });
    };
    render() {
        const { activeMarker, formIsOpened, myPoint, inputMask, uid, myUid } = this.state;
        const { cookies } = this.props;
        return (
            <>
                <div className={s.container}>
                    <Map
                        onMarkerClick={this.changeActiveCommentByMap}
                        activeMarker={activeMarker.address?.geo || undefined}
                        myPoint={myPoint}
                    />
                    <div className={s.sideBlock}>
                        <CommentList
                            activeComment={activeMarker}
                            onCommentClick={this.changeActiveComment}
                            onFiltersChange={this.changeDisplayedComments}
                            inputMask={inputMask}
                            uid={uid}
                            myUid={myUid}
                        />
                    </div>
                    {formIsOpened ? (
                        <NewCommentForm
                            onDismiss={this.closeForm}
                            myPoint={this.state.myPoint}
                            myUid={this.state.myUid}
                        />
                    ) : (
                        <NewCommentButton openFormHandler={this.openForm} />
                    )}
                </div>
            </>
        );
    }
}

export default withCookies(HomePage);
