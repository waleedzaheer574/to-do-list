import { useState } from "react";

function ProfileCard({ 
    name, 
    bio, 
    avatar, 
    role, 
    location, 
    followers, 
    following, 
    posts, 
    isFollowed, 
    onToggleFollow, 
    theme,
    social 
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={`profile-card ${theme} ${isFollowed ? 'followed' : ''} ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="card-gradient"></div>
            
            <div className="card-header">
                <div className="avatar-wrapper">
                    <div className="avatar-border">
                        <img 
                            src={avatar} 
                            alt={name} 
                            className="avatar" 
                            loading="lazy"
                        />
                    </div>
                    {isFollowed && (
                        <div className="follow-indicator">
                            <span className="indicator-dot"></span>
                            <span>Following</span>
                        </div>
                    )}
                </div>
                
                <div className="profile-info">
                    <h3 className="profile-name">{name}</h3>
                    <p className="profile-role">{role}</p>
                    <div className="profile-location">
                        {location}
                    </div>
                </div>
            </div>

            <div className="card-body">
                <p className="profile-bio">{bio}</p>
                
                <div className="social-links">
                    <button className="social-btn twitter">𝕏</button>
                    <button className="social-btn github">⎋</button>
                    <button className="social-btn linkedin">in</button>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-item">
                    <span className="stat-value">{followers}</span>
                    <span className="stat-label">Followers</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{following}</span>
                    <span className="stat-label">Following</span>
                </div>
                <div className="stat-item">
                    <span className="stat-value">{posts}</span>
                    <span className="stat-label">Posts</span>
                </div>
            </div>

            <div className="card-footer">
                <button 
                    className={`follow-button ${isFollowed ? 'following' : ''}`}
                    onClick={onToggleFollow}
                >
                    {isFollowed ? (
                        <>
                            <span className="button-icon">✓</span>
                            <span>Following</span>
                        </>
                    ) : (
                        <>
                            <span className="button-icon">+</span>
                            <span>Follow</span>
                        </>
                    )}
                </button>
                
                <button className="message-button">
                    <span className="message-icon">💬</span>
                    Message
                </button>
            </div>

            <div className="card-badge">
                <span>PRO</span>
            </div>
        </div>
    );
}

export default ProfileCard;