import React, { useState } from 'react'
import { X, Trash2, ShoppingBag, ArrowRight, Check } from 'lucide-react'
import type { CartItem } from '../../types'
import { money, vouchers } from '../../data/mockData'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  onUpdateQty: (productId: string, quantity: number) => void
  onRemoveItem: (productId: string) => void
  onCheckout: (appliedVoucher: typeof vouchers[0] | null) => void
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
}) => {
  const [voucherCode, setVoucherCode] = useState('')
  const [appliedVoucher, setAppliedVoucher] = useState<typeof vouchers[0] | null>(null)
  const [voucherError, setVoucherError] = useState('')

  if (!isOpen) return null

  // Calculate prices
  const subtotal = items.reduce((sum, item) => sum + item.product.current * item.quantity, 0)

  let discount = 0
  if (appliedVoucher) {
    if (appliedVoucher.percent > 0) {
      discount = Math.min(appliedVoucher.maxDiscount, (subtotal * appliedVoucher.percent) / 100)
    }
  }

  const shippingFee = subtotal >= 1000000 || appliedVoucher?.code === 'FREESHIP' ? 0 : 35000
  const total = Math.max(0, subtotal - discount + shippingFee)

  const handleApplyVoucher = () => {
    setVoucherError('')
    const found = vouchers.find((v) => v.code.toUpperCase() === voucherCode.trim().toUpperCase())
    if (found) {
      setAppliedVoucher(found)
    } else {
      setVoucherError('Mã ưu đãi không hợp lệ. Thử mã: NCKH2026, FREESHIP')
    }
  }

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside
        className="cart-drawer-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="cart-drawer-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color="var(--forest)" />
            <h3>Giỏ hàng của bạn ({items.reduce((acc, i) => acc + i.quantity, 0)})</h3>
          </div>
          <button className="icon-button" onClick={onClose} title="Đóng giỏ hàng">
            <X size={18} />
          </button>
        </div>

        {/* Items List */}
        {items.length > 0 ? (
          <>
            <div className="cart-drawer-items">
              {items.map((item) => (
                <div key={item.product.id} className="cart-item-card">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="cart-item-img"
                  />
                  <div>
                    <div className="cart-item-title">{item.product.name}</div>
                    <div className="cart-item-price">
                      {money(item.product.current)}
                    </div>
                    <div className="cart-qty-stepper">
                      <button
                        onClick={() =>
                          onUpdateQty(item.product.id, Math.max(1, item.quantity - 1))
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          onUpdateQty(
                            item.product.id,
                            Math.min(item.product.stock, item.quantity + 1)
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => onRemoveItem(item.product.id)}
                    title="Xóa món này"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer Summary & Checkout */}
            <div className="cart-drawer-foot">
              {/* Voucher section */}
              <div className="voucher-row">
                <input
                  type="text"
                  placeholder="Mã voucher (NCKH2026)"
                  className="voucher-input"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                />
                <button
                  className="btn-apply-voucher"
                  onClick={handleApplyVoucher}
                >
                  Áp dụng
                </button>
              </div>

              {appliedVoucher && (
                <div
                  style={{
                    fontSize: '11.5px',
                    color: '#286747',
                    background: '#e6f3e5',
                    padding: '6px 10px',
                    borderRadius: '4px',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Check size={14} /> Đã áp dụng mã: <b>{appliedVoucher.code}</b> (-
                  {money(discount)})
                </div>
              )}
              {voucherError && (
                <div style={{ color: '#c04438', fontSize: '11px', marginBottom: '10px' }}>
                  {voucherError}
                </div>
              )}

              {/* Price summary lines */}
              <div className="cart-summary-lines">
                <div className="cart-summary-line">
                  <span>Tạm tính hàng:</span>
                  <span>{money(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="cart-summary-line" style={{ color: '#286747' }}>
                    <span>Giảm giá voucher:</span>
                    <span>-{money(discount)}</span>
                  </div>
                )}
                <div className="cart-summary-line">
                  <span>Phí vận chuyển:</span>
                  <span>{shippingFee === 0 ? 'Miễn phí' : money(shippingFee)}</span>
                </div>
                <div className="cart-summary-line cart-summary-total">
                  <span>Tổng thanh toán:</span>
                  <span>{money(total)}</span>
                </div>
              </div>

              <button
                className="btn-checkout-now"
                onClick={() => onCheckout(appliedVoucher)}
              >
                Tiến hành thanh toán <ArrowRight size={17} />
              </button>
            </div>
          </>
        ) : (
          <div
            className="empty-state"
            style={{ margin: 'auto', textAlign: 'center', padding: '40px 20px' }}
          >
            <ShoppingBag size={42} color="#a6b5a5" />
            <h3 style={{ fontFamily: 'var(--serif)', margin: '14px 0 6px' }}>
              Giỏ hàng đang trống
            </h3>
            <p style={{ color: '#777', fontSize: '13px', marginBottom: '20px' }}>
              Hãy dạo quanh cửa hàng và chọn những món đồ bạn yêu thích nhé!
            </p>
            <button className="button button-primary" onClick={onClose}>
              Tiếp tục mua sắm
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}
