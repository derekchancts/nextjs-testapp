import classes from './comment-list.module.css';


function CommentList({ comments }) {
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      
      { (Array.isArray(comments) && comments.length > 0)  ? ( comments.map(comment => (
        <li key={comment._id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
        </div>
        </li> 
       )) ) : (<p>No Comments...</p>)
      }

      {/* { comments ? ( comments.map(comment => (
        <li key={comment.id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
        </div>
        </li> 
       )) ) : (<p>No Comments...</p>)
      } */}

      {/* <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li> */}
    </ul>
  );
}

export default CommentList;
