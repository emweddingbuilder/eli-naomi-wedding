import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendInviteEmail({
  to,
  guestName,
  rsvpUrl,
}: {
  to: string;
  guestName: string;
  rsvpUrl: string;
}) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Eli & Naomi's Wedding</title>
</head>
<body style="margin:0;padding:0;background:#F0EBE3;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0EBE3;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#FAF8F5;max-width:560px;width:100%;">

          <!-- Monogram + Header -->
          <tr>
            <td align="center" style="padding:50px 40px 24px;">
              <p style="margin:0 0 24px;font-size:48px;line-height:1;color:#C9A96E;font-family:'Georgia',serif;">M</p>
              <h1 style="margin:0;font-size:22px;font-weight:400;letter-spacing:0.08em;color:#1C1C1C;font-family:'Georgia',serif;text-transform:none;">
                Eli and Naomi's Wedding
              </h1>
              <table width="60" cellpadding="0" cellspacing="0" style="margin:20px auto 0;">
                <tr><td style="height:1px;background:#1C1C1C;"></td></tr>
              </table>
            </td>
          </tr>

          <!-- For line -->
          <tr>
            <td align="center" style="padding:0 40px 32px;">
              <p style="margin:0;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#6B6560;font-family:'Georgia',serif;">
                For: ${guestName}
              </p>
            </td>
          </tr>

          <!-- View the card button -->
          <tr>
            <td align="center" style="padding:0 40px 40px;">
              <a href="${rsvpUrl}"
                style="display:inline-block;border:1px solid #1C1C1C;color:#1C1C1C;text-decoration:none;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;padding:14px 40px;font-family:'Georgia',serif;">
                View the Card
              </a>
            </td>
          </tr>

          <!-- Dark envelope section -->
          <tr>
            <td style="background:#1C1C1C;padding:48px 40px;text-align:center;">
              <!-- Stamp -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:40px;">
                <tr>
                  <td align="right">
                    <table cellpadding="0" cellspacing="0" style="border:1px solid rgba(201,169,110,0.5);padding:8px;display:inline-table;">
                      <tr>
                        <td align="center" style="padding:6px 10px;border:1px solid rgba(201,169,110,0.3);">
                          <p style="margin:0;color:#C9A96E;font-size:10px;letter-spacing:0.15em;font-family:'Georgia',serif;">E &amp; N</p>
                          <p style="margin:2px 0 0;color:rgba(201,169,110,0.6);font-size:8px;letter-spacing:0.1em;font-family:'Georgia',serif;">OCT 2026</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 8px;font-size:22px;color:#FAF8F5;font-family:'Georgia',serif;font-style:italic;font-weight:300;">
                ${guestName}
              </p>
              <p style="margin:0;font-size:11px;color:rgba(250,248,245,0.5);letter-spacing:0.15em;text-transform:uppercase;font-family:'Georgia',serif;">
                is warmly invited
              </p>
            </td>
          </tr>

          <!-- Date + Venue footer -->
          <tr>
            <td style="background:#2C2C2C;padding:36px 40px;text-align:center;">
              <p style="margin:0 0 4px;font-size:14px;color:#FAF8F5;font-family:'Georgia',serif;">Monday, October 19, 2026</p>
              <p style="margin:0 0 4px;font-size:13px;color:rgba(250,248,245,0.7);font-family:'Georgia',serif;">6:00 PM</p>
              <a href="https://calendar.google.com/calendar/r/eventedit?text=Eli+%26+Naomi%27s+Wedding&dates=20251019T160000Z/20251020T000000Z&location=Consul+House,+Tel+Aviv-Yafo,+Israel"
                style="font-size:10px;color:#C9A96E;letter-spacing:0.2em;text-transform:uppercase;text-decoration:underline;font-family:'Georgia',serif;">
                Add to Calendar
              </a>

              <table width="1" cellpadding="0" cellspacing="0" style="margin:20px auto;background:rgba(255,255,255,0.1);height:40px;width:1px;">
                <tr><td></td></tr>
              </table>

              <p style="margin:0 0 4px;font-size:14px;color:#FAF8F5;font-family:'Georgia',serif;">Consul House</p>
              <p style="margin:0 0 4px;font-size:13px;color:rgba(250,248,245,0.7);font-family:'Georgia',serif;">Tel Aviv-Yafo, Israel</p>
              <a href="https://maps.google.com/?q=Consul+House+Tel+Aviv"
                style="font-size:10px;color:#C9A96E;letter-spacing:0.2em;text-transform:uppercase;text-decoration:underline;font-family:'Georgia',serif;">
                View Map
              </a>
            </td>
          </tr>

          <!-- RSVP CTA -->
          <tr>
            <td align="center" style="padding:40px 40px 24px;">
              <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#6B6560;font-family:'Georgia',serif;">
                Please RSVP here
              </p>
              <table cellpadding="0" cellspacing="0" style="margin:20px auto 0;">
                <tr><td style="height:1px;width:60px;background:#1C1C1C;"></td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 40px 50px;">
              <a href="${rsvpUrl}"
                style="display:inline-block;background:#1C1C1C;color:#FAF8F5;text-decoration:none;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;padding:16px 48px;font-family:'Georgia',serif;">
                RSVP Here
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:16px 40px 32px;border-top:1px solid rgba(0,0,0,0.08);">
              <p style="margin:0;font-size:10px;color:#B0A89F;letter-spacing:0.1em;font-family:'Georgia',serif;">
                With love, Eli &amp; Naomi
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  return resend.emails.send({
    from: 'Eli & Naomi <hello@elinaomi.love>',
    replyTo: 'eli.naomi.gettingmarried@gmail.com',
    to,
    subject: `Eli & Naomi — October 19, 2026`,
    html,
  });
}
