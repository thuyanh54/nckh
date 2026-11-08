import React from 'react'
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Flame,
  CheckCircle2,
} from 'lucide-react'
import type { Product, ClientPage } from '../../types'
import { ProductCard } from './ProductCard'
import { categories, money } from '../../data/mockData'

interface StoreHomeProps {
  products: Product[]
  selectedCategory: string
  setSelectedCategory: (cat: string) => void
  onQuickView: (product: Product) => void
  onAddToCart: (product: Product) => void
  wishlistIds: string[]
  onToggleWishlist: (product: Product) => void
  setCurrentPage: (page: ClientPage) => void
}

export const StoreHome: React.FC<StoreHomeProps> = ({
  products,
  selectedCategory,
  setSelectedCategory,
  onQuickView,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  setCurrentPage,
}) => {
  // AI Recommended products
  const aiRecommended = products.slice(0, 3)

  // Bestsellers
  const bestsellers = products
    .filter((p) => p.stock > 0 && (p.badge === 'Bán chạy' || p.current < p.base || p.stock < 15))
    .slice(0, 4)

  // Filtered products for main catalog grid
  const filteredProducts =
    selectedCategory === 'Tất cả'
      ? products
      : products.filter((p) => p.category === selectedCategory)

  return (
    <div>
      {/* Hero Section */}
      <section className="client-hero">
        <div className="client-hero-content">
          <span className="hero-tag">
            <Sparkles size={14} /> BỘ SƯU TẬP KHÔNG GIAN SỐNG 2026
          </span>
          <h1 className="client-hero-title">
            Nơi mọi thứ <em>dịu lại</em> và bắt đầu.
          </h1>
          <p className="client-hero-desc">
            Tuyển chọn những thiết kế nội thất và đồ gia dụng tinh giản, kết hợp
            thuật toán định giá động tối ưu giúp bạn tận hưởng chất lượng tốt
            nhất với chi phí hợp lý nhất.
          </p>
          <div className="hero-actions">
            <button
              className="button button-primary"
              style={{ padding: '0 24px', height: '44px', fontSize: '14px' }}
              onClick={() => setCurrentPage('catalog')}
            >
              Khám phá cửa hàng <ArrowRight size={16} />
            </button>
            <button
              className="button button-outline"
              style={{ padding: '0 20px', height: '44px', fontSize: '14px' }}
              onClick={() => setCurrentPage('recommended')}
            >
              <Sparkles size={15} color="#c58b45" /> Gợi ý AI hôm nay
            </button>
          </div>
        </div>
        <div className="client-hero-bg">
          <div className="hero-nckh-badge">
            <Sparkles size={22} color="#174b35" />
            <div>
              <b>Mô hình Định giá Động</b>
              <small>Tối ưu cung-cầu thời gian thực</small>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="client-features-bar">
        <div className="feature-box">
          <div className="feature-icon-wrap">
            <Truck size={22} />
          </div>
          <div className="feature-info">
            <b>Giao hàng toàn quốc</b>
            <small>Miễn phí đơn từ 1.000.000₫</small>
          </div>
        </div>
        <div className="feature-box">
          <div className="feature-icon-wrap">
            <ShieldCheck size={22} />
          </div>
          <div className="feature-info">
            <b>Chính hãng 100%</b>
            <small>Bảo hành điện tử 24 tháng</small>
          </div>
        </div>
        <div className="feature-box">
          <div className="feature-icon-wrap">
            <RotateCcw size={22} />
          </div>
          <div className="feature-info">
            <b>Đổi trả trong 30 ngày</b>
            <small>Thủ tục nhanh gọn, miễn phí</small>
          </div>
        </div>
        <div className="feature-box">
          <div className="feature-icon-wrap">
            <Headphones size={22} />
          </div>
          <div className="feature-info">
            <b>Hỗ trợ 24/7</b>
            <small>Đội ngũ chuyên viên tư vấn tận tâm</small>
          </div>
        </div>
      </section>

      {/* AI Recommendation Engine Block */}
      <section className="ai-recommend-container">
        <span className="ai-badge-header">
          <Sparkles size={14} /> NCKH RECOMMENDATION ENGINE
        </span>
        <h2 className="ai-header-title">Sản phẩm Đề xuất dành riêng cho bạn</h2>
        <p className="ai-header-sub">
          Mô hình kết hợp phân tích hành vi người dùng và thuật toán định giá động
          để đề xuất những sản phẩm có mức giá tối ưu và độ phù hợp cao nhất.
        </p>

        <div className="ai-cards-grid">
          {aiRecommended.map((p, idx) => (
            <div
              key={p.id}
              className="ai-card-item"
              onClick={() => onQuickView(p)}
            >
              <img src={p.image} alt={p.name} />
              <div className="ai-card-info">
                <span className="ai-card-reason">
                  <CheckCircle2 size={12} style={{ display: 'inline', marginRight: '4px' }} />
                  {idx === 0
                    ? 'Phù hợp phòng khách hiện đại'
                    : idx === 1
                    ? 'Giá tối ưu theo mùa vụ'
                    : 'Độ hài lòng 98% từ người mua'}
                </span>
                <b>{p.name}</b>
                <div className="ai-card-price-row">
                  <span className="ai-card-price">{money(p.current)}</span>
                  <span
                    style={{
                      fontSize: '11px',
                      color: '#286747',
                      background: '#e4f1e1',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      fontWeight: 600,
                    }}
                  >
                    Xem chi tiết →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bestsellers Section */}
      <section style={{ marginBottom: '44px' }}>
        <div className="client-section-heading">
          <div>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#bd5338',
                letterSpacing: '1px',
              }}
            >
              <Flame size={14} /> XU HƯỚNG MUA SẮM
            </span>
            <h2>Sản phẩm Bán chạy nhất tuần</h2>
            <p>Những thiết kế được yêu thích và đặt hàng nhiều nhất.</p>
          </div>
          <button
            className="link-button"
            onClick={() => setCurrentPage('bestsellers')}
          >
            Xem tất cả bán chạy <ArrowRight size={14} />
          </button>
        </div>

        <div className="client-product-grid">
          {bestsellers.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              isWishlisted={wishlistIds.includes(p.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* Main Catalog with Category Filter */}
      <section>
        <div className="client-section-heading">
          <div>
            <h2>Tất cả sản phẩm</h2>
            <p>Khám phá bộ sưu tập đa dạng các sản phẩm phục vụ cuộc sống tiện nghi.</p>
          </div>
          <button
            className="link-button"
            onClick={() => setCurrentPage('catalog')}
          >
            Mở bộ lọc nâng cao <ArrowRight size={14} />
          </button>
        </div>

        {/* Category Pills */}
        <div className="category-pills-bar">
          <button
            className={`category-pill-btn ${selectedCategory === 'Tất cả' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('Tất cả')}
          >
            Tất cả ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-pill-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat} ({products.filter((p) => p.category === cat).length})
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="client-product-grid">
          {filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
              isWishlisted={wishlistIds.includes(p.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
