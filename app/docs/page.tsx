import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Shield,
  Globe,
  Users,
  Mail,
  TrendingUp,
  BarChart2,
  DollarSign,
  Coins,
  Briefcase,
  Activity,
  BookOpen,
  Layers,
  Server,
  Monitor,
} from "lucide-react";
import type { Metadata } from "next";
import { sections, roles, techStack, type SectionData, type PageDoc } from "./docData";
import { DownloadPdfButton } from "@/components/docs/DownloadPdfButton";
import { DownloadCahierButton } from "@/components/docs/DownloadCahierButton";

export const metadata: Metadata = {
  title: "Documentation — Convergence",
  description: "Guide complet d'utilisation de la plateforme Convergence",
};

/* ─── Icon mapping ─────────────────────────────────────────── */
const SECTION_META: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  auth:        { icon: Shield,   color: "text-blue-500",    bg: "bg-blue-500/10" },
  admin:       { icon: Layers,   color: "text-violet-500",  bg: "bg-violet-500/10" },
  indexes:     { icon: BarChart2,color: "text-cyan-500",    bg: "bg-cyan-500/10" },
  equities:    { icon: TrendingUp,color:"text-green-500",   bg: "bg-green-500/10" },
  bonds:       { icon: Activity, color: "text-orange-500",  bg: "bg-orange-500/10" },
  commodities: { icon: Coins,    color: "text-yellow-500",  bg: "bg-yellow-500/10" },
  fxrates:     { icon: DollarSign,color:"text-emerald-500", bg: "bg-emerald-500/10" },
  funds:       { icon: Briefcase,color: "text-rose-500",    bg: "bg-rose-500/10" },
  public:      { icon: Globe,    color: "text-sky-500",     bg: "bg-sky-500/10" },
};

/* ─── Role badge ────────────────────────────────────────────── */
function RoleBadge({ role }: { role: string }) {
  const colors: Record<string, string> = {
    Public:   "bg-slate-600 text-white",
    VISITOR:  "bg-gray-600 text-white",
    CLIENT:   "bg-blue-700 text-white",
    AGENT:    "bg-teal-700 text-white",
    ADMIN:    "bg-violet-700 text-white",
    TRAINING: "bg-orange-600 text-white",
  };
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${colors[role] ?? "bg-muted text-muted-foreground"}`}>
      {role}
    </span>
  );
}

/* ─── Page card (desktop) ───────────────────────────────────── */
function PageCard({ page }: { page: PageDoc }) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          {page.roles.map((r) => <RoleBadge key={r} role={r} />)}
        </div>
        <CardTitle className="text-base font-bold">{page.title}</CardTitle>
        <span className="text-xs font-mono text-teal-500">{page.url}</span>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">Rôle métier</p>
          <p className="text-sm leading-relaxed">{page.business}</p>
        </div>
        <Separator />
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">Architecture technique</p>
          <p className="text-sm leading-relaxed">{page.technical}</p>
        </div>
        <Separator />
        <div>
          <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">Fonctionnalités clés</p>
          <ul className="list-disc list-inside space-y-0.5">
            {page.features.map((f) => <li key={f} className="text-sm">{f}</li>)}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Desktop section ───────────────────────────────────────── */
function SectionDesktop({ section }: { section: SectionData }) {
  const meta = SECTION_META[section.id] ?? { icon: Globe, color: "text-muted-foreground", bg: "bg-muted" };
  const Icon = meta.icon;
  return (
    <section id={section.id} className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${meta.bg}`}>
          <Icon className={`h-5 w-5 ${meta.color}`} />
        </div>
        <h2 className="text-xl font-bold">{section.label}</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {section.pages.map((page) => <PageCard key={page.url} page={page} />)}
      </div>
    </section>
  );
}

