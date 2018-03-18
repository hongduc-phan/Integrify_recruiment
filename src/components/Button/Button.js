import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Button.css';

const Button = ({
  primary,
  children,
  className,
  ...others
}) => (
  <button
    className={classnames('btn', className, {'btn--primary': primary})}
    {...others}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  className: PropTypes.string,
  primary: PropTypes.bool,
};


export default Button;