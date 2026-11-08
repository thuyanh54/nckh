import React, { useState } from 'react'
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Check,
  Truck,
  RotateCcw,
} from 'lucide-react'
import type { Product, Review } from '../../types'
import { money } from '../../data/mockData'

interface ProductDetailModalProps {
  product: Product
  onClose: () => void
  onAddToCart: (product: Product, quantity: number) => void
  onBuyNow: (product: Product, quantity: number) => void
  isWishlisted: boolean
  onToggleWishlist: (product: Product) => void
  reviews: Review[]
  onAddReview: (review: Review) => void
  relatedProducts: Product[]
  onSelectProduct: (product: Product) => void
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  reviews,
  onAddReview,
  relatedProducts,
  onSelectProduct,
}) => {
  const [quantity, setQuantity] = useState(1)

  // Review form state
  const [reviewerName, setReviewerName] = useState('')
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  const productReviews = reviews.filter((r) => r.productId === product.id)
  const discountPercent =
    product.current < product.base
      ? Math.round(((product.base - product.current) / product.base) * 100)
      : 0

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reviewerName.trim() || !reviewComment.trim()) return

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      author: reviewerName.trim(),
      rating: reviewRating,
      date: new Date().toLocaleDateString('vi-VN'),
      comment: reviewComment.trim(),
    }

    onAddReview(newRev)
    setReviewerName('')
    setReviewComment('')
    setReviewSubmitted(true)
    setTimeout(() => setReviewSubmitted(false), 3000)
  }

  return (
    <div
      className="modal-detail-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal-detail-card">
        {/* Header */}
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--line)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#faf8f3',
          }}
        >
          <span style={{ fontSize: '12px', color: '#777', textTransform: 'uppercase' }}>
            Chi tiết sản phẩm / {product.category}
          </span>
          <button
            onClick={onClose}
            className="icon-button"
            title="Đóng (ESC)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="modal-detail-body">
          <div className="modal-detail-grid">
            {/* Left: Image */}
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="modal-detail-photo"
              />
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '12px',
                  fontSize: '12px',
                  color: '#6e776b',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Truck size={14} color="#174b35" /> Giao hàng trong 2-3 ngày
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <RotateCcw size={14} color="#174b35" /> Đổi trả 30 ngày
                </div>
              </div>
            </div>

            {/* Right: Info */}
            <div>
              <div className="modal-detail-header-row">
                <h2 className="modal-detail-title">{product.name}</h2>
                <button
                  className={`card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
                  onClick={() => onToggleWishlist(product)}
                  style={{ position: 'static' }}
                >
                  <Heart size={18} fill={isWishlisted ? '#d94b4b' : 'none'} />
                </button>
              </div>

              <div className="modal-detail-sku">
                Mã sản phẩm: <b>{product.id}</b> • Danh mục: <b>{product.category}</b> •{' '}
                <span style={{ color: product.stock > 0 ? '#286747' : '#c04b38' }}>
                  {product.stock > 0 ? `Còn ${product.stock} trong kho` : 'Hết hàng'}
                </span>
              </div>

              {/* Dynamic Price Box */}
              <div className="modal-detail-price-box">
                <span className="modal-detail-current-price">
                  {money(product.current)}
                </span>
                {product.base > product.current && (
                  <span className="modal-detail-base-price">
                    {money(product.base)}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="modal-detail-saving">
                    Tiết kiệm {discountPercent}%
                  </span>
                )}
              </div>

              <p className="modal-detail-desc">
                {product.description ??
                  'Sản phẩm được thiết kế tinh tế với tiêu chuẩn chất lượng cao, đem lại sự tiện nghi và tính thẩm mỹ cao cho không gian của bạn.'}
              </p>

              {/* Quantity Picker & Actions */}
              <div className="modal-cta-row">
                <div className="detail-qty-picker">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>

                <button
                  className="button button-outline"
                  style={{ height: '42px', flex: 1 }}
                  onClick={() => onAddToCart(product, quantity)}
                  disabled={product.stock <= 0}
                >
                  <ShoppingBag size={16} /> Thêm vào giỏ
                </button>

                <button
                  className="button button-primary"
                  style={{ height: '42px', flex: 1.2 }}
                  onClick={() => onBuyNow(product, quantity)}
                  disabled={product.stock <= 0}
                >
                  Mua ngay
                </button>
              </div>

              {/* Specs overview */}
              {product.specs && (
                <div className="detail-meta-specs" style={{ marginTop: '20px' }}>
                  {product.specs.map((s, i) => (
                    <div key={i} className="detail-meta-row">
                      <small>{s.label}</small>
                      <b>{s.value}</b>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Reviews & Tabs */}
          <div className="reviews-section-box">
            <div className="reviews-heading">
              <h4>Đánh giá từ khách hàng ({productReviews.length})</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f1ab35' }}>
                <Star size={16} fill="#f1ab35" />
                <b style={{ color: 'var(--ink)' }}>{product.rating ?? 4.8} / 5.0</b>
              </div>
            </div>

            {/* List Reviews */}
            {productReviews.length > 0 ? (
              productReviews.map((r) => (
                <div key={r.id} className="review-item-card">
                  <div className="review-top-row">
                    <span className="review-author">{r.author}</span>
                    <span className="review-date">{r.date}</span>
                  </div>
                  <div className="review-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        fill={star <= r.rating ? '#f1ab35' : 'none'}
                        color={star <= r.rating ? '#f1ab35' : '#ccc'}
                      />
                    ))}
                  </div>
                  <p className="review-text">{r.comment}</p>
                </div>
              ))
            ) : (
              <p style={{ color: '#888', fontSize: '13px', fontStyle: 'italic' }}>
                Chưa có đánh giá nào cho sản phẩm này. Hãy là người đầu tiên đánh giá!
              </p>
            )}

            {/* Add Review Form */}
            <form onSubmit={handleReviewSubmit} className="review-add-form">
              <h5>Gửi nhận xét của bạn</h5>
              <div className="review-form-inputs">
                <input
                  type="text"
                  placeholder="Họ tên của bạn"
                  className="review-input"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  required
                />
                <select
                  className="review-input"
                  value={reviewRating}
                  onChange={(e) => setReviewRating(Number(e.target.value))}
                >
                  <option value={5}>⭐⭐⭐⭐⭐ (5 sao)</option>
                  <option value={4}>⭐⭐⭐⭐ (4 sao)</option>
                  <option value={3}>⭐⭐⭐ (3 sao)</option>
                  <option value={2}>⭐⭐ (2 sao)</option>
                  <option value={1}>⭐ (1 sao)</option>
                </select>
              </div>
              <textarea
                placeholder="Chia sẻ cảm nhận về chất lượng sản phẩm..."
                className="review-textarea"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                required
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {reviewSubmitted && (
                  <span style={{ color: '#286747', fontSize: '12px', fontWeight: 600 }}>
                    <Check size={14} style={{ display: 'inline' }} /> Cảm ơn bạn đã gửi đánh giá!
                  </span>
                )}
                <button
                  type="submit"
                  className="button button-primary"
                  style={{ marginLeft: 'auto', height: '34px', fontSize: '12.5px' }}
                >
                  Gửi đánh giá
                </button>
              </div>
            </form>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div style={{ marginTop: '36px', paddingTop: '24px', borderTop: '1px solid var(--line)' }}>
              <h4 style={{ fontFamily: 'var(--serif)', fontSize: '18px', margin: '0 0 16px' }}>
                Sản phẩm cùng danh mục
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
                {relatedProducts.slice(0, 3).map((rp) => (
                  <div
                    key={rp.id}
                    style={{
                      border: '1px solid #ebe8df',
                      borderRadius: '8px',
                      padding: '10px',
                      background: '#fff',
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={() => onSelectProduct(rp)}
                  >
                    <img
                      src={rp.image}
                      alt={rp.name}
                      style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '6px' }}
                    />
                    <div>
                      <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--ink)' }}>
                        {rp.name}
                      </div>
                      <div style={{ fontSize: '12.5px', color: 'var(--forest)', fontWeight: 700 }}>
                        {money(rp.current)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
