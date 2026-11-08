import React from 'react'
import { CheckCircle2, PackageCheck, ShoppingBag } from 'lucide-react'
import type { Order } from '../../types'
import { money } from '../../data/mockData'

interface OrderSuccessModalProps {
  order: Order | null
  onClose: () => void
  onViewOrders: () => void
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onViewOrders,
}) => {
  if (!order) return null

  return (
    <div className="modal-detail-overlay">
      <div
        className="modal-detail-card"
        style={{
          maxWidth: '520px',
          padding: '36px 32px',
          textAlign: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#e4efe1',
            color: 'var(--forest)',
            display: 'grid',
            placeItems: 'center',
            marginBottom: '16px',
          }}
        >
          <CheckCircle2 size={36} />
        </div>

        <h2
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '26px',
            margin: '0 0 8px',
            color: 'var(--ink)',
          }}
        >
          Đặt hàng thành công!
        </h2>
        <p style={{ color: '#667064', fontSize: '14px', margin: '0 0 20px', lineHeight: 1.6 }}>
          Cảm ơn bạn <b>{order.customerName}</b> đã mua sắm tại ShopMart. Đơn hàng của bạn đã được tiếp nhận và đang được chuẩn bị.
        </p>

        {/* Order Details Card */}
        <div
          style={{
            width: '100%',
            background: '#f8f6f0',
            borderRadius: '8px',
            padding: '16px',
            textAlign: 'left',
            marginBottom: '24px',
            border: '1px solid #ebe5d8',
            fontSize: '13px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#777' }}>Mã đơn hàng:</span>
            <b style={{ color: 'var(--forest)' }}>{order.id}</b>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#777' }}>Số lượng sản phẩm:</span>
            <b>{order.items.reduce((s, i) => s + i.quantity, 0)} món</b>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#777' }}>Tổng thanh toán:</span>
            <b style={{ color: 'var(--forest)', fontSize: '15px' }}>{money(order.totalAmount)}</b>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#777' }}>Phương thức:</span>
            <b>
              {order.paymentMethod === 'cod'
                ? 'Tiền mặt khi nhận (COD)'
                : order.paymentMethod === 'vietqr'
                ? 'Chuyển khoản VietQR'
                : 'Ví điện tử'}
            </b>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
          <button
            className="button button-outline"
            style={{ flex: 1, height: '42px' }}
            onClick={onClose}
          >
            <ShoppingBag size={15} /> Tiếp tục mua
          </button>
          <button
            className="button button-primary"
            style={{ flex: 1.2, height: '42px' }}
            onClick={() => {
              onClose()
              onViewOrders()
            }}
          >
            <PackageCheck size={16} /> Xem đơn của tôi
          </button>
        </div>
      </div>
    </div>
  )
}
