import React, { useState } from 'react'
import { ShoppingBag, ArrowRight, Check } from 'lucide-react'
import type { ClientPage } from '../../types'

interface ClientFooterProps {
  setCurrentPage: (page: ClientPage) => void
  onSwitchToAdmin: () => void
}

export const ClientFooter: React.FC<ClientFooterProps> = ({
  setCurrentPage,
  onSwitchToAdmin,
}) => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <footer className="client-footer">
      <div className="client-footer-grid">
        {/* Col 1: Brand Info */}
        <div className="footer-col">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span
              style={{
                width: '32px',
                height: '32px',
                background: '#286747',
                borderRadius: '8px',
                display: 'grid',
                placeItems: 'center',
                color: '#fff',
              }}
            >
              <ShoppingBag size={18} />
            </span>
            <span style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 700, color: '#fff' }}>
              ShopMart
            </span>
          </div>
          <p>
            Không gian trải nghiệm mua sắm hiện đại, kết hợp mô hình định giá động
            và thuật toán gợi ý cá nhân hóa nhằm tối ưu lợi ích cho người tiêu dùng.
          </p>
          <div style={{ marginTop: '14px', fontSize: '12px', color: '#90a494' }}>
            Đề tài Nghiên cứu Khoa học Sinh viên 2026
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div className="footer-col">
          <h4>Khám phá</h4>
          <ul className="footer-links">
            <li>
              <button onClick={() => setCurrentPage('home')}>Trang chủ</button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('catalog')}>Tất cả sản phẩm</button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('bestsellers')}>Sản phẩm bán chạy</button>
            </li>
            <li>
              <button onClick={() => setCurrentPage('recommended')}>
                Gợi ý AI cá nhân hóa
              </button>
            </li>
            <li>
              <button onClick={onSwitchToAdmin} style={{ color: '#68b885', fontWeight: 600 }}>
                ⚙️ Không gian Quản trị (Admin)
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Customer Care */}
        <div className="footer-col">
          <h4>Hỗ trợ khách hàng</h4>
          <ul className="footer-links">
            <li>
              <a href="#policy" onClick={(e) => e.preventDefault()}>
                Chính sách giao hàng & kiểm hàng
              </a>
            </li>
            <li>
              <a href="#policy" onClick={(e) => e.preventDefault()}>
                Quy định đổi trả trong 30 ngày
              </a>
            </li>
            <li>
              <a href="#policy" onClick={(e) => e.preventDefault()}>
                Bảo hành chính hãng 24 tháng
              </a>
            </li>
            <li>
              <a href="#faq" onClick={(e) => e.preventDefault()}>
                Câu hỏi thường gặp (FAQ)
              </a>
            </li>
            <li>
              <span style={{ color: '#dbe4dc', fontSize: '13px' }}>
                Hotline hỗ trợ: <b>1800 1234</b>
              </span>
            </li>
          </ul>
        </div>

        {/* Col 4: Newsletter */}
        <div className="footer-col">
          <h4>Đăng ký nhận ưu đãi</h4>
          <p>Nhận ngay mã giảm giá 15% cho đơn hàng đầu tiên của bạn.</p>
          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
            <input
              type="email"
              placeholder="Nhập email của bạn..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                flex: 1,
                height: '38px',
                borderRadius: '6px',
                border: '1px solid #36533e',
                background: '#1d3525',
                color: '#fff',
                padding: '0 12px',
                fontSize: '12.5px',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              className="button button-primary"
              style={{ height: '38px', padding: '0 14px', background: '#286747' }}
            >
              <ArrowRight size={15} />
            </button>
          </form>
          {subscribed && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                color: '#65d28b',
                fontSize: '11.5px',
                marginTop: '8px',
              }}
            >
              <Check size={13} /> Đã đăng ký nhận tin thành công!
            </div>
          )}
        </div>
      </div>

      <div className="footer-bottom">
        <div>© 2026 ShopMart Inc. Bản quyền thuộc về Nhóm Nghiên Cứu Khoa Học.</div>
        <div style={{ display: 'flex', gap: '18px' }}>
          <span>Điều khoản dịch vụ</span>
          <span>Bảo mật thông tin</span>
        </div>
      </div>
    </footer>
  )
}
