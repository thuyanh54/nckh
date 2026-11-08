import React from 'react'
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react'
import type { Product } from '../../types'
import { money } from '../../data/mockData'

interface ProductCardProps {
  product: Product
  onQuickView: (product: Product) => void
  onAddToCart: (product: Product) => void
  isWishlisted: boolean
  onToggleWishlist: (product: Product) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const discountPercent =
    product.current < product.base
      ? Math.round(((product.base - product.current) / product.base) * 100)
      : 0

  return (
    <article className="client-product-card">
      <div className="card-media-wrap" onClick={() => onQuickView(product)}>
        <img src={product.image} alt={product.name} loading="lazy" />

        {product.badge && (
          <span
            className={`card-badge-top ${
              product.badge.includes('AI')
                ? 'card-badge-ai'
                : product.badge === 'Bán chạy'
                ? 'card-badge-bestseller'
                : ''
            }`}
          >
            {product.badge}
          </span>
        )}

        <button
          className={`card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onToggleWishlist(product)
          }}
          title={isWishlisted ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
        >
          <Heart size={16} fill={isWishlisted ? '#d94b4b' : 'none'} />
        </button>
      </div>

      <div className="card-body">
        <span className="card-category-label">{product.category}</span>
        <button className="card-title" onClick={() => onQuickView(product)}>
          {product.name}
        </button>

        <div className="card-rating-row">
          <Star size={13} />
          <b>{product.rating ?? 4.8}</b>
          <span>({product.reviewCount ?? 20})</span>
          <span style={{ marginLeft: 'auto', color: product.stock < 10 ? '#bd5338' : '#68836a' }}>
            {product.stock < 10 ? `Còn ${product.stock}` : `Còn hàng`}
          </span>
        </div>

        <div className="card-price-row">
          <span className="card-current-price">{money(product.current)}</span>
          {product.base > product.current && (
            <span className="card-base-price">{money(product.base)}</span>
          )}
          {discountPercent > 0 && (
            <span className="card-saving-tag">-{discountPercent}%</span>
          )}
        </div>

        <div className="card-actions-row">
          <button
            className="btn-add-cart"
            onClick={() => onAddToCart(product)}
            disabled={product.stock <= 0}
            style={{
              background: product.stock > 0 ? '#174b35' : '#d4d0c5',
              color: '#ffffff',
              border: '1px solid #133e2c',
            }}
          >
            <ShoppingBag size={14} color="#ffffff" />
            <span style={{ color: '#ffffff', fontWeight: 600 }}>
              {product.stock > 0 ? 'Thêm giỏ' : 'Hết hàng'}
            </span>
          </button>
          <button
            className="btn-quick-view"
            onClick={() => onQuickView(product)}
            title="Xem chi tiết"
            style={{
              background: '#f2eee6',
              color: '#174b35',
              border: '1px solid #dfd8cb',
            }}
          >
            <Eye size={15} color="#174b35" />
          </button>
        </div>
      </div>
    </article>
  )
}
