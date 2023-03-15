import classNames from "classnames";

function Button({onClick, className, children, outline}) {
    return (
        <button
            onClick={onClick}
            href="/cart.html"
            className={classNames('button', className, {'button-outline': outline})}>{children}
        </button>
    );
}

export default Button;