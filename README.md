# Teknowlogy 72-Hour Profit Playbook

Interactive sales & execution playbook for **Teknowlogy LLC** (Oakland Shopify ops agency).

**WISMO Killer wedge → free 3-day proof → $297 / $991 MRR**

## Live

https://teknowlogy-72h-playbook-leggomyswaggs-projects.vercel.app

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Checklist progress is saved in this browser and restored when you return. Clearing browser storage resets it. Script buttons copy text to your clipboard; if the browser denies access, select and copy the displayed script manually.

## Stack

- Vite + React 18
- Lucide React icons
- Custom utility CSS (no Tailwind build step required for deploy)

## Consumer release scope

This is a local three-day business planning guide. Script examples use placeholders for names, findings and measured results; they do not represent completed outreach or verified revenue. Replace every bracket with facts you have checked before contacting anyone. The in-page start link works without an external onboarding service. No messages are sent by this app.

Checklist progress stays in this browser. The interface remains usable with blocked storage and explains how to copy scripts manually when clipboard permission is denied. Geist fonts and their licenses are bundled, removing runtime Google Fonts requests. The header/footer wrap on small screens.

Run `npm run build`, install Chromium with `npx playwright install --with-deps chromium`, then run `npm run test:browser`. CI checks the real built interface at desktop, 390px and 320px widths, saved progress across days/reloads, invalid and unavailable storage, clipboard denial and zero external asset requests.
