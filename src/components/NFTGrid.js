import React from 'react';
import NFTCard from './NFTCard';
import './NFTGrid.css';

const NFTGrid = ({ nfts }) => {
  if (nfts.length === 0) {
    return (
      <div className="no-results">
        <div className="no-results-icon">🎨</div>
        <h3>No NFTs Found</h3>
        <p>Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="nft-grid">
      {nfts.map(nft => (
        <NFTCard key={nft.id} nft={nft} />
      ))}
    </div>
  );
};

export default NFTGrid;