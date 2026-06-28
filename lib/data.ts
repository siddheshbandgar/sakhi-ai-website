export type AppItem = {
  name: string;
  prompt: string;
  tint: string; // brand-ish accent for the monogram chip
};

export type Category = {
  index: string;
  title: string;
  blurb: string;
  apps: AppItem[];
};

export const categories: Category[] = [
  {
    index: "01",
    title: "Work & Productivity",
    blurb: "Your inbox, calendar, and tasks — handled before you even ask.",
    apps: [
      { name: "Gmail", prompt: "Summarize my unread emails and draft replies", tint: "#EA4335" },
      { name: "Calendar", prompt: "Check my calendar and plan today", tint: "#1A73E8" },
      { name: "Slack", prompt: "Summarize Slack channels and catch me up", tint: "#611F69" },
      { name: "Notion", prompt: "Turn my Notion notes into clear next steps", tint: "#111111" },
      { name: "Todoist", prompt: "Organize my tasks and hit every deadline", tint: "#E44332" },
      { name: "Drive", prompt: "Find the right docs and summarize them", tint: "#1FA463" },
    ],
  },
  {
    index: "02",
    title: "Content & Research",
    blurb: "Create, publish, and research — without opening ten tabs.",
    apps: [
      { name: "Docs", prompt: "Draft and refine a Google Doc for me", tint: "#1A73E8" },
      { name: "Reddit", prompt: "Find and summarize Reddit discussions", tint: "#FF4500" },
      { name: "YouTube", prompt: "Analyze my channel and suggest next videos", tint: "#FF0000" },
      { name: "WhatsApp", prompt: "Draft WhatsApp replies for my business", tint: "#25D366" },
      { name: "Browser", prompt: "Research this site and pull what matters", tint: "#0D6E6E" },
      { name: "Instagram", prompt: "Review my Instagram and plan content", tint: "#C13584" },
    ],
  },
  {
    index: "03",
    title: "Sales & Growth",
    blurb: "Pipeline, payments, and performance — one conversation away.",
    apps: [
      { name: "HubSpot", prompt: "Review my deals and flag follow-ups", tint: "#FF7A59" },
      { name: "Salesforce", prompt: "Summarize Salesforce records and next steps", tint: "#00A1E0" },
      { name: "Stripe", prompt: "Summarize revenue and recent payments", tint: "#635BFF" },
      { name: "Meta Ads", prompt: "Review Meta Ads performance", tint: "#0866FF" },
      { name: "Ahrefs", prompt: "Analyze SEO data in Ahrefs", tint: "#054ADA" },
      { name: "LinkedIn", prompt: "Draft a LinkedIn post in my voice", tint: "#0A66C2" },
      { name: "Google Ads", prompt: "What's working in my ad campaigns?", tint: "#4285F4" },
      { name: "Shopify", prompt: "Review recent orders and top customers", tint: "#5E8E3E" },
    ],
  },
  {
    index: "04",
    title: "Engineering & Product",
    blurb: "Ship faster with live context from the tools your team lives in.",
    apps: [
      { name: "GitHub", prompt: "Review my PRs and triage open issues", tint: "#1C1712" },
      { name: "Linear", prompt: "Prioritize issues for this sprint", tint: "#5E6AD2" },
      { name: "Trello", prompt: "Summarize my Trello boards and next actions", tint: "#0079BF" },
      { name: "Figma", prompt: "Summarize design context for review", tint: "#A259FF" },
      { name: "Confluence", prompt: "Extract action items from team docs", tint: "#172B4D" },
      { name: "Sheets", prompt: "Analyze this sheet and surface key insights", tint: "#0F9D58" },
    ],
  },
];

// Flat list for the hero marquee
export const allApps = categories.flatMap((c) => c.apps.map((a) => ({ name: a.name, tint: a.tint })));

// A denser set of well-known apps for the 3D floating gallery — a visual
// stand-in for the 2,000+ integrations Sakhi connects to.
export const galleryApps: { name: string; tint: string }[] = [
  ...allApps,
  { name: "Asana", tint: "#F06A6A" },
  { name: "Jira", tint: "#2684FF" },
  { name: "Zoom", tint: "#2D8CFF" },
  { name: "Discord", tint: "#5865F2" },
  { name: "Airtable", tint: "#FCB400" },
  { name: "Dropbox", tint: "#0061FF" },
  { name: "Zapier", tint: "#FF4F00" },
  { name: "Outlook", tint: "#0A6ED1" },
  { name: "Teams", tint: "#6264A7" },
  { name: "X", tint: "#1D1D1F" },
  { name: "Canva", tint: "#00C4CC" },
  { name: "Webflow", tint: "#4353FF" },
  { name: "Mailchimp", tint: "#FFE01B" },
  { name: "Intercom", tint: "#1F8DED" },
  { name: "Zendesk", tint: "#03363D" },
  { name: "ClickUp", tint: "#7B68EE" },
  { name: "Monday", tint: "#FF3D57" },
  { name: "Calendly", tint: "#006BFF" },
  { name: "Loom", tint: "#625DF5" },
  { name: "Vercel", tint: "#111111" },
  { name: "Razorpay", tint: "#3395FF" },
  { name: "Telegram", tint: "#26A5E4" },
  { name: "Miro", tint: "#FFD02F" },
  { name: "Framer", tint: "#0099FF" },
  { name: "Supabase", tint: "#3ECF8E" },
  { name: "PayPal", tint: "#003087" },
];
