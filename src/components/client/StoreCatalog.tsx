import React, { useState, useMemo } from 'react'
import { RotateCcw, Package } from 'lucide-react'
import type { Product } from '../../types'
import { ProductCard } from './ProductCard'
import { categories, money } from '../../data/mockData'

interface StoreCatalogProps {
  products: Product[]
  searchQuery: string
  setSearchQuery: (q: string) => void
  onQuickView: (product: Product) => void
  onAddToCart: (product: Product) => void
  wishlistIds: string[]
  onToggleWishlist: (product: Product) => void
  initialCategory?: string
}

export const StoreCatalog: React.FC<StoreCatalogProps> = ({
  products,
  searchQuery,
  setSearchQuery,
  onQuickView,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  initialCategory = 'Tất cả',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [maxPrice, setMaxPrice] = useState<number>(15000000)
  const [inStockOnly, setInStockOnly] = useState<boolean>(false)
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured')

  // Filter products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'Tất cả' && p.category !== selectedCategory) return false
        // Search query
        if (
          searchQuery &&
          !`${p.name} ${p.id} ${p.category} ${p.description ?? ''}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        ) {
          return false
        }
        // Max price filter
        if (p.current > maxPrice) return false
        // Stock filter
        if (inStockOnly && p.stock <= 0) return false

        return true
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.current - b.current
        if (sortBy === 'price-desc') return b.current - a.current
        if (sortBy === 'rating') return (b.rating ?? 0) - (a.rating ?? 0)
        return 0
      })
  }, [products, selectedCategory, searchQuery, maxPrice, inStockOnly, sortBy])

  const resetFilters = () => {
    setSelectedCategory('Tất cả')
    setMaxPrice(15000000)
    setInStockOnly(false)
    setSearchQuery('')
    setSortBy('featured')
  }

  return (
    <div>
      {/* Page Title & Breadcrumb */}
      <div style={{ marginBottom: '24px' }}>
        <h1
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '32px',
            fontWeight: 600,
            margin: '0 0 8px',
            color: 'var(--ink)',
          }}
        >
          Cửa hàng ShopMart
        </h1>
        <p style={{ color: '#6e776b', fontSize: '14px', margin: 0 }}>
          Hiển thị <b>{filteredProducts.length}</b> sản phẩm phù hợp
        </p>
      </div>

      <div className="catalog-page-layout">
        {/* Sidebar Filters */}
        <aside className="catalog-sidebar">
          <div className="catalog-sidebar-title">
            <span>Bộ lọc tìm kiếm</span>
            <button
              onClick={resetFilters}
              style={{
                background: 'none',
                border: 0,
                color: 'var(--forest)',
                fontSize: '11.5px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <RotateCcw size={12} /> Đặt lại
            </button>
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <div className="filter-title">Danh mục</div>
            <div className="filter-options">
              <label className="filter-label-row">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === 'Tất cả'}
                  onChange={() => setSelectedCategory('Tất cả')}
                />
                <span>Tất cả</span>
                <span className="filter-count">({products.length})</span>
              </label>
              {categories.map((c) => (
                <label key={c} className="filter-label-row">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === c}
                    onChange={() => setSelectedCategory(c)}
                  />
                  <span>{c}</span>
                  <span className="filter-count">
                    ({products.filter((p) => p.category === c).length})
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="filter-group">
            <div className="filter-title">
              Khoảng giá: <span style={{ color: 'var(--forest)' }}>{money(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="200000"
              max="15000000"
              step="100000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--forest)' }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: '#888',
                marginTop: '6px',
              }}
            >
              <span>200.000₫</span>
              <span>15.000.000₫</span>
            </div>
          </div>

          {/* Stock Availability */}
          <div className="filter-group">
            <div className="filter-title">Tình trạng hàng</div>
            <label className="filter-label-row">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              <span>Chỉ xem sản phẩm còn hàng</span>
            </label>
          </div>
        </aside>

        {/* Main Products Area */}
        <main>
          {/* Top Sort & Search summary */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#fff',
              border: '1px solid #e8e5dc',
              borderRadius: '8px',
              padding: '12px 18px',
              marginBottom: '20px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
            }}
          >
            <div style={{ fontSize: '13px', color: '#656e62', display: 'flex', alignItems: 'center', gap: '8px' }}>
              {searchQuery && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  Đang lọc theo từ khóa: <b style={{ color: '#174b35' }}>"{searchQuery}"</b>
                  <button
                    onClick={() => setSearchQuery('')}
                    style={{
                      background: '#f2eee6',
                      border: '1px solid #dcd7ca',
                      borderRadius: '12px',
                      padding: '2px 8px',
                      fontSize: '11px',
                      cursor: 'pointer',
                      color: '#333',
                      fontWeight: 600,
                    }}
                    title="Xóa từ khóa tìm kiếm"
                  >
                    ✕ Xóa tìm kiếm
                  </button>
                </span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: '#777' }}>Sắp xếp theo:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                style={{
                  border: '1px solid #dcd7ca',
                  borderRadius: '5px',
                  padding: '5px 10px',
                  fontSize: '12.5px',
                  background: '#faf8f3',
                  color: 'var(--ink)',
                  outline: 'none',
                }}
              >
                <option value="featured">Nổi bật nhất</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="rating">Đánh giá cao nhất</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="client-product-grid" style={{ marginBottom: 0 }}>
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
          ) : (
            <div className="empty-state" style={{ background: '#fff', borderRadius: '10px' }}>
              <Package size={36} color="#889a88" />
              <h3>Không tìm thấy sản phẩm phù hợp</h3>
              <p>Thử điều chỉnh lại bộ lọc hoặc từ khóa tìm kiếm của bạn.</p>
              <button className="button button-outline" onClick={resetFilters}>
                Xóa tất cả bộ lọc
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
