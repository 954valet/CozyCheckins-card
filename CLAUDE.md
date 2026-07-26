# Cozy Check-ins — Product Notes

Notes on features under consideration for the Cozy Check-ins product (this repo is just the digital business card; the actual app lives elsewhere, but this file tracks ideas discussed with Mark).

## Scam-call screening / forwarding (proposed 2026-07-26)

Positioning: "Scam protection for older adults and their families" — not another generic spam blocker (Truecaller/carrier filters already own that space). Fits Cozy's existing pillars: daily wellbeing, call safety, family alerts.

**Phased build plan:**
1. **MVP — unknown-call screening + trusted contacts (Android first).** Use Android's `CallScreeningService` API to allow/silence/reject/block based on a known-contacts list, plus carrier STIR/SHAKEN verification signal to flag spoofed numbers. Family sets: contacts ring normally, unknown numbers get screened, high-risk numbers never reach the senior.
2. **Full AI-answering/forwarding tier (later).** Forward unknown calls to a Cozy-operated number where an AI answers ("state your name and reason for calling"), evaluates the response, and only connects legitimate callers through. Enables content-based scam detection (not just number-based), which matters because scammers rotate numbers. Killer feature: "Ask my family" — if the AI detects urgent-payment/gift-card/arrest-scam language, it pauses the call and alerts a trusted family member (allow/block/call-mom) instead of connecting it.

**Key constraints / risks to design around, not skip:**
- iOS is much more restricted than Android — no arbitrary app can take over/converse on a live cellular call; Apple only exposes caller-ID/Live Caller ID Lookup, not full screening.
- Tier 2 requires real telephony infrastructure (Twilio/SIP-style forwarding), not just an on-device app — meaningfully bigger engineering lift than tier 1.
- Senior has to correctly set up conditional call forwarding on their carrier — real support burden for this user base.
- Any transcription/analysis of call content triggers two-party-consent recording laws in states like CA and FL — needs an upfront spoken disclosure in the call flow, not just a privacy-policy footnote.
- Validate demand with actual Cozy families before building tier 2 — it's a big lift relative to a check-in app's core scope.

**Recommendation:** ship the Android screening + trusted-contacts MVP first; treat the AI-answering/forwarding tier as a distinct, separately-validated project once MVP demand is confirmed.
