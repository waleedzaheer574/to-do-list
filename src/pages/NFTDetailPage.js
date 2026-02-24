import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { nftCollection } from '../data/nftData';
import Header from '../components/Header';
import './NFTDetailPage.css';

const NFTDetailPage = () => {
  const { id } = useParams();
  const [nft, setNft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const found = nftCollection.find(n => n.id === parseInt(id));
      setNft(found);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="detail-loader">
          <div className="loader"></div>
        </div>
      </>
    );
  }

  if (!nft) {
    return (
      <>
        <Header />
        <div className="not-found">
          <h2>NFT Not Found</h2>
          <Link to="/" className="back-link">Back to Gallery</Link>
        </div>
      </>
    );
  }

  const rarityColors = {
    Common: '#95a5a6',
    Rare: '#3498db',
    Epic: '#9b59b6',
    Legendary: '#f1c40f',
    Mythic: '#e67e22'
  };

  return (
    <>
      <Header />
      <div className="detail-page">
        <div className="detail-container">
          <Link to="/" className="back-button">
            ← Back to Gallery
          </Link>

          <div className="detail-content">
            <div className="detail-image-section">
              <div className="detail-image-container">
                <img src={nft.image} alt={nft.name} className="detail-image" />
                <span className="detail-rarity" style={{ background: rarityColors[nft.rarity] }}>
                  {nft.rarity}
                </span>
              </div>

              <div className="image-thumbnails">
                <img src={nft.image} alt="thumbnail" className="thumbnail active" />
                <img src={nft.image} alt="thumbnail" className="thumbnail" />
                <img src={nft.image} alt="thumbnail" className="thumbnail" />
              </div>
            </div>

            <div className="detail-info-section">
              <h1 className="detail-title">{nft.name}</h1>
              
              <div className="detail-meta">
                <div className="meta-item">
                  <span className="meta-label">Created by</span>
                  <span className="meta-value artist">{nft.artist}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Category</span>
                  <span className="meta-value">{nft.category}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Blockchain</span>
                  <span className="meta-value">{nft.blockchain}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Created</span>
                  <span className="meta-value">{new Date(nft.created).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="detail-description">
                <h3>Description</h3>
                <p>{nft.description}</p>
              </div>

              <div className="detail-stats">
                <div className="stat-box">
                  <span className="stat-box-label">Current Price</span>
                  <span className="stat-box-value">{nft.price} {nft.currency}</span>
                </div>
                <div className="stat-box">
                  <span className="stat-box-label">Likes</span>
                  <span className="stat-box-value">❤️ {nft.likes}</span>
                </div>
                <div className="stat-box">
                  <span className="stat-box-label">Views</span>
                  <span className="stat-box-value">👁️ {nft.views}</span>
                </div>
              </div>

              <div className="purchase-section">
                <div className="quantity-selector">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="quantity-btn"
                  >
                    -
                  </button>
                  <span className="quantity">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>

                <button className="buy-now-btn">
                  Buy Now for {nft.price * quantity} ETH
                </button>

                <button className="make-offer-btn">
                  Make Offer
                </button>
              </div>

              <div className="additional-info">
                <h3>Details</h3>
                <ul className="details-list">
                  <li>
                    <span>Token ID</span>
                    <span>#{nft.id.toString().padStart(4, '0')}</span>
                  </li>
                  <li>
                    <span>Contract Address</span>
                    <span>0x71C76...3f8b2</span>
                  </li>
                  <li>
                    <span>Token Standard</span>
                    <span>ERC-721</span>
                  </li>
                  <li>
                    <span>Royalties</span>
                    <span>5%</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NFTDetailPage;