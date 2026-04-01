import { NextRequest, NextResponse } from "next/server";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const TO_EMAIL = "arjunvarma5110@gmail.com";

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();
  if (!name || !email || !message) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  if (!RESEND_API_KEY) return NextResponse.json({ error: "Email not configured" }, { status: 500 });

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New Message — Arjun Portfolio</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:48px 20px;">
    <tr><td align="center">
      <table width="500" cellpadding="0" cellspacing="0">

        <!-- Nav-style header -->
        <tr>
          <td style="background:#ffffff;border:1px solid #e3e3e3;border-radius:14px 14px 0 0;padding:18px 32px;border-bottom:none;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="font-size:16px;font-weight:800;color:#141414;letter-spacing:-0.4px;">Arjun Varma</span>
                </td>
                <td align="right">
                  <span style="display:inline-block;background:#eff6ff;color:#2563eb;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:4px 10px;border-radius:20px;border:1px solid #dbeafe;">New Message</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Primary accent line -->
        <tr>
          <td style="background:#2563eb;height:2px;"></td>
        </tr>

        <!-- Main card body -->
        <tr>
          <td style="background:#ffffff;border:1px solid #e3e3e3;border-top:none;border-bottom:none;padding:40px 32px 32px;">

            <!-- Label -->
            <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#2563eb;">Contact Form</p>

            <!-- Heading -->
            <h1 style="margin:0 0 10px;font-size:28px;font-weight:800;color:#141414;letter-spacing:-0.6px;line-height:1.15;">Let&apos;s Work<br>Together</h1>

            <p style="margin:0 0 32px;font-size:14px;color:#737373;line-height:1.6;">
              You have a new message from your portfolio contact form.
            </p>

            <!-- From + Email row -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
              <tr>
                <td width="49%" style="background:#f9f9f9;border:1px solid #e3e3e3;border-radius:10px;padding:14px 18px;vertical-align:top;">
                  <p style="margin:0 0 5px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#a3a3a3;">From</p>
                  <p style="margin:0;font-size:15px;font-weight:700;color:#141414;">${name}</p>
                </td>
                <td width="2%"></td>
                <td width="49%" style="background:#f9f9f9;border:1px solid #e3e3e3;border-left:3px solid #2563eb;border-radius:0 10px 10px 0;padding:14px 18px;vertical-align:top;">
                  <p style="margin:0 0 5px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#a3a3a3;">Email</p>
                  <p style="margin:0;font-size:13px;font-weight:600;color:#2563eb;word-break:break-all;">${email}</p>
                </td>
              </tr>
            </table>

            ${subject ? `
            <!-- Subject -->
            <div style="background:#f9f9f9;border:1px solid #e3e3e3;border-radius:10px;padding:14px 18px;margin-bottom:12px;">
              <p style="margin:0 0 5px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#a3a3a3;">Subject</p>
              <p style="margin:0;font-size:14px;font-weight:600;color:#404040;">${subject}</p>
            </div>` : ""}

            <!-- Message -->
            <div style="background:#f9f9f9;border:1px solid #e3e3e3;border-left:3px solid #2563eb;border-radius:0 10px 10px 0;padding:18px 22px;margin-bottom:28px;">
              <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#a3a3a3;">Message</p>
              <p style="margin:0;font-size:14px;color:#404040;line-height:1.75;white-space:pre-wrap;">${message}</p>
            </div>

            <!-- Reply button (portfolio style) -->
            <a href="mailto:${email}?subject=Re: ${subject || "Your message from my portfolio"}"
               style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;padding:13px 28px;border-radius:100px;letter-spacing:0.01em;">
              Reply to ${name} →
            </a>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9f9f9;border:1px solid #e3e3e3;border-top:1px solid #e3e3e3;border-radius:0 0 14px 14px;padding:16px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <span style="font-size:12px;color:#a3a3a3;">via Contact Form · </span>
                  <span style="font-size:12px;color:#2563eb;font-weight:600;">arjunvarma.in</span>
                </td>
                <td align="right">
                  <span style="font-size:11px;color:#c3c3c3;">AI &amp; ML Engineer</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
    body: JSON.stringify({
      from: "Arjun Portfolio <onboarding@resend.dev>",
      to: [TO_EMAIL],
      reply_to: email,
      subject: `✉️ ${name} — Portfolio Contact`,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
