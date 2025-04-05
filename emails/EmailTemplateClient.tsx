import { CartItem } from "@/app/checkout/page";
import * as React from "react";

export default function EmailTemplateClient({
  clientName,
  clientQuotation,

  totalAmount,
  beforeGST,
}: any) {
  return (
    <div>
      <h1>{clientName}! Here is your choosen items from Elevn 11.</h1>
      {clientQuotation.map((item: CartItem) => (
        <p key={item.id}>
          {item.name} - {item.quantity}
        </p>
      ))}
      <p>Your total amount before GST is {beforeGST}</p>
      <p>Your total amount after GST is {totalAmount}</p>
    </div>
  );
}
