"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CartItem } from "../checkout/page";

// Define types for our items

interface ShopItem extends Omit<CartItem, "quantity"> {}

export default function CustomBuilder() {
  const router = useRouter();
  const cartRef = useRef<HTMLDivElement>(null);

  // Available items to add to cart
  const shootItems: ShopItem[] = [
    {
      id: "basic-shoot",
      type: "shoot",
      name: "Basic Shoot",
      description: "Standard 4-hour shoot with phone-quality camera",
      basePrice: 4000,
      options: { shootType: "phone" },
    },
    {
      id: "premium-shoot",
      type: "shoot",
      name: "Premium Shoot",
      description: "Standard 4-hour shoot with professional camera",
      basePrice: 5000,
      options: { shootType: "camera" },
    },
    {
      id: "food-shoot",
      type: "shoot",
      name: "Food Shoot",
      description: "Specialized 4-hour shoot for food photography",
      basePrice: 5500,
      options: { shootType: "camera", foodShoot: true },
    },
    {
      id: "extended-shoot",
      type: "shoot",
      name: "Extended Shoot",
      description: "8-hour shoot with professional camera",
      basePrice: 10000,
      options: { shootType: "camera", extraHours: 4 },
    },
  ];

  const editItems: ShopItem[] = [
    {
      id: "basic-edit",
      type: "edit",
      name: "Basic Edit",
      description: "Simple color correction and basic retouching",
      basePrice: 1000,
      options: { complexity: "basic" },
    },
    {
      id: "standard-edit",
      type: "edit",
      name: "Standard Edit",
      description: "Color grading, retouching, and basic effects",
      basePrice: 1500,
      options: { complexity: "moderate" },
    },
    {
      id: "premium-edit",
      type: "edit",
      name: "Premium Edit",
      description: "Advanced retouching, effects, and compositing",
      basePrice: 2500,
      options: { complexity: "high" },
    },
    {
      id: "vlog-edit",
      type: "edit",
      name: "Vlog Edit",
      description: "10min vlog video edit",
      basePrice: 3000,
      options: { complexity: "high" },
    },
    {
      id: "long-edit",
      type: "edit",
      name: "Long Edit",
      description: "5min basic long video edit",
      basePrice: 3000,
      options: { complexity: "high" },
    },
  ];

  const graphicItems: ShopItem[] = [
    {
      id: "social-graphic",
      type: "graphic",
      name: "Social Media Graphic",
      description: "Custom graphic optimized for social media platforms",
      basePrice: 600,
    },
    {
      id: "promotional-graphic",
      type: "graphic",
      name: "Promotional Graphic",
      description: "Eye-catching promotional material for campaigns",
      basePrice: 700,
    },
    {
      id: "logo-design",
      type: "graphic",
      name: "Logo Design",
      description:
        "Custom logo design for your brand and a brand kit with 3 revisions",
      basePrice: 5000,
    },
    {
      id: "motion-graphic",
      type: "graphic",
      name: "Motion Graphic",
      description: "Custom motion graphic for your brand",
      basePrice: 4000,
    },
  ];

  const addonItems: ShopItem[] = [
    {
      id: "social-media-management",
      type: "addon",
      name: "Social Media Management",
      description: "Complete management of your social media accounts",
      basePrice: 5000,
    },
    {
      id: "meta-ads",
      type: "addon",
      name: "Meta Ads",
      description: "Facebook and Instagram ad campaign management",
      basePrice: 5000,
    },
    {
      id: "google-ads",
      type: "addon",
      name: "Google Ads",
      description: "Google search and display ad campaign management",
      basePrice: 5000,
    },
    {
      id: "dm-handling",
      type: "addon",
      name: "DM Handling",
      description: "Management of direct messages across platforms",
      basePrice: 5000,
    },
    {
      id: "google-queries",
      type: "addon",
      name: "Google Queries",
      description: "Monitoring and responding to Google reviews and queries",
      basePrice: 5000,
    },
  ];

  // State for cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // State for cart summary
  const [cartSummary, setCartSummary] = useState({
    subtotal: 0,
    total: 0,
  });

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  // Update cart summary whenever cart items change
  useEffect(() => {
    const subtotal = cartItems.reduce((sum, item) => {
      return sum + item.basePrice * item.quantity;
    }, 0);

    setCartSummary({
      subtotal,
      total: subtotal,
    });

    // Save cart to localStorage whenever it changes
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (item: Omit<CartItem, "quantity">) => {
    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItemIndex >= 0) {
      // Increment quantity if item already exists
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      setCartItems(updatedItems);
    } else {
      // Add new item with quantity 1
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // Update item quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedItems);
  };

  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Format price to Indian Rupees
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Handle checkout button click
  const handleCheckout = () => {
    // Save cart to localStorage before navigating
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // Navigate to checkout page
    router.push("/checkout");
  };

  const scrollToCart = () => {
    cartRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container py-8 px-4 md:px-6 max-w-7xl">
      <div className="flex items-center mb-8">
        <Link
          href="/"
          className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </div>

      {/* Floating Cart Button - Mobile Only */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <Button
          size="sm"
          className="rounded-full shadow-lg bg-background border border-border hover:bg-accent"
          onClick={scrollToCart}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          <Badge variant="secondary" className="ml-1">
            {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          </Badge>
        </Button>
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Custom Plan Builder
        </h1>
        <p className="text-muted-foreground mb-8">
          Build your perfect content creation package by adding exactly what you
          need.
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Services Selection */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="shoots" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="shoots">Shoots</TabsTrigger>
                <TabsTrigger value="edits">Edits</TabsTrigger>
                <TabsTrigger value="graphics">Graphics</TabsTrigger>
                <TabsTrigger value="addons">Add-ons</TabsTrigger>
              </TabsList>

              <TabsContent value="shoots" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {shootItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold mb-2">
                          {formatPrice(item.basePrice)}
                        </div>
                        <div className="text-sm text-muted-foreground mb-4">
                          {item.options?.shootType === "camera" &&
                            "Professional camera • "}
                          {item.options?.foodShoot && "Food specialized • "}
                          {item.options?.extraHours
                            ? `${4 + item.options.extraHours} hours`
                            : "4 hours"}
                        </div>
                      </CardContent>
                      <CardFooter className="bg-muted/50 pt-3">
                        <Button
                          onClick={() => addToCart(item)}
                          className="w-full"
                        >
                          Add to Package
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="edits" className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  {editItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold mb-2">
                          {formatPrice(item.basePrice)}
                        </div>
                        <div className="text-sm text-muted-foreground mb-4">
                          {item.options?.complexity === "basic" &&
                            "Basic complexity"}
                          {item.options?.complexity === "moderate" &&
                            "Moderate complexity"}
                          {item.options?.complexity === "high" &&
                            "High complexity"}
                        </div>
                      </CardContent>
                      <CardFooter className="bg-muted/50 pt-3">
                        <Button
                          onClick={() => addToCart(item)}
                          className="w-full"
                        >
                          Add to Package
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="graphics" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {graphicItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold mb-2">
                          {formatPrice(item.basePrice)}
                        </div>
                        <div className="text-sm text-muted-foreground mb-4">
                          Includes 2 revisions
                        </div>
                      </CardContent>
                      <CardFooter className="bg-muted/50 pt-3">
                        <Button
                          onClick={() => addToCart(item)}
                          className="w-full"
                        >
                          Add to Package
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="addons" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {addonItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold mb-2">
                          {formatPrice(item.basePrice)}
                        </div>
                        <div className="text-sm text-muted-foreground mb-4">
                          Monthly service
                        </div>
                      </CardContent>
                      <CardFooter className="bg-muted/50 pt-3">
                        <Button
                          onClick={() => addToCart(item)}
                          className="w-full"
                        >
                          Add to Package
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1" ref={cartRef}>
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Your Custom Package</CardTitle>
                    <Badge variant="outline" className="flex items-center">
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </Badge>
                  </div>
                  <CardDescription>Items in your package</CardDescription>
                </CardHeader>
                <CardContent>
                  {cartItems.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p>Your package is empty</p>
                      <p className="text-sm mt-1">
                        Add items from the left to get started
                      </p>
                    </div>
                  ) : (
                    <ScrollArea className="h-[300px] pr-4">
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-start justify-between pb-4 border-b"
                          >
                            <div className="flex-1">
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {formatPrice(item.basePrice)} each
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(cartSummary.subtotal)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(cartSummary.total)}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      *GST will be calculated at checkout
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    disabled={cartItems.length === 0}
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>

              <div className="mt-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Not sure what to choose? Our team can help you build the
                      perfect package for your needs.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full mt-4"
                      onClick={() => {
                        window.location.href = "tel:+918058890919";
                      }}
                    >
                      Contact Us
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
