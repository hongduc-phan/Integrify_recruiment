import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Table.css';

const TableRow = ({children, className, ...others}) => (
  <tr className={classnames('table-row', className)}>
    {children}
  </tr>
);
TableRow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};


export default TableRow;