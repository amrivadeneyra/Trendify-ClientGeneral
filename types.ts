export interface Product {
  id: string
  category: Category
  name: string
  price: string
  isFeatured: boolean
  size: Size
  color: Color
  images: Image[]
}

export interface Image {
  id: string
  url: string
}

export interface Billboard {
  id: string
  label: string
  imageUrl: string
}

export interface Category {
  id: string
  name: string
  billboard: Billboard
}

export interface Size {
  id: string
  name: string
  value: string
}

export interface Color {
  id: string
  name: string
  value: string
}

export interface Order {
  id: string
  orderItems: OrderItem[]
  isPaid: Boolean
  phone: String
  address: String
}

export interface OrderItem {
  id: String
  orderId: String
  order: Order
  productId: String
  product: Product
}
