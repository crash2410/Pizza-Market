import classNames from "classnames";
import PropTypes from "prop-types";

function Button({onClick, className, children, outline}) {
    return (
        <button
            onClick={onClick}
            href="/cart.html"
            className={classNames('button', className, {'button-outline': outline})}>{children}
        </button>
    );
}

Button.propType = {
    onclick: PropTypes.func,
    className: PropTypes.string,

}
export default Button;