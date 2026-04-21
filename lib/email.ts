import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendRSVPConfirmation({
  to,
  guestName,
  attending,
}: {
  to: string;
  guestName: string;
  attending: boolean;
}) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>RSVP Confirmed — Eli & Naomi</title>
</head>
<body style="margin:0;padding:0;background:#F0EBE3;font-family:'Georgia',serif;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    Your RSVP has been received · Eli &amp; Naomi's Wedding · October 19, 2026&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0EBE3;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <tr>
            <td align="center" style="padding:0 0 24px;">
              <p style="margin:0;font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#6B6560;font-family:'Georgia',serif;">
                Eli &amp; Naomi
              </p>
            </td>
          </tr>

          <tr>
            <td style="background:#FAF8F5;padding:48px 40px;text-align:center;">
              <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#6B6560;font-family:'Georgia',serif;">
                RSVP Received
              </p>
              <p style="margin:0 0 24px;font-size:28px;color:#1C1C1C;font-family:'Georgia',serif;font-style:italic;font-weight:300;">
                ${guestName}
              </p>
              <p style="margin:0 0 32px;font-size:14px;color:#6B6560;font-family:'Georgia',serif;line-height:1.7;">
                ${attending
                  ? "We're so happy you'll be joining us. We can't wait to celebrate with you on October 19th in Tel Aviv-Yafo."
                  : "We're sorry you won't be able to make it, but we're grateful you let us know. You'll be missed."}
              </p>
              <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px;">
                <tr>
                  <td style="border:1px solid rgba(0,0,0,0.12);padding:16px 24px;text-align:center;">
                    <p style="margin:0 0 2px;font-size:14px;color:#1C1C1C;font-family:'Georgia',serif;">Monday, October 19, 2026</p>
                    <p style="margin:0;font-size:12px;color:#6B6560;font-family:'Georgia',serif;">4:00 PM &nbsp;·&nbsp; Consul House, Tel Aviv-Yafo</p>
                  </td>
                </tr>
              </table>
              <p style="margin:0;font-size:12px;color:#B0A89F;font-family:'Georgia',serif;">
                If you need to update your RSVP, visit <a href="https://elinaomi.love/rsvp" style="color:#1C1C1C;">elinaomi.love/rsvp</a>
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:20px 40px 8px;">
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
    subject: `Your RSVP is confirmed — Eli & Naomi, October 19`,
    html,
  });
}

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

  <!-- Preheader: controls the preview snippet in Gmail/Apple Mail -->
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    ${guestName} is warmly invited · Eli &amp; Naomi's Wedding · October 19, 2026&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0EBE3;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Minimal top wordmark -->
          <tr>
            <td align="center" style="padding:0 0 24px;">
              <p style="margin:0;font-size:11px;letter-spacing:0.35em;text-transform:uppercase;color:#6B6560;font-family:'Georgia',serif;">
                Eli &amp; Naomi
              </p>
            </td>
          </tr>

          <!-- Envelope hero — landscape -->
          <tr>
            <td style="background:#1C1C1C;padding:0;height:320px;vertical-align:top;">

              <table width="100%" cellpadding="0" cellspacing="0" style="height:320px;">

                <!-- Stamp row -->
                <tr style="vertical-align:top;">
                  <td style="padding:20px 24px 0;vertical-align:top;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td></td>
                        <td align="right">
                          <table cellpadding="0" cellspacing="0" style="border:1px solid rgba(201,169,110,0.55);padding:7px 10px;">
                            <tr>
                              <td align="center" style="border:1px solid rgba(201,169,110,0.3);padding:5px 10px;">
                                <p style="margin:0;color:#C9A96E;font-size:10px;letter-spacing:0.2em;font-family:'Georgia',serif;">E &amp; N</p>
                                <p style="margin:3px 0 0;color:rgba(201,169,110,0.55);font-size:8px;letter-spacing:0.12em;font-family:'Georgia',serif;">OCT 2026</p>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Guest name — vertically centered in remaining space -->
                <tr>
                  <td align="center" style="padding:0 40px;" valign="middle">
                    <p style="margin:0 0 12px;font-size:36px;color:#FAF8F5;font-family:'Georgia',serif;font-style:italic;font-weight:300;line-height:1.2;">
                      ${guestName}
                    </p>
                    <p style="margin:0;font-size:10px;color:rgba(250,248,245,0.45);letter-spacing:0.25em;text-transform:uppercase;font-family:'Georgia',serif;">
                      is warmly invited
                    </p>
                  </td>
                </tr>

                <!-- Bottom spacer to push name to center -->
                <tr><td style="height:80px;"></td></tr>

              </table>
            </td>
          </tr>

          <!-- Open the Card — sits just below the envelope -->
          <tr>
            <td align="center" style="background:#FAF8F5;padding:28px 40px 0;">
              <a href="${rsvpUrl}"
                style="display:inline-block;border:1px solid #1C1C1C;color:#1C1C1C;text-decoration:none;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;padding:13px 36px;font-family:'Georgia',serif;">
                Open the Card
              </a>
            </td>
          </tr>

          <!-- Date + Venue -->
          <tr>
            <td style="background:#FAF8F5;padding:28px 40px 32px;text-align:center;">

              <!-- Date -->
              <p style="margin:0 0 2px;font-size:15px;color:#1C1C1C;font-family:'Georgia',serif;">Monday, October 19, 2026</p>
              <p style="margin:0 0 16px;font-size:13px;color:#6B6560;font-family:'Georgia',serif;">4:00 PM &nbsp;·&nbsp; Consul House, Tel Aviv-Yafo</p>

              <!-- Links side by side -->
              <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="padding-right:20px;">
                    <a href="https://calendar.google.com/calendar/r/eventedit?text=Eli+%26+Naomi%27s+Wedding&dates=20261019T140000Z/20261020T000000Z&location=Consul+House,+Tel+Aviv-Yafo,+Israel"
                      style="font-size:10px;color:#1C1C1C;letter-spacing:0.2em;text-transform:uppercase;text-decoration:underline;font-family:'Georgia',serif;">
                      Add to Calendar
                    </a>
                  </td>
                  <td style="color:#C9A96E;font-size:12px;">·</td>
                  <td style="padding-left:20px;">
                    <a href="https://maps.google.com/?q=Consul+House+HaTsorfim+St+15+Tel+Aviv"
                      style="font-size:10px;color:#1C1C1C;letter-spacing:0.2em;text-transform:uppercase;text-decoration:underline;font-family:'Georgia',serif;">
                      View Map
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- RSVP -->
          <tr>
            <td align="center" style="background:#1C1C1C;padding:32px 40px;">
              <p style="margin:0 0 12px;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:rgba(250,248,245,0.45);font-family:'Georgia',serif;">
                Kindly respond by August 1, 2026
              </p>
              <a href="${rsvpUrl}"
                style="color:#FAF8F5;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;text-decoration:underline;font-family:'Georgia',serif;">
                RSVP
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:20px 40px 8px;">
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
