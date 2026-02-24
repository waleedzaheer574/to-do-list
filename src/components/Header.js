import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🎨</span>
          <span className="logo-text">NFT Gallery</span>
        </Link>

        <nav className="nav-menu">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            Gallery
          </Link>
          <Link to="/collections" className="nav-link">
            Collections
          </Link>
          <Link to="/artists" className="nav-link">
            Artists
          </Link>
          <Link to="/stats" className="nav-link">
            Stats
          </Link>
        </nav>

        <div className="header-actions">
          <button className="icon-button">
            <span>🔍</span>
          </button>
          <button className="icon-button">
            <span>👤</span>
          </button>
          <button className="connect-wallet">
            Connect Wallet
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;