import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './Input.css';

const Input = ({children, className, error, ...others}) => (
  <div>
    <input
      className={classnames('input', className)}
      {...others}
    />
    <div className="input__error">{error}</div>
  </div>
);

Input.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
};


export default Input;