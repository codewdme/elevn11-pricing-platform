// Pricing calculation logic

interface CartItem {
  id: string
  type: "shoot" | "edit" | "graphic" | "addon"
  name: string
  description: string
  basePrice: number
  quantity: number
  options?: {
    [key: string]: any
  }
}

interface PricingSummary {
  subtotal: number
  total: number
}

export function calculateCartSummary(items: CartItem[]): PricingSummary {
  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => {
    return sum + item.basePrice * item.quantity
  }, 0)

  // Total is now equal to subtotal (no discount)
  const total = subtotal

  return {
    subtotal,
    total,
  }
}

