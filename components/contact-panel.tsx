"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight } from "@/components/chrome";
import { contact } from "@/lib/site";

/*
  A contact panel built to be reached, not admired.

  The reliability problem with a bare mailto: is that it opens whatever the
  visitor's OS thinks is a mail client — often nothing, or a chooser. So the
  panel leads with paths that always work: copy the address, or send the message
  through the form. If a Web3Forms key is set the form posts straight to the
  inbox; if not, it composes a fully pre-filled email in the visitor's own
  client. Either way the recruiter never has to type an address or a subject.

  The scheduler is the flourish: pick a slot and drop a calendar hold that adds
  me as a guest, so accepting it sends me the invite. No account, no booking
  service, no backend — just a Google Calendar template URL built in the browser.
*/

type Slot = {
  key: string;
  label: string;
  start: string; // CT wall-clock, YYYYMMDDTHHMMSS
  end: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

function hourLabel(h: number) {
  const period = h < 12 ? "AM" : "PM";
  const twelve = h % 12 === 0 ? 12 : h % 12;
  return `${twelve}:00 ${period}`;
}

function buildSlots(count: number): Slot[] {
  const slots: Slot[] = [];
  const day = new Date();
  day.setHours(0, 0, 0, 0);
  day.setDate(day.getDate() + 1); // start tomorrow

  const dateFmt = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  while (slots.length < count) {
    const dow = day.getDay();
    if (dow !== 0 && dow !== 6) {
      const y = day.getFullYear();
      const m = pad(day.getMonth() + 1);
      const d = pad(day.getDate());
      const dateLabel = dateFmt.format(day);

      for (const h of contact.slotHours) {
        if (slots.length >= count) break;
        const total = h * 60 + contact.durationMin;
        const eh = Math.floor(total / 60);
        const em = total % 60;
        slots.push({
          key: `${y}${m}${d}-${h}`,
          label: `${dateLabel} · ${hourLabel(h)}`,
          start: `${y}${m}${d}T${pad(h)}0000`,
          end: `${y}${m}${d}T${pad(eh)}${pad(em)}00`,
        });
      }
    }
    day.setDate(day.getDate() + 1);
  }
  return slots;
}

function gcalUrl(slot: Slot) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: contact.meetingTitle,
    dates: `${slot.start}/${slot.end}`,
    ctz: contact.timezone,
    add: contact.email,
    details: `Intro call requested from clintonbrown.vercel.app. Adding ${contact.organizer} as a guest sends the invite.`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function ContactPanel() {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [slotKey, setSlotKey] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });

  useEffect(() => setMounted(true), []);

  const slots = useMemo(() => (mounted ? buildSlots(6) : []), [mounted]);
  const slot = slots.find((s) => s.key === slotKey) ?? null;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${contact.email}`;
    }
  }

  function composeMailto() {
    const subject = `Role for ${contact.organizer}${form.company ? ` — ${form.company}` : ""}`;
    const lines = [
      form.name && `From: ${form.name}`,
      form.company && `Company: ${form.company}`,
      form.email && `Reply to: ${form.email}`,
      slot && `Proposed time: ${slot.label} ${contact.timezoneLabel}`,
      "",
      form.message,
    ].filter((l): l is string => Boolean(l));
    const body = lines.join("\n");
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    // No key configured: compose a pre-filled email in the visitor's client.
    if (!contact.formAccessKey) {
      composeMailto();
      setStatus("sent");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: contact.formAccessKey,
          subject: `Portfolio contact — ${form.name || form.company || "recruiter"}`,
          from_name: form.name || "Portfolio visitor",
          replyto: form.email,
          name: form.name,
          company: form.company,
          email: form.email,
          proposed_time: slot ? `${slot.label} ${contact.timezoneLabel}` : "—",
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus("sent");
    } catch {
      // Fall back to a composed email so the message is never lost.
      composeMailto();
      setStatus("sent");
    }
  }

  if (status === "sent") {
    return (
      <div className="contact-sent" role="status">
        <span className="contact-check" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M4 10.5l4 4 8-9"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <div>
          <p className="contact-sent-title">
            {contact.formAccessKey ? "Message sent." : "Your email is ready to send."}
          </p>
          <p className="contact-sent-note">
            {contact.formAccessKey
              ? `Thanks${form.name ? `, ${form.name}` : ""} — it is in my inbox and I reply within a day.`
              : "I opened it in your mail app, pre-addressed and filled in. Prefer not to use it? Copy the address below."}
            {slot && (
              <>
                {" "}
                Your proposed time — <strong>{slot.label} {contact.timezoneLabel}</strong> — is included.
              </>
            )}
          </p>
          <div className="contact-mini-actions">
            <button type="button" className="chip-btn" onClick={copyEmail}>
              {copied ? "Copied" : "Copy email"}
            </button>
            {slot && (
              <a className="chip-btn" href={gcalUrl(slot)} target="_blank" rel="noopener noreferrer">
                Add the hold to Google Calendar
                <ArrowUpRight />
              </a>
            )}
            <button
              type="button"
              className="chip-btn"
              onClick={() => {
                setStatus("idle");
              }}
            >
              Send another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-wrap">
      <form className="contact-form" onSubmit={onSubmit}>
        <div className="field-grid">
          <label className="field">
            <span>Name</span>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              autoComplete="name"
            />
          </label>
          <label className="field">
            <span>Company</span>
            <input
              type="text"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              autoComplete="organization"
            />
          </label>
        </div>

        <label className="field">
          <span>
            Your email <em>so I can reply</em>
          </span>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            autoComplete="email"
          />
        </label>

        <label className="field">
          <span>Message</span>
          <textarea
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="The role, the team, what you are building — a line is plenty."
          />
        </label>

        <fieldset className="slots">
          <legend>
            Prefer a specific time? <em>optional · {contact.timezoneLabel}</em>
          </legend>
          <div className="slot-grid" aria-busy={!mounted}>
            {slots.map((s) => (
              <button
                key={s.key}
                type="button"
                className="slot"
                aria-pressed={slotKey === s.key}
                onClick={() => setSlotKey(slotKey === s.key ? null : s.key)}
              >
                {s.label}
              </button>
            ))}
          </div>
          {slot && (
            <a className="slot-cal" href={gcalUrl(slot)} target="_blank" rel="noopener noreferrer">
              Or drop the hold on my calendar now — I get the invite
              <ArrowUpRight />
            </a>
          )}
        </fieldset>

        <div className="contact-submit">
          <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send message"}
            <ArrowRight />
          </button>
          <span className="contact-reassure">
            No account needed. I reply within a day.
          </span>
        </div>
      </form>

      <aside className="contact-aside">
        <p className="contact-aside-label">Rather go direct?</p>
        <button type="button" className="contact-copy" onClick={copyEmail}>
          <span className="contact-copy-email">{contact.email}</span>
          <span className="contact-copy-cue">{copied ? "Copied ✓" : "Copy"}</span>
        </button>
        <div className="contact-links">
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
            <ArrowUpRight />
          </a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer">
            GitHub
            <ArrowUpRight />
          </a>
        </div>
        <p className="contact-aside-note">
          Based in Murfreesboro, TN · {contact.timezoneLabel}. Open to remote,
          and happy to work Pacific or Eastern hours.
        </p>
      </aside>
    </div>
  );
}