/* ─── Mobile section (accordion) ───────────────────────────── */
function SectionMobile({ section }: { section: SectionData }) {
  const meta = SECTION_META[section.id] ?? { icon: Globe, color: "text-muted-foreground", bg: "bg-muted" };
  const Icon = meta.icon;
  return (
    <AccordionItem value={section.id} className="border rounded-lg px-2 mb-2">
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center gap-3">
          <div className={`p-1.5 rounded-md ${meta.bg}`}>
            <Icon className={`h-4 w-4 ${meta.color}`} />
          </div>
          <span className="font-semibold text-sm">{section.label}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <Accordion type="multiple" className="space-y-2 mt-1">
          {section.pages.map((page) => (
            <AccordionItem key={page.url} value={page.url} className="border rounded-md px-2">
              <AccordionTrigger className="hover:no-underline py-3">
                <div className="text-left">
                  <p className="font-medium text-sm">{page.title}</p>
                  <p className="font-mono text-xs text-teal-500">{page.url}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pb-4">
                <div className="flex flex-wrap gap-1 mb-2">
                  {page.roles.map((r) => <RoleBadge key={r} role={r} />)}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">Rôle métier</p>
                  <p className="text-sm leading-relaxed">{page.business}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">Architecture technique</p>
                  <p className="text-sm leading-relaxed">{page.technical}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">Fonctionnalités clés</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    {page.features.map((f) => <li key={f} className="text-sm">{f}</li>)}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  );
}

/* ─── Screenshots ───────────────────────────────────────────── */
const SHOTS = [
  { src: "/cap1.jpg",  label: "Interface principale",       caption: "Dashboard & navigation générale" },
  { src: "/stats.png", label: "Statistiques & Indicateurs", caption: "Données macroéconomiques par pays" },
  { src: "/spi.png",   label: "Vue données financières",    caption: "Indices boursiers et cours" },
  { src: "/fd.png",    label: "Gestion des fonds",          caption: "Fonds d'investissement — liste & détail" },
];

function ScreenshotsSection() {
  return (
    <section id="apercu" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-teal-500/10">
          <Monitor className="h-5 w-5 text-teal-500" />
        </div>
        <h2 className="text-xl font-bold">Aperçu de la Plateforme</h2>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {SHOTS.map((s) => (
          <figure key={s.src} className="rounded-lg border overflow-hidden bg-card group">
            <div className="relative w-full aspect-video bg-muted overflow-hidden">
              <Image
                src={s.src}
                alt={s.label}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <figcaption className="px-3 py-2 text-center">
              <p className="text-xs font-semibold">{s.label}</p>
              <p className="text-xs text-muted-foreground">{s.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ─── Architecture Diagram ──────────────────────────────────── */
function ArchitectureDiagram() {
  return (
    <section id="schema" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-slate-500/10">
          <Server className="h-5 w-5 text-slate-400" />
        </div>
        <h2 className="text-xl font-bold">Schéma d&apos;Architecture</h2>
      </div>
      <Card>
        <CardContent className="pt-6 overflow-x-auto">
          <svg viewBox="0 0 760 314" xmlns="http://www.w3.org/2000/svg" className="w-full min-w-[480px]">
            {/* Layer 1 — Frontend */}
            <rect x="0" y="0" width="760" height="70" rx="7" fill="rgb(19,78,74)" fillOpacity="0.3" stroke="rgb(13,148,136)" strokeWidth="1"/>
            <text x="14" y="16" fill="rgb(94,234,212)" fontSize="9" fontWeight="bold" fontFamily="monospace">FRONTEND</text>
            <text x="95" y="16" fill="rgb(153,246,228)" fontSize="8" fontFamily="sans-serif"> — Next.js 14 App Router · TypeScript · React 18</text>
            <rect x="7" y="24" width="234" height="38" rx="4" fill="rgb(15,118,110)" fillOpacity="0.35" stroke="rgb(13,148,136)" strokeWidth="0.5"/>
            <text x="124" y="39" textAnchor="middle" fill="rgb(153,246,228)" fontSize="8.5" fontWeight="bold">Server Components</text>
            <text x="124" y="53" textAnchor="middle" fill="rgb(204,251,241)" fontSize="7.5">Fetch Prisma · Cache · RSC</text>
            <rect x="251" y="24" width="234" height="38" rx="4" fill="rgb(15,118,110)" fillOpacity="0.35" stroke="rgb(13,148,136)" strokeWidth="0.5"/>
            <text x="368" y="39" textAnchor="middle" fill="rgb(153,246,228)" fontSize="8.5" fontWeight="bold">Client Components</text>
            <text x="368" y="53" textAnchor="middle" fill="rgb(204,251,241)" fontSize="7.5">Forms · Charts · Accordion</text>
            <rect x="495" y="24" width="258" height="38" rx="4" fill="rgb(15,118,110)" fillOpacity="0.35" stroke="rgb(13,148,136)" strokeWidth="0.5"/>
            <text x="624" y="39" textAnchor="middle" fill="rgb(153,246,228)" fontSize="8.5" fontWeight="bold">Server Actions</text>
            <text x="624" y="53" textAnchor="middle" fill="rgb(204,251,241)" fontSize="7.5">Mutations · Zod Validation</text>
            {/* Connector 1→2 */}
            <line x1="380" y1="71" x2="380" y2="84" stroke="rgb(13,148,136)" strokeWidth="1.2" strokeDasharray="3,2"/>
            {/* Layer 2 — Auth */}
            <rect x="0" y="85" width="760" height="52" rx="7" fill="rgb(46,16,101)" fillOpacity="0.4" stroke="rgb(124,58,237)" strokeWidth="1"/>
            <text x="14" y="101" fill="rgb(196,181,253)" fontSize="9" fontWeight="bold" fontFamily="monospace">AUTHENTIFICATION</text>
            <text x="147" y="101" fill="rgb(221,214,254)" fontSize="8" fontFamily="sans-serif"> — NextAuth.js v5 · JWT · bcryptjs</text>
            <text x="14" y="116" fill="rgb(237,233,254)" fontSize="7.5" fontFamily="sans-serif">5 rôles : VISITOR · CLIENT · AGENT · ADMIN · TRAINING  |  Middleware protection des routes  |  Session 2 min</text>
            {/* Connectors 2→3 */}
            <line x1="190" y1="138" x2="190" y2="152" stroke="rgb(124,58,237)" strokeWidth="1.2" strokeDasharray="3,2"/>
            <line x1="570" y1="138" x2="570" y2="152" stroke="rgb(124,58,237)" strokeWidth="1.2" strokeDasharray="3,2"/>
            {/* Layer 3a — ORM */}
            <rect x="0" y="153" width="370" height="68" rx="7" fill="rgb(8,51,68)" fillOpacity="0.45" stroke="rgb(3,105,161)" strokeWidth="1"/>
            <text x="14" y="169" fill="rgb(125,211,252)" fontSize="9" fontWeight="bold" fontFamily="monospace">PRISMA ORM 5.15</text>
            <text x="14" y="183" fill="rgb(186,230,253)" fontSize="7.5" fontFamily="sans-serif">StaticInfo*  ·  HistoricalData*  ·  User</text>
            <text x="14" y="196" fill="rgb(186,230,253)" fontSize="7.5" fontFamily="sans-serif">Country  ·  Continent  ·  YieldCurve  ·  Contact</text>
            <text x="14" y="210" fill="rgb(125,211,252)" fontSize="7" fontFamily="sans-serif">Migrations typées · Relations Prisma</text>
            {/* Layer 3b — UI */}
            <rect x="380" y="153" width="380" height="68" rx="7" fill="rgb(28,25,23)" fillOpacity="0.45" stroke="rgb(87,83,78)" strokeWidth="1"/>
            <text x="394" y="169" fill="rgb(214,211,209)" fontSize="9" fontWeight="bold" fontFamily="monospace">INTERFACE & VALIDATION</text>
            <text x="394" y="183" fill="rgb(231,229,228)" fontSize="7.5" fontFamily="sans-serif">TailwindCSS 3.4 · Radix UI · Recharts · Tremor</text>
            <text x="394" y="196" fill="rgb(231,229,228)" fontSize="7.5" fontFamily="sans-serif">React Hook Form · Zod · Sonner · next-themes</text>
            <text x="394" y="210" fill="rgb(168,162,158)" fontSize="7" fontFamily="sans-serif">use-debounce · Lucide React · Remix Icon</text>
            {/* Connectors 3→4 */}
            <line x1="190" y1="222" x2="190" y2="238" stroke="rgb(3,105,161)" strokeWidth="1.2" strokeDasharray="3,2"/>
            <line x1="570" y1="222" x2="570" y2="238" stroke="rgb(87,83,78)" strokeWidth="1.2" strokeDasharray="3,2"/>
            {/* Layer 4 — Database */}
            <rect x="0" y="239" width="760" height="73" rx="7" fill="rgb(5,46,22)" fillOpacity="0.5" stroke="rgb(22,163,74)" strokeWidth="1"/>
            <text x="14" y="255" fill="rgb(134,239,172)" fontSize="9" fontWeight="bold" fontFamily="monospace">BASE DE DONNÉES — PostgreSQL</text>
            <text x="14" y="269" fill="rgb(187,247,208)" fontSize="7.5" fontFamily="sans-serif">User · Continent · Country · Currency · Contact  |  StaticInfoEquity · StaticInfoBond · StaticInfoCommo</text>
            <text x="14" y="282" fill="rgb(187,247,208)" fontSize="7.5" fontFamily="sans-serif">StaticInfoIndex · StaticInfoFx · StaticInfoFund  |  HistoricalData* (Equity/Bond/Commo/Index/Fx)</text>
            <text x="14" y="296" fill="rgb(134,239,172)" fontSize="7" fontFamily="sans-serif">YieldCurve · StaticInfoCountry  |  Prisma Migrations · Schéma versionné</text>
          </svg>
        </CardContent>
      </Card>
    </section>
  );
}

/* ─── RBAC Matrix ───────────────────────────────────────────── */
function RbacMatrix() {
  const COLS = [
    { label: "VISITOR", bg: "rgb(71,85,99)" },
    { label: "CLIENT",  bg: "rgb(37,99,235)" },
    { label: "AGENT",   bg: "rgb(13,148,136)" },
    { label: "ADMIN",   bg: "rgb(124,58,237)" },
  ];
  const ROWS = [
    { label: "Pages publiques (accueil, contact)",   access: ["full","full","full","full"] },
    { label: "Actifs financiers (6 classes)",         access: ["none","full","full","full"] },
    { label: "Navigation géographique (continents)",  access: ["none","full","full","full"] },
    { label: "Administration — pays & contacts",      access: ["none","none","partial","full"] },
    { label: "Gestion des utilisateurs",              access: ["none","none","none","full"] },
  ];
  const COL_W = 116, ROW_H = 34, LABEL_W = 300;
  const totalW = LABEL_W + COL_W * 4;
  const totalH = 44 + ROW_H * ROWS.length + 22;
  const circleColor = (a: string) =>
    a === "full" ? "rgb(34,197,94)" : a === "partial" ? "rgb(234,179,8)" : "rgb(75,85,99)";

  return (
    <section id="rbac" className="scroll-mt-24">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-amber-500/10">
          <Users className="h-5 w-5 text-amber-500" />
        </div>
        <h2 className="text-xl font-bold">Matrice d&apos;Accès par Rôle</h2>
      </div>
      <Card>
        <CardContent className="pt-6 overflow-x-auto">
          <svg viewBox={`0 0 ${totalW} ${totalH}`} xmlns="http://www.w3.org/2000/svg" className="w-full min-w-[520px]">
            {/* Header */}
            <rect x="0" y="0" width={LABEL_W} height="44" fill="rgb(30,41,59)"/>
            {COLS.map((col, ci) => (
              <rect key={col.label} x={LABEL_W + ci * COL_W} y="0" width={COL_W} height="44" fill={col.bg} fillOpacity="0.85"/>
            ))}
            {COLS.map((col, ci) => (
              <text key={col.label} x={LABEL_W + ci * COL_W + COL_W / 2} y="27" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">{col.label}</text>
            ))}
            {/* Rows */}
            {ROWS.map((row, ri) => (
              <g key={row.label}>
                <rect x="0" y={44 + ri * ROW_H} width={LABEL_W} height={ROW_H} fill={ri % 2 === 0 ? "rgb(15,23,42)" : "rgb(30,41,59)"} fillOpacity="0.35" stroke="rgb(51,65,85)" strokeWidth="0.3"/>
                <text x="12" y={44 + ri * ROW_H + ROW_H / 2 + 3.5} fill="rgb(203,213,225)" fontSize="8" fontFamily="sans-serif">{row.label}</text>
                {row.access.map((acc, ci) => (
                  <g key={ci}>
                    <rect x={LABEL_W + ci * COL_W} y={44 + ri * ROW_H} width={COL_W} height={ROW_H} fill={ri % 2 === 0 ? "rgb(15,23,42)" : "rgb(30,41,59)"} fillOpacity="0.2" stroke="rgb(51,65,85)" strokeWidth="0.3"/>
                    <circle cx={LABEL_W + ci * COL_W + COL_W / 2} cy={44 + ri * ROW_H + ROW_H / 2} r="10" fill={circleColor(acc)} fillOpacity="0.85"/>
                  </g>
                ))}
              </g>
            ))}
            {/* Legend */}
            <circle cx={LABEL_W + 16} cy={totalH - 9} r="6" fill="rgb(34,197,94)" fillOpacity="0.85"/>
            <text x={LABEL_W + 28} y={totalH - 5} fill="rgb(148,163,184)" fontSize="7.5">Accès complet</text>
            <circle cx={LABEL_W + 130} cy={totalH - 9} r="6" fill="rgb(234,179,8)" fillOpacity="0.85"/>
            <text x={LABEL_W + 142} y={totalH - 5} fill="rgb(148,163,184)" fontSize="7.5">Accès partiel</text>
            <circle cx={LABEL_W + 244} cy={totalH - 9} r="6" fill="rgb(75,85,99)" fillOpacity="0.85"/>
            <text x={LABEL_W + 256} y={totalH - 5} fill="rgb(148,163,184)" fontSize="7.5">Aucun accès</text>
          </svg>
        </CardContent>
      </Card>
    </section>
  );
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function DocsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="border-b bg-gradient-to-br from-teal-950/40 via-background to-background">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-14">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="h-8 w-8 text-teal-500" />
            <h1 className="text-2xl md:text-4xl font-bold">Documentation</h1>
          </div>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl leading-relaxed mb-6">
            Guide complet de la plateforme{" "}
            <span className="text-teal-500 font-semibold">Convergence</span> —
            {"description technique et métier de chaque page, rôles d'accès et architecture système."}
          </p>

          {/* Download buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <DownloadPdfButton />
            <DownloadCahierButton />
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Pages documentées", value: sections.reduce((a, s) => a + s.pages.length, 0) },
              { label: "Sections",          value: sections.length },
              { label: "Rôles utilisateurs",value: roles.length },
              { label: "Classes d'actifs",  value: 6 },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border px-4 py-2 bg-card text-center min-w-[100px]">
                <p className="text-xl font-bold text-teal-500">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">

        {/* ── Desktop layout ─────────────────────────────── */}
        <div className="hidden md:flex gap-8">
          {/* Sidebar */}
          <aside className="w-56 shrink-0">
            <div className="sticky top-6 space-y-1">
              <p className="text-xs font-semibold uppercase text-muted-foreground px-2 mb-3">Navigation</p>
              {sections.map((s) => {
                const meta = SECTION_META[s.id] ?? { icon: Globe, color: "text-muted-foreground" };
                const Icon = meta.icon;
                return (
                  <a key={s.id} href={`#${s.id}`}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors group">
                    <Icon className={`h-4 w-4 ${meta.color}`} />
                    <span className="group-hover:text-foreground text-muted-foreground">{s.label}</span>
                  </a>
                );
              })}
              <Separator className="my-3" />
              <a href="#apercu" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors group">
                <Monitor className="h-4 w-4 text-teal-500" />
                <span className="group-hover:text-foreground text-muted-foreground">Aperçu</span>
              </a>
              <a href="#roles" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors group">
                <Users className="h-4 w-4 text-amber-500" />
                <span className="group-hover:text-foreground text-muted-foreground">Rôles & Permissions</span>
              </a>
              <a href="#rbac" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors group">
                <Shield className="h-4 w-4 text-amber-400" />
                <span className="group-hover:text-foreground text-muted-foreground">Matrice RBAC</span>
              </a>
              <a href="#schema" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors group">
                <Server className="h-4 w-4 text-slate-400" />
                <span className="group-hover:text-foreground text-muted-foreground">Schéma architecture</span>
              </a>
              <a href="#tech" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors group">
                <Layers className="h-4 w-4 text-slate-400" />
                <span className="group-hover:text-foreground text-muted-foreground">Stack technique</span>
              </a>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 space-y-12 min-w-0">
            <ScreenshotsSection />
            {sections.map((section) => <SectionDesktop key={section.id} section={section} />)}

            {/* Roles */}
            <section id="roles" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Users className="h-5 w-5 text-amber-500" />
                </div>
                <h2 className="text-xl font-bold">Rôles & Permissions</h2>
              </div>
              <div className="grid gap-3">
                {roles.map((r) => (
                  <div key={r.name} className="flex items-start gap-4 rounded-lg border p-4 bg-card">
                    <RoleBadge role={r.name} />
                    <p className="text-sm leading-relaxed text-muted-foreground">{r.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <RbacMatrix />
            <ArchitectureDiagram />

            {/* Stack technique (cards) */}
            <section id="tech" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-slate-500/10">
                  <Layers className="h-5 w-5 text-slate-400" />
                </div>
                <h2 className="text-xl font-bold">Stack Technique</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {techStack.map((t) => (
                  <Card key={t.layer}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold text-muted-foreground uppercase">{t.layer}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1">
                        {t.items.map((item) => (
                          <li key={item} className="text-sm flex items-start gap-2">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </main>
        </div>

        {/* ── Mobile layout (accordion) ────────────────────── */}
        <div className="md:hidden space-y-2">
          {/* Screenshots */}
          <div className="mb-4">
            <ScreenshotsSection />
          </div>
          <Accordion type="multiple">
            {sections.map((section) => <SectionMobile key={section.id} section={section} />)}

            {/* Roles */}
            <AccordionItem value="roles" className="border rounded-lg px-2 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-amber-500/10">
                    <Users className="h-4 w-4 text-amber-500" />
                  </div>
                  <span className="font-semibold text-sm">Rôles & Permissions</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-2 pb-4">
                {roles.map((r) => (
                  <div key={r.name} className="flex items-start gap-3 rounded-md border p-3">
                    <RoleBadge role={r.name} />
                    <p className="text-xs leading-relaxed text-muted-foreground">{r.description}</p>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* RBAC + Architecture schemas */}
            <AccordionItem value="rbac" className="border rounded-lg px-2 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-amber-500/10">
                    <Shield className="h-4 w-4 text-amber-400" />
                  </div>
                  <span className="font-semibold text-sm">Matrice RBAC & Schéma Architecture</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pb-4">
                <RbacMatrix />
                <ArchitectureDiagram />
              </AccordionContent>
            </AccordionItem>

            {/* Stack technique */}
            <AccordionItem value="tech" className="border rounded-lg px-2 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-slate-500/10">
                    <Layers className="h-4 w-4 text-slate-400" />
                  </div>
                  <span className="font-semibold text-sm">Stack Technique</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-3 pb-4">
                {techStack.map((t) => (
                  <div key={t.layer} className="rounded-md border p-3">
                    <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">{t.layer}</p>
                    <ul className="space-y-1">
                      {t.items.map((item) => (
                        <li key={item} className="text-xs flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <div className="border-t mt-12 py-6 text-center text-xs text-muted-foreground">
        EmergenceRDC — Convergence Documentation v1.0 · Mai 2026
      </div>
    </div>
  );
}
