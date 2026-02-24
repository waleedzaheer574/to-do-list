import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NFTCard.css';

const NFTCard = ({ nft }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const rarityColors = {
    Common: '#95a5a6',
    Rare: '#3498db',
    Epic: '#9b59b6',
    Legendary: '#f1c40f',
    Mythic: '#e67e22'
  };

  return (
    <div 
      className="nft-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/nft/${nft.id}`} className="nft-card-link">
        <div className="nft-image-container">
          {!imageLoaded && <div className="image-skeleton"></div>}
          <img
            src={nft.image}
            alt={nft.name}
            className={`nft-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
          />
          
          <div className={`nft-overlay ${isHovered ? 'visible' : ''}`}>
            <button className="quick-view">Quick View</button>
          </div>

          <span className="nft-rarity" style={{ background: rarityColors[nft.rarity] }}>
            {nft.rarity}
          </span>
        </div>

        <div className="nft-info">
          <div className="nft-header">
            <h3 className="nft-name">{nft.name}</h3>
            <span className="nft-likes">❤️ {nft.likes}</span>
          </div>
          
          <p className="nft-artist">by {nft.artist}</p>
          
          <div className="nft-details">
            <span className="nft-category">{nft.category}</span>
            <span className="nft-blockchain">{nft.blockchain}</span>
          </div>

          <div className="nft-footer">
            <div className="nft-price">
              <span className="price-label">Price</span>
              <span className="price-value">{nft.price} {nft.currency}</span>
            </div>
            
            <button className="buy-button">
              Buy Now
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NFTCard;