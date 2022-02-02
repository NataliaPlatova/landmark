import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux'

import s from './HomePage.module.scss';
import CommentList from "../../component/CommentList";
import Map from "../../component/Map";
import NewCommentButton from "../../component/NewCommentButton";
import NewCommentForm from "../../component/NewCommentForm";
import { fetchComments } from '../../data/commentsActions';

class HomePage extends React.Component{
    state = {
        activeMarker: "",
        formIsOpened: false,
        commentsList: [],
        filteredComments: [],
        inputMask: "",
        uid: "",
        myUid: "",
        myPoint: {}
    };


    componentDidMount = async () => {
        this.props.fetchComments();
        const myUid = await this.getCurrentUid();
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState({
                commentsList: this.props.comments,
                filteredComments: this.props.comments,
                myUid: myUid,
                myPoint: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            });
        }, (error) => alert('Пожалуйста, включите геолокацию', error));
    };

    getCurrentUid = async() => {
        let currentUuid = this.props.cookies.get('uuid');
        if (!currentUuid) {
            currentUuid = uuidv4();
            this.props.cookies.set('uuid', currentUuid);
        }
        return currentUuid;
    };


    changeActiveMarker = (point) => {
        const activeMarker = {...point, address: {...point.address, geo: {...point.address.geo, lat: Number(point.address.geo.lat), lng: Number(point.address.geo.lng)}}}
        this.setState({
            activeMarker: activeMarker,
            formIsOpened: this.state.formIsOpened,
        })
    };

    openForm = () => {
        this.setState({
            activeMarker: this.state.activeMarker,
            formIsOpened: true,
        })
    };

    makeNewComment = (formElements) => {
        const newComment = {
            "id": this.state.commentsList.length+1,
            "name": formElements[0].value,
            "text": formElements[1].value,
            "lat": this.state.myPoint.lat,
            "lng": this.state.myPoint.lng,
            "uid": this.state.myUid
        };
        this.state.commentsList.push(newComment);
        this.setState({
            activeMarker: this.state.activeMarker,
            formIsOpened: false,
        });
    };

    changeDisplayedComments = (mask, uid) => {
        let searchedComments=[];
        let usersComments=[];
        let inputMask = new RegExp(`${mask}`);
        if(mask.length!==0){
            for(let i=0; i<this.state.commentsList.length; i++) {
                if((inputMask.test(this.state.commentsList[i].name))||(inputMask.test(this.state.commentsList[i].text))) {
                    searchedComments.push(this.state.commentsList[i]);
                }
            }
        } else {
            searchedComments = this.state.commentsList;
        }

        if(uid.length!==0) {
            for(let i=0; i<searchedComments.length; i++) {
                if(uid===searchedComments[i].uid) {
                    usersComments.push(searchedComments[i]);
                }
            }
        }else {
            usersComments = searchedComments;
        }

        this.setState({
            filteredComments: usersComments,
            inputMask: mask,
            uid: uid
        });
    };
    render() {
        const { activeMarker, formIsOpened, myPoint, inputMask, commentsList, filteredComments, uid, myUid } = this.state;
        const { cookies } = this.props;
        return (
            <>
                <div className={s.container}>
                    <Map onMarkerClick={this.changeActiveMarker}
                         activeMarker={activeMarker}
                         markersList={commentsList}
                         myPoint={myPoint}
                    />
                    <div className={s.sideBlock}>
                        {
                            formIsOpened?"":<NewCommentButton openFormHandler={this.openForm}/>
                        }
                        {
                            formIsOpened?
                                <NewCommentForm onFormSubmit={this.makeNewComment}/>:<CommentList
                                    activeComment={activeMarker}
                                    commentsList={commentsList.length===filteredComments.length? commentsList:filteredComments}
                                    onCommentClick={this.changeActiveMarker}
                                    onFiltersChange={this.changeDisplayedComments}
                                    inputMask={inputMask}
                                    uid={uid}
                                    myUid={myUid}
                                />

                        }
                    </div>
                </div>
            </>
        );
    }
}

const mapDispatchToProps = {
    fetchComments
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments.comments
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(HomePage));
