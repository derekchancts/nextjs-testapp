import { useState, useEffect, useContext } from 'react';
import NotificationContext from '../../store/notification-context';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';


function Comments(props) {
  const { eventId } = props;

  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  

  useEffect(() => {
    if(showComments) {
      setIsFetchingComments(true);
      fetch('/api/comments/' + eventId)
        .then(response => response.json())
        .then(data => {
          setComments(data.comments);
          setIsFetchingComments(false);
        })
    }
  }, [showComments])


  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);

    // (OPTION) - CAN FETCH COMMENTS HERE
    // if(!showComments) {
    //   fetch('/api/comments/' + eventId)
    //   .then()
    // }
  };


  function addCommentHandler(commentData) {

    notificationCtx.showNotification({
      title: 'Sending...',
      message: 'Posting Comments',
      status: 'pending'
    });

    // send data to API
    fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: { 'Content-Type': 'application/json' }
    })
    // .then(response => response.json())
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      // FETCH - ERROR HTTP CODE (STATUS 400 AND 500 ETC) WILL NOT CAUSE THE PROMISE TO FAIL
      // STATUS 400 AND 500 WILL NOT BE CATCHED IF WE HAVE AN ERROR. SO, WE NEED TO IMPLEMENT THE BELOW MANUALLY
      // THEN RETURN THE BELOW PROMISE CHAIN
      // THEN WE WILL BE PASSED TO THE "CATCH" IF WE DO HAVE AN ERROR
      return response.json().then(data => {
        throw new Error(data.message || 'Something went wrong');
      });
    })
    .then(data => {
      console.log(data);

      notificationCtx.showNotification({
        title: 'Success!',
        message: 'Succesfully adding the comment',
        status: 'success'
      });
    })
    .catch(err => {
      console.log(err);

      notificationCtx.showNotification({
        title: 'Error',
        message: err.message || 'Something went wrong',
        status: 'error'
      });
    })

  };


  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
      {/* {showComments && !isFetchingComments && <CommentList comments={comments} />} */}
      {/* {showComments && isFetchingComments && <p>Loading...</p>} */}
    </section>
  );
} 

export default Comments;
