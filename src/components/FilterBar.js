import React from 'react';
import './FilterBar.css';

const FilterBar = ({ 
  categories,
  rarityOptions,
  blockchainOptions,
  selectedCategory,
  setSelectedCategory,
  selectedRarity,
  setSelectedRarity,
  selectedBlockchain,
  setSelectedBlockchain,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange
}) => {
  return (
    <div className="filter-bar">
      <div className="filter-section">
        <h4>Categories</h4>
        <div className="filter-options">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-chip ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Rarity</h4>
        <div className="filter-options">
          {rarityOptions.map(rarity => (
            <button
              key={rarity}
              className={`filter-chip ${selectedRarity === rarity ? 'active' : ''}`}
              onClick={() => setSelectedRarity(rarity)}
            >
              {rarity}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Blockchain</h4>
        <div className="filter-options">
          {blockchainOptions.map(blockchain => (
            <button
              key={blockchain}
              className={`filter-chip ${selectedBlockchain === blockchain ? 'active' : ''}`}
              onClick={() => setSelectedBlockchain(blockchain)}
            >
              {blockchain}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h4>Price Range (ETH)</h4>
        <div className="price-range">
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseFloat(e.target.value)])}
            className="price-slider"
          />
          <div className="price-values">
            <span>0 ETH</span>
            <span>Up to {priceRange[1]} ETH</span>
          </div>
        </div>
      </div>

      <div className="filter-section">
        <h4>Sort By</h4>
        <select 
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="recent">Recently Added</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="popular">Most Popular</option>
          <option value="name">Name</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;