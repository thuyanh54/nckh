import React, { useState } from 'react'
import { X, Package } from 'lucide-react'
import type { Order } from '../../types'
import { money } from '../../data/mockData'

interface UserOrdersModalProps {
  isOpen: boolean
  onClose: () => void
  orders: Order[]
  onAddToCart?: (product: any) => void
}

export const UserOrdersModal: React.FC<UserOrdersModalProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  const [activeTab, setActiveTab] = useState<string>('Tất cả')

  if (!isOpen) return null

  const filteredOrders =
    activeTab === 'Tất cả'
      ? orders
      : orders.filter((o) => o.status === activeTab)

  return (
    <div className="modal-detail-overlay" onClick={onClose}>
      <div className="user-orders-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid var(--line)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#faf8f3',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Package size={20} color="var(--forest)" />
            <h3 style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: '20px' }}>
              Đơn hàng của tôi ({orders.length})
            </h3>
          </div>
          <button className="icon-button" onClick={onClose} title="Đóng">
            <X size={18} />
          </button>
        </div>

        {/* Status Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            padding: '12px 24px',
            borderBottom: '1px solid #eee',
            background: '#fff',
            overflowX: 'auto',
          }}
        >
          {['Tất cả', 'Chờ xác nhận', 'Đang giao', 'Đã hoàn thành'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                border: 0,
                background: activeTab === tab ? '#e6efe3' : 'transparent',
                color: activeTab === tab ? 'var(--forest)' : '#666',
                fontWeight: activeTab === tab ? 700 : 500,
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '12.5px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Orders list */}
        <div className="orders-table-wrap">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.id} className="order-card-box">
                <div className="order-card-header">
                  <div>
                    <span className="order-id-badge">{order.id}</span>
                    <span style={{ color: '#888', fontSize: '12px', marginLeft: '12px' }}>
                      Ngày đặt: {order.createdAt}
                    </span>
                  </div>
                  <span
                    className={`order-status-badge ${
                      order.status === 'Chờ xác nhận'
                        ? 'status-pending'
                        : order.status === 'Đang giao'
                        ? 'status-shipping'
                        : 'status-done'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                  {order.items.map((it, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '13px',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <img
                          src={it.product.image}
                          alt={it.product.name}
                          style={{
                            width: '40px',
                            height: '40px',
                            objectFit: 'cover',
                            borderRadius: '6px',
                          }}
                        />
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--ink)' }}>
                            {it.product.name}
                          </div>
                          <small style={{ color: '#888' }}>Số lượng: {it.quantity}</small>
                        </div>
                      </div>
                      <b style={{ color: 'var(--forest)' }}>
                        {money(it.product.current * it.quantity)}
                      </b>
                    </div>
                  ))}
                </div>

                {/* Footer Info */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid #f0eee6',
                    paddingTop: '12px',
                    fontSize: '12.5px',
                  }}
                >
                  <div style={{ color: '#777', maxWidth: '380px' }}>
                    Giao tới: <b>{order.address}</b> ({order.customerName} - {order.phone})
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '11px', color: '#888' }}>Tổng tiền thanh toán</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--forest)' }}>
                      {money(order.totalAmount)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state" style={{ padding: '40px 20px', textAlign: 'center' }}>
              <Package size={36} color="#9aa799" />
              <h4 style={{ margin: '12px 0 6px', fontFamily: 'var(--serif)' }}>
                Không có đơn hàng nào
              </h4>
              <p style={{ color: '#888', fontSize: '13px' }}>
                Bạn chưa có đơn hàng nào trong trạng thái này.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
