import { CartItem } from "@/app/checkout/page";
import * as React from "react";

export default function EmailTemplatePersonal({
  clientName,
  clientNumber,
  clientEmailId,
  clientQuotation,
  clientGSTNumber,
  clientCompanyName,
  totalAmount,
  beforeGST,
}: any) {
  return (
    <div>
      <h1>Quotation Raised By, {clientName}!</h1>
      <p>Client Number: {clientNumber}</p>
      <p>Client EmailId: {clientEmailId}</p>
      {clientQuotation.map((item: CartItem) => (
        <p key={item.id}>
          {item.name} - {item.quantity}
        </p>
      ))}
      <p>Total Amount: {totalAmount}</p>
      <p>Total Amount Before GST: {beforeGST}</p>
      <p>Client GST Number: {clientGSTNumber}</p>
      <p>Client Company Name: {clientCompanyName}</p>
    </div>
  );
}
