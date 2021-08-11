import React from 'react';
import styles from './Comments.module.css';
import { getPublishedTime } from "../../common/getPublishedTime";

const Comments = ({comments}) => {
    return(
        <ul className={styles.container}>
            {

                comments.map(comment => {
                    const {authorProfileImageUrl,authorDisplayName, publishedAt, textDisplay, likeCount} = comment.snippet.topLevelComment.snippet;

                    return(
                        <li key={comment.id}>
                            <a href="#" className={styles.channel_logo}>
                                <img src={authorProfileImageUrl} alt="channel logo"/>
                            </a>
                            <div className={styles.metadata}>
                                <div className={styles.txt_wrap}>
                                    <a href="#" className={styles.channel_name}>
                                       {authorDisplayName}
                                    </a>
                                    <span>{getPublishedTime(publishedAt)}</span>
                                    <p>{textDisplay}</p>
                                </div>
                                <div className={styles.btn_wrap}>
                                    <button><i className="fas fa-thumbs-up"></i></button>
                                    <span>{likeCount}</span>
                                    <button><i className="fas fa-thumbs-down"></i></button><span></span>
                                </div>
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    )
};

export default Comments;