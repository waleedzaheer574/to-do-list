import React, { useState } from 'react';
import { Button, Card, Modal } from './components';
import './App.css';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('default');

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getModalContent = () => {
    switch(modalType) {
      case 'info':
        return {
          title: 'Information',
          content: 'This is an informational modal with important details about the application.',
          footer: <Button onClick={closeModal}>Got it</Button>
        };
      case 'confirm':
        return {
          title: 'Confirm Action',
          content: 'Are you sure you want to proceed with this action?',
          footer: (
            <>
              <Button variant="outline" onClick={closeModal}>Cancel</Button>
              <Button variant="danger" onClick={closeModal}>Confirm</Button>
            </>
          )
        };
      case 'form':
        return {
          title: 'User Information',
          content: (
            <form className="demo-form">
              <div className="form-group">
                <label>Name:</label>
                <input type="text" placeholder="Enter your name" />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input type="email" placeholder="Enter your email" />
              </div>
            </form>
          ),
          footer: (
            <>
              <Button variant="outline" onClick={closeModal}>Cancel</Button>
              <Button onClick={closeModal}>Submit</Button>
            </>
          )
        };
      default:
        return {
          title: 'Welcome Modal',
          content: 'This is a default modal with basic content.',
          footer: <Button onClick={closeModal}>Close</Button>
        };
    }
  };

  const modalContent = getModalContent();

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎨 React Component Library</h1>
        <p>Demo showcasing reusable Button, Card, and Modal components</p>
      </header>

      {/* Button Showcase */}
      <section className="demo-section">
        <h2>🔘 Button Component</h2>
        <div className="demo-grid">
          <div className="demo-item">
            <h3>Variants</h3>
            <div className="button-group">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="success">Success</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="outline">Outline</Button>
            </div>
          </div>

          <div className="demo-item">
            <h3>Sizes</h3>
            <div className="button-group">
              <Button size="small">Small</Button>
              <Button size="medium">Medium</Button>
              <Button size="large">Large</Button>
            </div>
          </div>

          <div className="demo-item">
            <h3>States</h3>
            <div className="button-group">
              <Button disabled>Disabled</Button>
              <Button fullWidth>Full Width</Button>
              <Button 
                icon={<span>⭐</span>}
                iconPosition="left"
              >
                With Icon
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Card Showcase */}
      <section className="demo-section">
        <h2>🃏 Card Component</h2>
        <div className="card-grid">
          <Card
            title="Default Card"
            subtitle="With subtitle"
            image="https://via.placeholder.com/400x200"
            bordered
            elevated
            hoverable
            actions={
              <>
                <Button size="small" variant="outline">Action 1</Button>
                <Button size="small" variant="primary">Action 2</Button>
              </>
            }
          >
            <p>This is a default card with all features enabled. It has an image, title, subtitle, and action buttons.</p>
          </Card>

          <Card
            title="Gradient Card"
            variant="primary"
            hoverable
            footer="Updated 2 mins ago"
          >
            <p>This card uses a primary gradient background and has a footer.</p>
          </Card>

          <Card
            title="Simple Card"
            bordered
            footer={<span>📅 Due: Tomorrow</span>}
          >
            <p>A simple bordered card with just the essentials.</p>
          </Card>
        </div>
      </section>

      {/* Modal Showcase */}
      <section className="demo-section">
        <h2>💬 Modal Component</h2>
        <div className="button-group">
          <Button variant="primary" onClick={() => openModal('info')}>
            Open Info Modal
          </Button>
          <Button variant="success" onClick={() => openModal('confirm')}>
            Open Confirm Modal
          </Button>
          <Button variant="secondary" onClick={() => openModal('form')}>
            Open Form Modal
          </Button>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={modalContent.title}
          footer={modalContent.footer}
          size="medium"
          animation="pop"
          closeOnOverlayClick
          showCloseButton
        >
          {modalContent.content}
        </Modal>
      </section>

      {/* Features Section */}
      <section className="demo-section features">
        <h2>✨ Key Features</h2>
        <div className="features-grid">
          <Card variant="primary" bordered={false}>
            <h3>🔄 Reusable</h3>
            <p>All components are fully customizable with props</p>
          </Card>
          <Card variant="secondary" bordered={false}>
            <h3>📱 Responsive</h3>
            <p>Works perfectly on all screen sizes</p>
          </Card>
          <Card variant="dark" bordered={false}>
            <h3>🎨 Styled</h3>
            <p>Beautiful CSS with animations and effects</p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default App;