import React, { useState } from 'react'
import { X, Sparkles } from 'lucide-react'
import type { UserProfile } from '../../types'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLoginSuccess: (user: UserProfile) => void
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [isRegister, setIsRegister] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ email và mật khẩu')
      return
    }

    if (isRegister && !name) {
      setError('Vui lòng nhập họ và tên của bạn')
      return
    }

    const loggedUser: UserProfile = {
      name: isRegister ? name.trim() : name.trim() || 'Nguyễn Khách Hàng',
      email: email.trim(),
      phone: phone.trim() || '0912 345 678',
      address: address.trim() || 'Số 12, Phố Cầu Giấy, Hà Nội',
    }

    onLoginSuccess(loggedUser)
    onClose()
  }

  // Quick demo login
  const handleQuickDemoLogin = () => {
    const demoUser: UserProfile = {
      name: 'Ngọc Ngân',
      email: 'ngocngan@gmail.com',
      phone: '0912 345 678',
      address: 'Số 45, Đường Lê Duẩn, Quận 1, TP. Hồ Chí Minh',
    }
    onLoginSuccess(demoUser)
    onClose()
  }

  return (
    <div className="modal-detail-overlay" onClick={onClose}>
      <div className="auth-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '18px',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--serif)',
              fontSize: '22px',
              margin: 0,
              color: 'var(--ink)',
            }}
          >
            {isRegister ? 'Tạo tài khoản mới' : 'Đăng nhập tài khoản'}
          </h3>
          <button className="icon-button" onClick={onClose} title="Đóng">
            <X size={18} />
          </button>
        </div>

        {/* Tab switch */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab-btn ${!isRegister ? 'active' : ''}`}
            onClick={() => {
              setIsRegister(false)
              setError('')
            }}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${isRegister ? 'active' : ''}`}
            onClick={() => {
              setIsRegister(true)
              setError('')
            }}
          >
            Đăng ký
          </button>
        </div>

        {error && (
          <div
            style={{
              color: '#bd4538',
              background: '#fdf2f1',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              marginBottom: '14px',
            }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '12px' }}>
          {isRegister && (
            <label style={{ display: 'grid', gap: '5px', fontSize: '12px', color: '#666' }}>
              Họ và tên *
              <input
                required
                placeholder="Nguyễn Văn A"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  height: '38px',
                  borderRadius: '6px',
                  border: '1px solid #dcd7ca',
                  padding: '0 12px',
                  fontSize: '13px',
                }}
              />
            </label>
          )}

          <label style={{ display: 'grid', gap: '5px', fontSize: '12px', color: '#666' }}>
            Địa chỉ Email *
            <input
              required
              type="email"
              placeholder="tenban@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                height: '38px',
                borderRadius: '6px',
                border: '1px solid #dcd7ca',
                padding: '0 12px',
                fontSize: '13px',
              }}
            />
          </label>

          <label style={{ display: 'grid', gap: '5px', fontSize: '12px', color: '#666' }}>
            Mật khẩu *
            <input
              required
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                height: '38px',
                borderRadius: '6px',
                border: '1px solid #dcd7ca',
                padding: '0 12px',
                fontSize: '13px',
              }}
            />
          </label>

          {isRegister && (
            <>
              <label style={{ display: 'grid', gap: '5px', fontSize: '12px', color: '#666' }}>
                Số điện thoại
                <input
                  placeholder="0912 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    height: '38px',
                    borderRadius: '6px',
                    border: '1px solid #dcd7ca',
                    padding: '0 12px',
                    fontSize: '13px',
                  }}
                />
              </label>

              <label style={{ display: 'grid', gap: '5px', fontSize: '12px', color: '#666' }}>
                Địa chỉ giao hàng mặc định
                <input
                  placeholder="Quận/Huyện, Tỉnh/Thành..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{
                    width: '100%',
                    height: '38px',
                    borderRadius: '6px',
                    border: '1px solid #dcd7ca',
                    padding: '0 12px',
                    fontSize: '13px',
                  }}
                />
              </label>
            </>
          )}

          <button
            type="submit"
            className="button button-primary"
            style={{ width: '100%', height: '40px', marginTop: '8px' }}
          >
            {isRegister ? 'Đăng ký ngay' : 'Đăng nhập'}
          </button>
        </form>

        {/* Demo 1-click button for presentation */}
        <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid #eee' }}>
          <button
            type="button"
            className="button button-outline"
            style={{ width: '100%', height: '36px', fontSize: '12px', color: 'var(--forest)' }}
            onClick={handleQuickDemoLogin}
          >
            <Sparkles size={14} /> Đăng nhập nhanh tài khoản mẫu (Demo)
          </button>
        </div>
      </div>
    </div>
  )
}
