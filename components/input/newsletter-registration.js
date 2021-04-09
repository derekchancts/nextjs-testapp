import { useRef, useState, useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import classes from './newsletter-registration.module.css';


function NewsletterRegistration() {
  const [isInvalid, setisInvalid] = useState(false)
  const emailRef = useRef();

  const notificationCtx = useContext(NotificationContext);

  
  function registrationHandler(event) {
    event.preventDefault();

     // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API

    const email = emailRef.current.value;

    if (
      !email ||
      email.trim() === '' ||
      !email.includes('@') 
    ) {
      setisInvalid(true);
      return
    };


    // const reqbody = {
    //   email 
    // };


    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter',
      status: 'pending'
    });


    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {'Content-Type': 'application/json'}
    })
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
        message: 'Succesfully registered for newsletter',
        status: 'success'
      });

      // setTimeout(() => {
      //   notificationCtx.hideNotification()
      // }, 3000);

    })
    .catch(err => {
      console.log(err);

      notificationCtx.showNotification({
        title: 'Error',
        message: err.message || 'Something went wrong',
        status: 'error'
      });

      // setTimeout(() => {
      //   notificationCtx.hideNotification()
      // }, 3000);

    }); 

    setisInvalid(false);
    emailRef.current.value = '';
   
  };



  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref = {emailRef}
          />
          <button>Register</button>
        </div>
        {isInvalid && <p>Please enter a valid email address</p>}
      </form>
    </section>
  );
}

export default NewsletterRegistration;
