import Link from "next/link";
import classes from "./button.module.css";

const Button = (props) => {
  if (props.link) {
    return (
      <Link href={props.link}>
        {/* add our own anchor tag here for styling purposes only */}
        {/* we don't add the href here as it will be added automatically by the Link component */}
        <a className={classes.btn}>{props.children}</a>
      </Link>
    );
  }

  // if props do not have a "link", then we just pass it as a normal button
  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
