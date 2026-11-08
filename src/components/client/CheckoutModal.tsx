import React, { useState } from 'react'
import {
  X,
  CreditCard,
  Truck,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Wallet,
} from 'lucide-react'
import type { CartItem, Order, UserProfile } from '../../types'
import { money, vouchers } from '../../data/mockData'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  voucher: typeof vouchers[0] | null
  user: UserProfile | null
  onPlaceOrder: (order: Order) => void
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  voucher,
  user,
  onPlaceOrder,
}) => {
  const [customerName, setCustomerName] = useState(user?.name ?? '')
  const [phone, setPhone] = useState(user?.phone ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [address, setAddress] = useState(user?.address ?? '')
  const [notes, setNotes] = useState('')
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vietqr' | 'momo'>('cod')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const subtotal = items.reduce((sum, item) => sum + item.product.current * item.quantity, 0)
  let discount = 0
  if (voucher && voucher.percent > 0) {
    discount = Math.min(voucher.maxDiscount, (subtotal * voucher.percent) / 100)
  }
  const shippingFee = subtotal >= 1000000 || voucher?.code === 'FREESHIP' ? 0 : 35000
  const totalAmount = Math.max(0, subtotal - discount + shippingFee)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customerName || !phone || !address) {
      alert('Vui lòng điền đầy đủ thông tin giao hàng!')
      return
    }

    setIsSubmitting(true)

    const newOrder: Order = {
      id: `SM-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: [...items],
      subtotal,
      discount,
      shippingFee,
      totalAmount,
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: email.trim() || 'khachle@shopmart.vn',
      address: address.trim(),
      notes: notes.trim(),
      paymentMethod,
      status: 'Chờ xác nhận',
    }

    setTimeout(() => {
      setIsSubmitting(false)
      onPlaceOrder(newOrder)
    }, 600)
  }

  return (
    <div className="modal-detail-overlay" onClick={onClose}>
      <div
        className="checkout-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={20} color="var(--forest)" />
            <h3 style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: '20px' }}>
              Thanh toán an toàn ShopMart
            </h3>
          </div>
          <button className="icon-button" onClick={onClose} title="Đóng">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="checkout-grid">
          {/* Left Column: Form Details */}
          <div>
            <div className="checkout-section-title">
              <Truck size={17} /> 1. Thông tin giao hàng
            </div>
            <div className="form-grid" style={{ marginBottom: '24px' }}>
              <label>
                Họ và tên người nhận *
                <input
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </label>
              <label>
                Số điện thoại liên hệ *
                <input
                  required
                  placeholder="0912 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
              <label className="form-wide">
                Email nhận hóa đơn & thông báo
                <input
                  type="email"
                  placeholder="ban@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label className="form-wide">
                Địa chỉ nhận hàng chi tiết *
                <input
                  required
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </label>
              <label className="form-wide">
                Ghi chú cho shipper (tùy chọn)
                <input
                  placeholder="Giao giờ hành chính, gọi trước khi đến..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </label>
            </div>

            <div className="checkout-section-title">
              <CreditCard size={17} /> 2. Phương thức thanh toán
            </div>
            <div className="payment-methods-grid">
              {/* COD */}
              <div
                className={`payment-option-card ${paymentMethod === 'cod' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('cod')}
              >
                <Truck size={18} color="var(--forest)" />
                <div style={{ flex: 1 }}>
                  <b>Thanh toán khi nhận hàng (COD)</b>
                  <small>Kiểm tra hàng rồi thanh toán tiền mặt cho shipper</small>
                </div>
                {paymentMethod === 'cod' && (
                  <CheckCircle2 size={16} color="var(--forest)" />
                )}
              </div>

              {/* VietQR */}
              <div
                className={`payment-option-card ${paymentMethod === 'vietqr' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('vietqr')}
              >
                <QrCode size={18} color="var(--forest)" />
                <div style={{ flex: 1 }}>
                  <b>Chuyển khoản VietQR tức thời</b>
                  <small>Quét mã QR tự động điền số tiền và nội dung chuyển khoản</small>
                </div>
                {paymentMethod === 'vietqr' && (
                  <CheckCircle2 size={16} color="var(--forest)" />
                )}
              </div>

              {/* MoMo */}
              <div
                className={`payment-option-card ${paymentMethod === 'momo' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('momo')}
              >
                <Wallet size={18} color="#d82d8b" />
                <div style={{ flex: 1 }}>
                  <b>Ví MoMo / VNPay</b>
                  <small>Thanh toán qua ví điện tử tiện lợi</small>
                </div>
                {paymentMethod === 'momo' && (
                  <CheckCircle2 size={16} color="var(--forest)" />
                )}
              </div>
            </div>

            {/* QR Simulation if selected */}
            {paymentMethod === 'vietqr' && (
              <div className="qr-preview-box">
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#333', marginBottom: '8px' }}>
                  Mã QR thanh toán chuyển khoản:
                </div>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=247-SHOPMART-${totalAmount}`}
                  alt="VietQR Code"
                />
                <div style={{ fontSize: '11px', color: '#666' }}>
                  Ngân hàng: <b>MBBank</b> • STK: <b>0988889999</b> • Số tiền: <b>{money(totalAmount)}</b>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          <div
            style={{
              background: '#f8f6f0',
              padding: '20px',
              borderRadius: '10px',
              border: '1px solid var(--line)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h4
              style={{
                fontFamily: 'var(--serif)',
                fontSize: '17px',
                margin: '0 0 14px',
                paddingBottom: '10px',
                borderBottom: '1px solid #e7e2d6',
              }}
            >
              Đơn hàng của bạn ({items.reduce((s, i) => s + i.quantity, 0)} món)
            </h4>

            {/* Items mini list */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                maxHeight: '220px',
                marginBottom: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {items.map((it) => (
                <div
                  key={it.product.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '12.5px',
                  }}
                >
                  <img
                    src={it.product.image}
                    alt={it.product.name}
                    style={{
                      width: '44px',
                      height: '44px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {it.product.name}
                    </div>
                    <div style={{ color: '#777', fontSize: '11.5px' }}>
                      x{it.quantity} món
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--forest)' }}>
                    {money(it.product.current * it.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '13px',
                color: '#656d62',
                borderTop: '1px solid #e7e2d6',
                paddingTop: '12px',
                marginBottom: '18px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Tiền hàng:</span>
                <span>{money(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    color: '#286747',
                  }}
                >
                  <span>Giảm giá ({voucher?.code}):</span>
                  <span>-{money(discount)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Phí vận chuyển:</span>
                <span>{shippingFee === 0 ? 'Miễn phí' : money(shippingFee)}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: 'var(--forest)',
                  borderTop: '1px solid #e7e2d6',
                  paddingTop: '8px',
                }}
              >
                <span>Tổng cộng:</span>
                <span>{money(totalAmount)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="button button-primary"
              style={{
                width: '100%',
                height: '44px',
                fontSize: '14.5px',
                marginTop: 'auto',
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang xử lý đơn...' : 'Xác nhận Đặt hàng ngay'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
