"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Info, PartyPopper } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define types for cart items
export interface CartItem {
  id: string;
  type: "shoot" | "edit" | "graphic" | "addon";
  name: string;
  description: string;
  basePrice: number;
  quantity: number;
  options?: {
    [key: string]: any;
  };
}

export default function Checkout() {
  const router = useRouter();
  const [promoCode, setPromoCode] = useState("");
  const [appliedCode, setAppliedCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0); // No default discount
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderSummary, setOrderSummary] = useState({
    items: [] as CartItem[],
    subtotal: 0,
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    gst: "",
  });
  const [showPromoSuccess, setShowPromoSuccess] = useState(false);
  const [savedAmount, setSavedAmount] = useState(0);

  const handleConfirmQuotation = async () => {
    const response = await fetch("/api/send-quotation", {
      method: "POST",
      body: JSON.stringify({
        clientName: formData.name,
        clientNumber: formData.phone,
        clientEmailId: formData.email,
        clientQuotation: cartItems,
        clientGSTNumber: formData.gst,
        clientCompanyName: formData.company,
        totalAmount: grandTotal,
        beforeGST: orderSummary.subtotal,
      }),
    });

    if (response.ok) {
      setShowConfirmation(true);
      return true;
    } else {
      alert("Failed to send quotation");
      return false;
    }
  };
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    phone: false,
  });

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart) as CartItem[];
        setCartItems(parsedCart);

        // Calculate subtotal
        const subtotal = parsedCart.reduce((sum, item) => {
          return sum + item.basePrice * item.quantity;
        }, 0);

        setOrderSummary({
          items: parsedCart,
          subtotal,
        });
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "elevn11@2025") {
      setAppliedCode(promoCode);
      setDiscountPercent(25);
      const discount = Math.round(orderSummary.subtotal * 0.25);
      setSavedAmount(discount);
      setShowPromoSuccess(true);
    } else {
      alert("Invalid promo code");
    }
  };

  // Calculate discount and total
  const discount = appliedCode
    ? Math.round(orderSummary.subtotal * (discountPercent / 100))
    : 0;
  const total = orderSummary.subtotal - discount;
  const gst = Math.round(total * 0.18); // 18% GST
  const grandTotal = total + gst;

  // Format price to Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const validateForm = () => {
    const errors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !formData.email.includes("@"),
      phone: !formData.phone.trim(),
    };
    setFormErrors(errors);
    return !Object.values(errors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTotalAmount(grandTotal);
    if (validateForm()) {
      if (await handleConfirmQuotation()) {
        setShowConfirmation(true);
      }
    }
  };

  const isFormValid =
    formData.name.trim() &&
    formData.email.trim() &&
    formData.email.includes("@") &&
    formData.phone.trim();

  return (
    <div className="container py-8 px-4 md:px-6 max-w-6xl">
      <div className="flex items-center mb-8">
        <Link
          href="/custom-builder"
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Builder
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your custom package</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {orderSummary.items.length === 0 ? (
                  <div className="text-center py-4 text-muted-foreground">
                    <p>Your cart is empty</p>
                    <Link
                      href="/custom-builder"
                      className="text-primary hover:underline block mt-2"
                    >
                      Go back to build your package
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orderSummary.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>
                          {item.name}{" "}
                          {item.quantity > 1 ? `(${item.quantity})` : ""}
                        </span>
                        <span>
                          {formatPrice(item.basePrice * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(orderSummary.subtotal)}</span>
                  </div>

                  {/* Only show discount if a promo code is applied */}
                  {appliedCode && (
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>
                        Discount ({discountPercent}% - Code: {appliedCode})
                      </span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Total (before tax)</span>
                    <span>{formatPrice(total)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span>GST (18%)</span>
                    <span>{formatPrice(gst)}</span>
                  </div>

                  <div className="flex justify-between font-bold text-lg pt-2">
                    <span>Grand Total</span>
                    <span>{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Label htmlFor="promo-code">Apply Coupon</Label>
                  <div className="flex gap-2 mt-1">
                    <Select
                      value={promoCode}
                      onValueChange={(value) => {
                        setPromoCode(value);
                        if (value === "eleven11-save15") {
                          setAppliedCode(value);
                          setDiscountPercent(15);
                          const discount = Math.round(
                            orderSummary.subtotal * 0.15
                          );
                          setSavedAmount(discount);
                          setShowPromoSuccess(true);
                        }
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a coupon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eleven11-save15">
                          eleven11-save15 - 15% OFF
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {appliedCode && (
                    <div className="flex items-center mt-2 text-sm text-green-600">
                      <Check className="h-4 w-4 mr-1" />
                      <span>Coupon applied successfully!</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Terms & Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div>
                    <h3 className="font-medium mb-1">Shoots</h3>
                    <p className="text-muted-foreground">
                      Standard shoot duration is 4 hours. Raw files are
                      included. Additional hours are charged at ₹1,500/hr.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Edits</h3>
                    <p className="text-muted-foreground">
                      Delivery time is 48-72 hours. Basic retouching included.
                      Complex edits may require additional time.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Graphics</h3>
                    <p className="text-muted-foreground">
                      Includes 2 revisions per graphic. Optimized for all social
                      media platforms.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Contract Terms</h3>
                    <p className="text-muted-foreground">
                      Monthly plans require a minimum 2-month commitment.
                      One-time packages include a 10% markup.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Contact Details</CardTitle>
                <CardDescription>
                  Please provide your information to receive the quotation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className={formErrors.name ? "border-red-500" : ""}
                    />
                    {formErrors.name && (
                      <p className="text-sm text-red-500">Name is required</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className={formErrors.email ? "border-red-500" : ""}
                    />
                    {formErrors.email && (
                      <p className="text-sm text-red-500">
                        Valid email is required
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 1234567890"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className={formErrors.phone ? "border-red-500" : ""}
                    />
                    {formErrors.phone && (
                      <p className="text-sm text-red-500">
                        Phone number is required
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name (Optional)</Label>
                    <Input
                      id="company"
                      placeholder="Acme Inc."
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gst">GST Number (Optional)</Label>
                    <Input
                      id="gst"
                      placeholder="GST Number"
                      value={formData.gst}
                      onChange={(e) =>
                        setFormData({ ...formData, gst: e.target.value })
                      }
                    />
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={!isFormValid || orderSummary.items.length === 0}
                >
                  Confirm Quotation
                </Button>
                <p className="text-xs text-muted-foreground mt-4 text-center">
                  By confirming, you agree to our Terms of Service and Privacy
                  Policy.
                </p>
              </CardFooter>
            </Card>

            <Alert className="mt-6 border-primary/20 bg-primary/5">
              <AlertDescription className="text-sm">
                <span className="font-medium">Next Steps:</span> Our team will
                review your request and contact you shortly.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-[80vw] sm:max-w-md sm:mx-0 ">
          <DialogHeader>
            <DialogTitle className="pt-8">
              Quotation Request Confirmed!
            </DialogTitle>
            <DialogDescription className="text-base py-2">
              We have sent the quotation to your email and WhatsApp. Our team
              will connect with you shortly with the final invoice and terms of
              agreement.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end ">
            <Button
              onClick={() => {
                setShowConfirmation(false);
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  company: "",
                  gst: "",
                });
                setCartItems([]);
                router.push("/custom-builder");
              }}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPromoSuccess} onOpenChange={setShowPromoSuccess}>
        <DialogContent className="max-w-[80vw] sm:max-w-md sm:mx-0">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <PartyPopper className="h-12 w-12 text-primary animate-bounce" />
            </div>
            <DialogTitle className="text-center text-2xl">
              Promo Code Applied!
            </DialogTitle>
            <DialogDescription className="text-center text-lg py-4">
              You saved {formatPrice(savedAmount)}! 🎉
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <Button onClick={() => setShowPromoSuccess(false)}>
              Let's get started
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
