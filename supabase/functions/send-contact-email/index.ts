import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Escape user-supplied values before interpolating them into HTML email bodies
// to prevent HTML/CSS injection into outbound emails.
const escapeHtml = (s: string): string =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const jsonResponse = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as Partial<ContactFormData>;

    // ---- Server-side input validation ----
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || name.length > 100) {
      return jsonResponse({ success: false, error: "Invalid name" }, 400);
    }
    if (!email || email.length > 255 || !emailRegex.test(email)) {
      return jsonResponse({ success: false, error: "Invalid email address" }, 400);
    }
    if (phone.length > 50) {
      return jsonResponse({ success: false, error: "Invalid phone" }, 400);
    }
    if (!message || message.length > 2000) {
      return jsonResponse({ success: false, error: "Invalid message" }, 400);
    }

    console.log("Received contact form submission:", { name, email, phone });

    // Pre-escape values for safe HTML interpolation.
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = phone ? escapeHtml(phone) : "Not provided";
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    // Send email to company
    const companyEmailResponse = await resend.emails.send({
      from: "Contact Form <contact@tadeemco.com>",
      to: ["info@tadeemco.com"],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #0066cc; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Contact Information:</h3>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Phone:</strong> ${safePhone}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Message:</h3>
            <div style="background-color: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 5px;">
              ${safeMessage}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>This email was sent from the Tadeemco website contact form.</p>
          </div>
        </div>
      `,
    });

    // Send confirmation email to customer
    const confirmationEmailResponse = await resend.emails.send({
      from: "Tadeemco <info@tadeemco.com>",
      to: [email],
      subject: "We received your message - شكراً لتواصلكم معنا",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0066cc;">Tadeemco</h1>
            <h2 style="color: #333;">Thank you for contacting us</h2>
            <h2 style="color: #333; direction: rtl;">شكراً لتواصلكم معنا</h2>
          </div>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <p>Dear ${safeName},</p>
            <p>We have received your message and will get back to you as soon as possible. Our team typically responds within 24 hours during business days.</p>
            
            <div style="direction: rtl; margin-top: 20px;">
              <p>عزيزي ${safeName}،</p>
              <p>لقد استلمنا رسالتكم وسنقوم بالرد عليكم في أقرب وقت ممكن. يقوم فريقنا عادة بالرد خلال 24 ساعة في أيام العمل.</p>
            </div>
          </div>
          
          <div style="background-color: #e7f3ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #0066cc; margin-top: 0;">Contact Information - معلومات التواصل</h3>
            <p><strong>Address - العنوان:</strong> Kuwait City - Darwaza Building 51 - Floor 6 - Office 30</p>
            <p><strong>Phone - الهاتف:</strong> 90001662, 92223657, 99667785, 90888809</p>
            <p><strong>Email - البريد الإلكتروني:</strong> info@tadeemco.com</p>
            <p><strong>Working Hours - ساعات العمل:</strong> Sunday - Thursday: 8:00 AM - 5:00 PM</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; text-align: center;">
            <p>Tadeemco - Specialized in dewatering, shoring, and excavation</p>
            <p style="direction: rtl;">تدعيمكو - متخصصون في نزح المياه والتدعيم والحفر</p>
          </div>
        </div>
      `,
    });

    console.log("Emails sent successfully:", {
      companyEmail: companyEmailResponse.data?.id,
      confirmationEmail: confirmationEmailResponse.data?.id,
    });

    return jsonResponse(
      {
        success: true,
        message: "Emails sent successfully",
        companyEmailId: companyEmailResponse.data?.id,
        confirmationEmailId: confirmationEmailResponse.data?.id,
      },
      200,
    );
  } catch (error: any) {
    // Log full diagnostics server-side only; return a generic message to callers.
    console.error("Error in send-contact-email function:", error);
    return jsonResponse(
      { success: false, error: "Failed to send message. Please try again." },
      500,
    );
  }
};

serve(handler);
