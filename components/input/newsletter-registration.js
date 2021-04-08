import { useRef, useState } from 'react';
import classes from './newsletter-registration.module.css';


function NewsletterRegistration() {
  const [isInvalid, setisInvalid] = useState(false)
  const emailRef = useRef();

  
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


    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err)) 

    setisInvalid(false);
    emailRef.current.value = '';
   
  }



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
