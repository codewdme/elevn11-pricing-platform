import EmailTemplateClient from "@/emails/EmailTemplateClient";
import { Resend } from "resend";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request, response: Response) {
  try {
    const {
      clientName,
      clientEmailId,
      clientQuotation,
      totalAmount,
      beforeGST,
    } = await request.json();
    console.log(
      clientName,
      clientEmailId,
      clientQuotation,
      totalAmount,
      beforeGST
    );
    const { data, error } = await resend.emails.send({
      from: "connect@adharvcinematics.com",
      to: [`${clientEmailId}`, "vrajbhingradiya.work@gmail.com"],
      // to: ["lll.rg3.lll@gmail.com"],
      subject: ` ${clientName}, Here's your Quotation from Elevn 11 !`,
      react: EmailTemplateClient({
        clientName,
        clientQuotation,
        totalAmount,
        beforeGST,
      }) as React.ReactElement,
    });
    console.log("email sent");

    if (error) {
      console.log(error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
