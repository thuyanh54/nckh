export type Page = 'overview' | 'pricing' | 'products' | 'reports' | 'orders' | 'settings' | 'help'
export type ClientPage = 'home' | 'catalog' | 'bestsellers' | 'recommended' | 'about' | 'contact'

export type Category = 'Nội thất' | 'Thời trang' | 'Gia dụng' | 'Văn phòng' | 'Khác'

export interface Product {
  id: string
  name: string
  category: Category
  image: string
  base: number
  current: number
  stock: number
  status: 'Đang bán' | 'Tạm ẩn'
  description?: string
  specs?: { label: string; value: string }[]
  rating?: number
  reviewCount?: number
  badge?: string
}

export interface SettingsData {
  storeName: string
  email: string
  phone: string
  dynamicPricing: boolean
  autoUpdate: boolean
  emailAlerts: boolean
  lowStockAlerts: boolean
  minPrice: number
  maxIncrease: number
}

export interface PricingFactors {
  season: number
  demand: number
  inventory: number
  sensitivity: number
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  createdAt: string
  items: CartItem[]
  subtotal: number
  discount: number
  shippingFee: number
  totalAmount: number
  customerName: string
  phone: string
  email: string
  address: string
  notes?: string
  paymentMethod: 'cod' | 'vietqr' | 'momo'
  status: 'Chờ xác nhận' | 'Đang giao' | 'Đã hoàn thành' | 'Đã hủy'
}

export interface Review {
  id: string
  productId: string
  author: string
  rating: number
  date: string
  comment: string
}

export interface UserProfile {
  name: string
  email: string
  phone: string
  address: string
}
