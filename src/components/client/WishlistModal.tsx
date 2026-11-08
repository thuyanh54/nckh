import React from 'react'
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react'
import type { Product } from '../../types'
import { money } from '../../data/mockData'

interface WishlistModalProps {
  isOpen: boolean
  onClose: () => void
  wishlistProducts: Product[]
  onAddToCart: (product: Product) => void
  onRemoveWishlist: (product: Product) => void
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onAddToCart,
  onRemoveWishlist,
}) => {
  if (!isOpen) return null

  return (
    <div className="modal-detail-overlay" onClick={onClose}>
      <div
        className="modal-detail-card"
        style={{ maxWidth: '560px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 22px',
            borderBottom: '1px solid var(--line)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#faf8f3',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Heart size={18} fill="#d94b4b" color="#d94b4b" />
            <h3 style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: '19px' }}>
              Sản phẩm yêu thích ({wishlistProducts.length})
            </h3>
          </div>
          <button className="icon-button" onClick={onClose} title="Đóng">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '18px 22px', maxHeight: '70vh', overflowY: 'auto' }}>
          {wishlistProducts.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {wishlistProducts.map((p) => (
                <div
                  key={p.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px',
                    border: '1px solid var(--line)',
                    borderRadius: '8px',
                    background: '#fff',
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '13.5px', color: 'var(--ink)' }}>
                      {p.name}
                    </div>
                    <div style={{ color: 'var(--forest)', fontWeight: 700, fontSize: '13.5px' }}>
                      {money(p.current)}
                    </div>
                  </div>
                  <button
                    className="button button-primary"
                    style={{ height: '34px', fontSize: '12px', padding: '0 10px' }}
                    onClick={() => {
                      onAddToCart(p)
                      onRemoveWishlist(p)
                    }}
                  >
                    <ShoppingBag size={14} /> Thêm giỏ
                  </button>
                  <button
                    className="icon-button"
                    style={{ color: '#999' }}
                    onClick={() => onRemoveWishlist(p)}
                    title="Xóa khỏi yêu thích"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state" style={{ padding: '40px 10px', textAlign: 'center' }}>
              <Heart size={36} color="#aaa" />
              <h4 style={{ margin: '12px 0 6px', fontFamily: 'var(--serif)' }}>
                Chưa có sản phẩm yêu thích
              </h4>
              <p style={{ color: '#888', fontSize: '13px' }}>
                Bấm vào biểu tượng trái tim ở mỗi sản phẩm để lưu lại xem sau.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
