import nodemailer, { type Transporter } from "nodemailer";

/**
 * Mail is optional at boot: the site must serve even when SMTP credentials
 * are absent, so the forms degrade to a clear error instead of a crash.
 */
let transporter: Transporter | null = null;
let reason = "";

export function initMailer(): void {
  const user = process.env.MAIL_USERNAME;
  const pass = process.env.MAIL_PASSWORD;

  if (!user || !pass) {
    reason = "MAIL_USERNAME or MAIL_PASSWORD is not set";
    console.warn(`[mail] disabled — ${reason}. Forms will return a friendly error.`);
    return;
  }

  transporter = nodemailer.createTransport({
    host: process.env.MAIL_SERVER || "smtp.gmail.com",
    port: Number(process.env.MAIL_PORT || 587),
    secure: Number(process.env.MAIL_PORT || 587) === 465,
    auth: { user, pass },
  });

  transporter.verify((err) => {
    if (err) {
      console.error("[mail] SMTP verification failed:", err.message);
    } else {
      console.log("[mail] SMTP ready");
    }
  });
}

export function mailReady(): boolean {
  return transporter !== null;
}

export function mailDisabledReason(): string {
  return reason;
}

export async function sendMail(opts: {
  to: string;
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  if (!transporter) throw new Error(`mail disabled: ${reason}`);

  await transporter.sendMail({
    from: process.env.MAIL_DEFAULT_SENDER || process.env.MAIL_USERNAME,
    to: opts.to,
    subject: opts.subject,
    text: opts.text,
    replyTo: opts.replyTo,
  });
}
