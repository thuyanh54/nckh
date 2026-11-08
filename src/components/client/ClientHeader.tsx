import React, { useState } from 'react'
import {
  ShoppingBag,
  Search,
  Heart,
  ShoppingCart,
  User,
  LayoutDashboard,
  Menu,
  X,
  Sparkles,
  LogOut,
  Package,
} from 'lucide-react'
import type { ClientPage, UserProfile } from '../../types'

interface ClientHeaderProps {
  currentPage: ClientPage
  setCurrentPage: (page: ClientPage) => void
  cartCount: number
  wishlistCount: number
  openCart: () => void
  openWishlist: () => void
  openAuth: () => void
  openOrders: () => void
  user: UserProfile | null
  logout: () => void
  onSwitchToAdmin: () => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export const ClientHeader: React.FC<ClientHeaderProps> = ({
  currentPage,
  setCurrentPage,
  cartCount,
  wishlistCount,
  openCart,
  openWishlist,
  openAuth,
  openOrders,
  user,
  logout,
  onSwitchToAdmin,
  searchQuery,
  setSearchQuery,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  return (
    <>
      {/* Top bar announcement */}
      <div className="client-top-announce">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={14} color="#f4c842" />
          <span>Hệ thống Thương mại điện tử ShopMart tích hợp Mô hình Định giá động & Gợi ý (NCKH)</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>Hotline: 1800 1234</span>
          <button
            onClick={onSwitchToAdmin}
            className="admin-mode-pill"
            title="Chuyển sang trang Quản trị viên của bạn Thùy Anh"
          >
            <LayoutDashboard size={13} /> Không gian Quản trị Admin
          </button>
        </div>
      </div>

      {/* Main Header */}
      <header className="client-header">
        <div className="client-nav-container">
          {/* Brand Logo */}
          <button className="client-brand" onClick={() => setCurrentPage('home')}>
            <span className="client-brand-mark">
              <ShoppingBag size={20} />
            </span>
            <div>
              <div className="client-brand-title">
                Shop<span>Mart</span>
              </div>
              <small className="client-brand-sub">STUDIO LIVING</small>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="client-nav-links">
            <button
              className={`client-nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentPage('home')}
            >
              Trang chủ
            </button>
            <button
              className={`client-nav-link ${currentPage === 'catalog' ? 'active' : ''}`}
              onClick={() => setCurrentPage('catalog')}
            >
              Cửa hàng
            </button>
            <button
              className={`client-nav-link ${currentPage === 'bestsellers' ? 'active' : ''}`}
              onClick={() => setCurrentPage('bestsellers')}
            >
              Bán chạy
            </button>
            <button
              className={`client-nav-link ${currentPage === 'recommended' ? 'active' : ''}`}
              onClick={() => setCurrentPage('recommended')}
            >
              Gợi ý NCKH <span className="nav-badge-ai">AI</span>
            </button>
          </nav>

          {/* Search Box */}
          <div className="client-search-wrap">
            <input
              type="text"
              placeholder="Tìm sản phẩm, nội thất..."
              className="client-search-box"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                if (currentPage !== 'catalog') setCurrentPage('catalog')
              }}
            />
            <Search size={16} className="client-search-icon" />
          </div>

          {/* Action Icons */}
          <div className="client-actions">
            {/* Wishlist */}
            <button
              className="client-action-btn"
              onClick={openWishlist}
              title="Danh sách yêu thích"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span className="client-badge-counter">{wishlistCount}</span>
              )}
            </button>

            {/* Cart */}
            <button
              className="client-action-btn"
              onClick={openCart}
              title="Giỏ hàng của bạn"
            >
              <ShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="client-badge-counter">{cartCount}</span>
              )}
            </button>

            {/* User Account */}
            {user ? (
              <div style={{ position: 'relative' }}>
                <button
                  className="client-user-btn"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <span className="user-avatar-circle">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span>{user.name.split(' ').pop()}</span>
                </button>
                {userMenuOpen && (
                  <div
                    className="popover"
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: '42px',
                      width: '210px',
                      padding: '12px',
                    }}
                  >
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--ink)' }}>
                      {user.name}
                    </div>
                    <small style={{ color: '#888', display: 'block', marginBottom: '8px' }}>
                      {user.email}
                    </small>
                    <hr style={{ border: 0, borderTop: '1px solid #eee', margin: '6px 0' }} />
                    <button
                      onClick={() => {
                        openOrders()
                        setUserMenuOpen(false)
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        width: '100%',
                        padding: '8px 0',
                        border: 0,
                        background: 'none',
                        cursor: 'pointer',
                        fontSize: '12.5px',
                        color: '#333',
                      }}
                    >
                      <Package size={14} /> Đơn hàng của tôi
                    </button>
                    <button
                      onClick={() => {
                        logout()
                        setUserMenuOpen(false)
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        width: '100%',
                        padding: '8px 0',
                        border: 0,
                        background: 'none',
                        cursor: 'pointer',
                        fontSize: '12.5px',
                        color: '#c24b38',
                      }}
                    >
                      <LogOut size={14} /> Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="client-user-btn" onClick={openAuth}>
                <User size={16} />
                <span>Đăng nhập</span>
              </button>
            )}

            {/* Mobile Hamburger */}
            <button
              className="client-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: '16px 24px',
              background: '#fff',
              borderTop: '1px solid #eee',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <input
              type="text"
              placeholder="Tìm sản phẩm..."
              className="client-search-box"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage('catalog')
              }}
              style={{ width: '100%' }}
            />
            <button
              className="client-nav-link"
              onClick={() => {
                setCurrentPage('home')
                setMobileMenuOpen(false)
              }}
            >
              Trang chủ
            </button>
            <button
              className="client-nav-link"
              onClick={() => {
                setCurrentPage('catalog')
                setMobileMenuOpen(false)
              }}
            >
              Cửa hàng
            </button>
            <button
              className="client-nav-link"
              onClick={() => {
                setCurrentPage('bestsellers')
                setMobileMenuOpen(false)
              }}
            >
              Bán chạy
            </button>
            <button
              className="client-nav-link"
              onClick={() => {
                setCurrentPage('recommended')
                setMobileMenuOpen(false)
              }}
            >
              Gợi ý NCKH
            </button>
            <button
              onClick={() => {
                onSwitchToAdmin()
                setMobileMenuOpen(false)
              }}
              className="admin-mode-pill"
              style={{ width: 'fit-content', marginTop: '6px' }}
            >
              <LayoutDashboard size={13} /> Vào trang Quản trị Admin
            </button>
          </div>
        )}
      </header>
    </>
  )
}
