import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const OWNER_EMAIL   = "arjunvarma5110@gmail.com";

// ── Arjun's details ─────────────────────────────────────────────
const ARJUN = {
  name:     "Katari Arjun Varma",
  mobile:   "+91 9849112235",
  email:    "arjunvarma5110@gmail.com",
  location: "Phagwara, Punjab — India",
  linkedin: "linkedin.com/in/karjunvarma",
  github:   "github.com/katariarjunvarma",
  portfolio:"arjunvarma.in",
};

// ── Notification email to Arjun ──────────────────────────────────
function ownerHtml(visitorEmail: string, time: string) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:48px 20px;">
<tr><td align="center"><table width="500" cellpadding="0" cellspacing="0">
  <tr><td style="background:#fff;border:1px solid #e3e3e3;border-radius:14px 14px 0 0;padding:18px 32px;border-bottom:none;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td><span style="font-size:16px;font-weight:800;color:#141414;letter-spacing:-0.4px;">Arjun Varma</span></td>
      <td align="right"><span style="display:inline-block;background:#eff6ff;color:#2563eb;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:4px 10px;border-radius:20px;border:1px solid #dbeafe;">Portfolio Alert</span></td>
    </tr></table>
  </td></tr>
  <tr><td style="background:#2563eb;height:2px;"></td></tr>
  <tr><td style="background:#fff;border:1px solid #e3e3e3;border-top:none;border-bottom:none;padding:40px 32px 32px;">
    <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#2563eb;">CV VIEW</p>
    <h1 style="margin:0 0 10px;font-size:28px;font-weight:800;color:#141414;letter-spacing:-0.6px;line-height:1.15;">Someone viewed<br>your CV</h1>
    <p style="margin:0 0 32px;font-size:14px;color:#737373;line-height:1.6;">The email below visited your portfolio and opened your CV.</p>
    <div style="background:#f9f9f9;border:1px solid #e3e3e3;border-left:3px solid #2563eb;border-radius:0 10px 10px 0;padding:18px 22px;margin-bottom:16px;">
      <p style="margin:0 0 5px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#a3a3a3;">Visitor Email</p>
      <p style="margin:0;font-size:18px;font-weight:700;color:#2563eb;">${visitorEmail}</p>
    </div>
    <div style="background:#f9f9f9;border:1px solid #e3e3e3;border-radius:10px;padding:14px 22px;">
      <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#a3a3a3;">Time (IST)</p>
      <p style="margin:0;font-size:13px;font-weight:600;color:#404040;">${time || "—"}</p>
    </div>
  </td></tr>
  <tr><td style="background:#f9f9f9;border:1px solid #e3e3e3;border-top:1px solid #e3e3e3;border-radius:0 0 14px 14px;padding:16px 32px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td><span style="font-size:12px;color:#a3a3a3;">Automated alert · </span><span style="font-size:12px;color:#2563eb;font-weight:600;">arjunvarma.in</span></td>
      <td align="right"><span style="font-size:11px;color:#c3c3c3;">AI &amp; ML Engineer</span></td>
    </tr></table>
  </td></tr>
