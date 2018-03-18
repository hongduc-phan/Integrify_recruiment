import React from 'react';
import './Header.css';

const Header = () => (
  <header className="header">
    <div className="view-range">
      <div className="header__logo-name-company">
        <div className="header__logo" />
        <h3 className="header__name-company">Nord Software</h3>
      </div>
    </div>
  </header>
);

export default Header;