import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Table.css';

const TableHead = ({children, className, ...others}) => (
  <th {...others} className={classnames('table-head', className)}>
    {children}
  </th>
);

TableHead.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};


export default TableHead;