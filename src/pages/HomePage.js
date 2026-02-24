import React, { useState, useMemo } from 'react';
import { nftCollection, categories, rarityOptions, blockchainOptions } from '../data/nftData';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import NFTGrid from '../components/NFTGrid';
import Loader from '../components/Loader';
import './HomePage.css';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRarity, setSelectedRarity] = useState('All');
  const [selectedBlockchain, setSelectedBlockchain] = useState('All');
  const [sortBy, setSortBy] = useState('recent');
  const [priceRange, setPriceRange] = useState([0, 10]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Simulate loading
  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort NFTs
  const filteredNFTs = useMemo(() => {
    let filtered = [...nftCollection];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(nft =>
        nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nft.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        nft.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(nft => nft.category === selectedCategory);
    }

    // Rarity filter
    if (selectedRarity !== 'All') {
      filtered = filtered.filter(nft => nft.rarity === selectedRarity);
    }

    // Blockchain filter
    if (selectedBlockchain !== 'All') {
      filtered = filtered.filter(nft => nft.blockchain === selectedBlockchain);
    }

    // Price filter
    filtered = filtered.filter(nft => nft.price <= priceRange[1]);

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // recent
        filtered.sort((a, b) => new Date(b.created) - new Date(a.created));
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedRarity, selectedBlockchain, sortBy, priceRange]);

  const stats = {
    total: filteredNFTs.length,
    totalValue: filteredNFTs.reduce((acc, nft) => acc + nft.price, 0).toFixed(1),
    avgPrice: (filteredNFTs.reduce((acc, nft) => acc + nft.price, 0) / filteredNFTs.length || 0).toFixed(2)
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="home-page">
      <Header />
      
      <main className="main-content">
        <div className="hero-section">
          <h1 className="hero-title">Discover Digital Art</h1>
          <p className="hero-subtitle">Explore unique NFTs from artists around the world</p>
          
          <div className="stats-container">
            <div className="stat-item">
              <span className="stat-value">{nftCollection.length}</span>
              <span className="stat-label">Total NFTs</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.totalValue} ETH</span>
              <span className="stat-label">Total Value</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.avgPrice} ETH</span>
              <span className="stat-label">Avg Price</span>
            </div>
          </div>
        </div>

        <div className="content-wrapper">
          <aside className="sidebar">
            <FilterBar
              categories={categories}
              rarityOptions={rarityOptions}
              blockchainOptions={blockchainOptions}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedRarity={selectedRarity}
              setSelectedRarity={setSelectedRarity}
              selectedBlockchain={selectedBlockchain}
              setSelectedBlockchain={setSelectedBlockchain}
              sortBy={sortBy}
              setSortBy={setSortBy}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </aside>

          <section className="gallery-section">
            <div className="gallery-header">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              
              <div className="view-options">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  List
                </button>
              </div>
            </div>

            <NFTGrid nfts={filteredNFTs} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default HomePage;