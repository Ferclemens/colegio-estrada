import "./Button.css";

function Button({ children, secondary = false, href }) {

  return href ? (
    <a id='btn-a' className="button-link" href={href}>
      {children}
    </a>
  ) : (
    <button className="button-link">{children}</button>
  );
}

export default Button;