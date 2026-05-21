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
              <a href="#roles" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors group">
                <Users className="h-4 w-4 text-amber-500" />
                <span className="group-hover:text-foreground text-muted-foreground">Rôles & Permissions</span>
              </a>
              <a href="#tech" className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent transition-colors group">
                <Server className="h-4 w-4 text-slate-400" />
                <span className="group-hover:text-foreground text-muted-foreground">Architecture</span>
              </a>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 space-y-12 min-w-0">
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

            {/* Architecture */}
            <section id="tech" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-slate-500/10">
                  <Server className="h-5 w-5 text-slate-400" />
                </div>
                <h2 className="text-xl font-bold">Architecture Technique</h2>
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

            {/* Architecture */}
            <AccordionItem value="tech" className="border rounded-lg px-2 mb-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-slate-500/10">
                    <Server className="h-4 w-4 text-slate-400" />
                  </div>
                  <span className="font-semibold text-sm">Architecture Technique</span>
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
