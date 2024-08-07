import { Order } from '@/types'

const URL = `${process.env.NEXT_PUBLIC_API_URL}/orders`

export const getOrders = async (): Promise<Order[]> => {
  const res = await fetch(URL)

  return res.json()
}
