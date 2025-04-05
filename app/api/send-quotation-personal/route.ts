import EmailTemplatePersonal from "@/emails/EmailTemplatePersonal";
import { Resend } from "resend";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request, response: Response) {
  try {
    const {
      clientName,
      clientNumber,
      clientEmailId,
      clientQuotation,
      clientGSTNumber,
      clientCompanyName,
      totalAmount,
      beforeGST,
    } = await request.json();
    console.log(
      clientName,
      clientNumber,
      clientEmailId,
      clientQuotation,
      clientGSTNumber,
      clientCompanyName,
      totalAmount,
      beforeGST
    );
    console.log(clientQuotation);

    const { data, error } = await resend.emails.send({
      from: "connect@adharvcinematics.com",
      to: ["vrajbhingradiya.work@gmail.com"],
      // to: ["lll.rg3.lll@gmail.com"],
      subject: `Quotation Raised By, ${clientName}`,
      react: EmailTemplatePersonal({
        clientName,
        clientNumber,
        clientEmailId,
        clientQuotation,
        clientGSTNumber,
        clientCompanyName,
        beforeGST,
        totalAmount,
      }) as React.ReactElement,
    });
    console.log("email sent");

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
