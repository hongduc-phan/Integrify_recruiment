import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Table.css';

const Table = ({className, children, ...others}) => (
  <table
    {...others}
    className={classnames('table', className)}>
    {children}
  </table>
);

Table.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};


export default Table