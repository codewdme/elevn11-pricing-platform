import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface PlanCardProps {
  title: string
  price: number
  discountedPrice: number
  features: string[]
  popular?: boolean
}

export function PlanCard({ title, price, discountedPrice, features, popular = false }: PlanCardProps) {
  // Format price to Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <Card className={`flex flex-col ${popular ? "border-primary shadow-lg" : ""}`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>Monthly plan</CardDescription>
          </div>
          {popular && <Badge className="bg-primary">Popular</Badge>}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-baseline mb-4">
          <span className="text-3xl font-bold">{formatPrice(discountedPrice)}</span>
          <span className="ml-2 text-muted-foreground line-through">{formatPrice(price)}</span>
          <span className="ml-2 text-sm text-muted-foreground">/month</span>
        </div>
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-4 w-4 mr-2 mt-1 text-primary" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto">
        <Link href="/checkout" className="w-full">
          <Button className="w-full" variant={popular ? "default" : "outline"}>
            Select Plan
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

