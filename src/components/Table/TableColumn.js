import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Table.css';

const TableColumn = ({children, className, ...others}) => (
  <td className={classnames('table-col', className)}>
    {children}
  </td>
);

TableColumn.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};


export default TableColumn;