</table></td></tr></table>
</body></html>`;
}

// ── Thank-you email to visitor (with CV attachment) ──────────────
function visitorHtml() {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:48px 20px;">
<tr><td align="center"><table width="500" cellpadding="0" cellspacing="0">

  <!-- Header -->
  <tr><td style="background:#fff;border:1px solid #e3e3e3;border-radius:14px 14px 0 0;padding:18px 32px;border-bottom:none;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td><span style="font-size:16px;font-weight:800;color:#141414;letter-spacing:-0.4px;">Arjun Varma</span></td>
      <td align="right"><span style="display:inline-block;background:#eff6ff;color:#2563eb;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:4px 10px;border-radius:20px;border:1px solid #dbeafe;">Thank You</span></td>
    </tr></table>
  </td></tr>
  <tr><td style="background:#2563eb;height:2px;"></td></tr>

  <!-- Body -->
  <tr><td style="background:#fff;border:1px solid #e3e3e3;border-top:none;border-bottom:none;padding:40px 32px 32px;">

    <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#2563eb;">Portfolio Visit</p>
    <h1 style="margin:0 0 12px;font-size:28px;font-weight:800;color:#141414;letter-spacing:-0.6px;line-height:1.15;">Thanks for visiting<br>my portfolio!</h1>
    <p style="margin:0 0 32px;font-size:14px;color:#737373;line-height:1.7;">
      Really appreciate you taking the time to check out my work and view my CV.
      I've attached a copy of my CV to this email for your reference.
      Feel free to reach out — I'd love to connect!
    </p>

    <!-- Contact details card -->
    <div style="background:#f9f9f9;border:1px solid #e3e3e3;border-radius:12px;padding:22px 24px;margin-bottom:24px;">
      <p style="margin:0 0 16px;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#2563eb;">My Details</p>

      <!-- Mobile -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
        <tr>
          <td width="28" valign="middle">
            <span style="font-size:16px;">📱</span>
          </td>
          <td valign="middle">
            <p style="margin:0;font-size:10px;color:#a3a3a3;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Mobile</p>
            <p style="margin:2px 0 0;font-size:14px;font-weight:700;color:#141414;">${ARJUN.mobile}</p>
          </td>
        </tr>
      </table>

      <!-- Email -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
        <tr>
          <td width="28" valign="middle">
            <span style="font-size:16px;">✉️</span>
          </td>
          <td valign="middle">
            <p style="margin:0;font-size:10px;color:#a3a3a3;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Email</p>
            <a href="mailto:${ARJUN.email}" style="display:block;margin:2px 0 0;font-size:14px;font-weight:700;color:#2563eb;text-decoration:none;">${ARJUN.email}</a>
          </td>
        </tr>
      </table>

      <!-- Location -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
        <tr>
          <td width="28" valign="middle">
            <span style="font-size:16px;">📍</span>
          </td>
          <td valign="middle">
            <p style="margin:0;font-size:10px;color:#a3a3a3;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Location</p>
            <p style="margin:2px 0 0;font-size:14px;font-weight:700;color:#141414;">${ARJUN.location}</p>
          </td>
        </tr>
      </table>

      <!-- LinkedIn -->
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td width="28" valign="middle">
            <span style="font-size:16px;">🔗</span>
          </td>
          <td valign="middle">
            <p style="margin:0;font-size:10px;color:#a3a3a3;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">LinkedIn</p>
            <a href="https://${ARJUN.linkedin}" style="display:block;margin:2px 0 0;font-size:14px;font-weight:700;color:#2563eb;text-decoration:none;">${ARJUN.linkedin}</a>
          </td>
        </tr>
      </table>
    </div>

    <!-- CTA button -->
    <a href="https://${ARJUN.portfolio}"
       style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;padding:13px 28px;border-radius:100px;letter-spacing:0.01em;">
      View My Portfolio →
    </a>

  </td></tr>

  <!-- Footer -->
  <tr><td style="background:#f9f9f9;border:1px solid #e3e3e3;border-top:1px solid #e3e3e3;border-radius:0 0 14px 14px;padding:16px 32px;">
    <table width="100%" cellpadding="0" cellspacing="0"><tr>
      <td><span style="font-size:12px;color:#a3a3a3;">CV attached · </span><span style="font-size:12px;color:#2563eb;font-weight:600;">${ARJUN.portfolio}</span></td>
      <td align="right"><span style="font-size:11px;color:#c3c3c3;">AI &amp; ML Engineer</span></td>
    </tr></table>
  </td></tr>

</table></td></tr></table>
</body></html>`;
}

export async function POST(req: NextRequest) {
  const { email, time } = await req.json();
  if (!email) return NextResponse.json({ error: "Missing email" }, { status: 400 });
  if (!RESEND_API_KEY) return NextResponse.json({ error: "Email not configured" }, { status: 500 });

  // Read CV PDF and encode to base64
  let cvBase64 = "";
  try {
    const pdfPath = join(process.cwd(), "public", "resume-katari-arjun-varma.pdf");
    cvBase64 = readFileSync(pdfPath).toString("base64");
  } catch {
    // CV attachment unavailable — still send emails
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY;

  await Promise.all([
    // 1. Notify Arjun via Resend
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({
        from: "Arjun Portfolio <onboarding@resend.dev>",
        to: [OWNER_EMAIL],
        subject: `📄 CV Viewed — ${email}`,
        html: ownerHtml(email, time),
      }),
    }),

    // 2. Thank-you to visitor via Brevo (sends to ANY email, free 300/day)
    (async () => {
      if (!BREVO_API_KEY) return;
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: { name: "Arjun Varma", email: OWNER_EMAIL },
          to: [{ email }],
          replyTo: { email: OWNER_EMAIL },
          subject: "Arjun Varma — Thanks for visiting my portfolio!",
          htmlContent: visitorHtml(),
          ...(cvBase64 && {
            attachment: [{
              name: "Arjun-Varma-CV.pdf",
              content: cvBase64,
            }],
          }),
        }),
      });
    })(),
  ]);

  return NextResponse.json({ success: true });
}
