"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sections, roles, techStack } from "@/app/docs/docData";

type RGB = [number, number, number];

const TEAL: RGB = [0, 150, 136];
const WHITE: RGB = [255, 255, 255];
const DARK: RGB = [30, 30, 30];
const GRAY: RGB = [110, 110, 110];
const LIGHT_GRAY: RGB = [220, 220, 220];
const SLATE: RGB = [71, 85, 105];

const ROLE_COLORS: Record<string, RGB> = {
  Public: SLATE,
  VISITOR: [75, 85, 99],
  CLIENT: [37, 99, 235],
  AGENT: [13, 148, 136],
  ADMIN: [124, 58, 237],
  TRAINING: [234, 88, 12],
};

const loadImg = (src: string): Promise<HTMLImageElement | null> =>
  new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });

export function DownloadPdfButton() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const { jsPDF } = await import("jspdf");

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      pdf.setProperties({
        title: "Convergence — Documentation",
        author: "EmergenceRDC",
        subject: "Guide d'utilisation de la plateforme Convergence — Marchés Émergents",
        keywords: "emerging markets, finance, convergence, documentation, marchés émergents",
        creator: "EmergenceRDC",
      });

      const PW = 210;
      const PH = 297;
      const ML = 14;
      const CW = PW - ML * 2;
      let y = 14;
      let pageNum = 1;

      /* ─── Helpers ─────────────────────────────────────── */
      const set = (size: number, style: "normal" | "bold", color: RGB) => {
        pdf.setFontSize(size);
        pdf.setFont("helvetica", style);
        pdf.setTextColor(...color);
      };

      const footerStamp = () => {
        set(7.5, "normal", GRAY);
        pdf.text("EmergenceRDC  ·  Convergence Documentation", ML, PH - 8);
        pdf.text(String(pageNum), PW - ML, PH - 8, { align: "right" });
      };

      const newPage = () => {
        footerStamp();
        pdf.addPage();
        pageNum++;
        y = 14;
        // Thin teal header rule on every content page
        pdf.setFillColor(...TEAL);
        pdf.rect(0, 0, PW, 1.5, "F");
      };

      const guard = (need: number) => {
        if (y + need > PH - 18) newPage();
      };

      const addText = (
        text: string,
        size: number,
        style: "normal" | "bold",
        color: RGB,
        indent = 0,
      ) => {
        set(size, style, color);
        const lines = pdf.splitTextToSize(text, CW - indent);
        const lh = size * 0.42;
        guard(lines.length * lh + 2);
        pdf.text(lines, ML + indent, y);
        y += lines.length * lh + 1.5;
      };

      const addSep = (color: RGB = LIGHT_GRAY) => {
        guard(5);
        pdf.setDrawColor(...color);
        pdf.setLineWidth(0.25);
        pdf.line(ML, y, ML + CW, y);
        y += 4;
      };

      const addLabel = (text: string) => {
        guard(8);
        set(7.5, "bold", GRAY);
        pdf.text(text.toUpperCase(), ML, y);
        y += 4;
      };

      const addBullets = (items: string[]) => {
        items.forEach((item) => {
          const text = `•  ${item}`;
          set(8.5, "normal", DARK);
          const lines = pdf.splitTextToSize(text, CW - 4);
          const lh = 8.5 * 0.42;
          guard(lines.length * lh + 1);
          pdf.text(lines, ML + 3, y);
          y += lines.length * lh + 0.8;
        });
        y += 1;
      };

      const addRolePills = (roleNames: string[]) => {
        guard(8);
        set(7, "bold", WHITE);
        let rx = ML;
        roleNames.forEach((r) => {
          const col = ROLE_COLORS[r] ?? SLATE;
          const tw = pdf.getTextWidth(r);
          const bw = tw + 5;
          pdf.setFillColor(...col);
          pdf.roundedRect(rx, y - 3.8, bw, 5.5, 1.2, 1.2, "F");
          pdf.text(r, rx + 2.5, y);
          rx += bw + 2;
        });
        y += 6;
      };

      /* ─── Section heading ─────────────────────────────── */
      const addSectionHead = (label: string) => {
        guard(16);
        pdf.setFillColor(...TEAL);
        pdf.rect(ML, y - 1, CW, 10, "F");
        set(11, "bold", WHITE);
        pdf.text(label.toUpperCase(), ML + 3, y + 6);
        y += 14;
      };

      /* ─── Page heading ────────────────────────────────── */
      const addPageHead = (title: string, url: string) => {
        guard(18);
        set(10.5, "bold", DARK);
        pdf.text(title, ML, y);
        y += 5;
        set(8, "normal", TEAL);
        pdf.text(url, ML, y);
        y += 5;
      };

      /* ══════════════════════════════════════════════════
         COVER PAGE
      ══════════════════════════════════════════════════ */
      pdf.setFillColor(2, 44, 54);
      pdf.rect(0, 0, PW, PH, "F");

      // Decorative diagonal strip
      pdf.setFillColor(0, 120, 110);
      pdf.triangle(0, 0, PW * 0.6, 0, 0, PH * 0.55, "F");

      // Circle logo
      pdf.setFillColor(...TEAL);
      pdf.circle(PW / 2, 85, 22, "F");
      set(16, "bold", WHITE);
      pdf.text("EM", PW / 2, 90, { align: "center" });

      // Title block
      set(30, "bold", WHITE);
      pdf.text("CONVERGENCE", PW / 2, 122, { align: "center" });

      set(12, "normal", [160, 220, 210] as RGB);
      pdf.text("Documentation Technique & Metier", PW / 2, 132, { align: "center" });

      set(9, "normal", [100, 180, 170] as RGB);
      pdf.text("Plateforme de donnees  —  Marches Emergents", PW / 2, 141, { align: "center" });

      // Divider
      pdf.setDrawColor(...TEAL);
      pdf.setLineWidth(0.8);
      pdf.line(ML + 25, 150, PW - ML - 25, 150);

      // Author
      set(11, "bold", WHITE);
      pdf.text("EmergenceRDC", PW / 2, 165, { align: "center" });
      set(9, "normal", [120, 180, 175] as RGB);
      pdf.text("Version 1.0   ·   Mai 2026", PW / 2, 173, { align: "center" });

      // TOC block
      set(8, "bold", TEAL);
      pdf.text("SOMMAIRE", PW / 2, 195, { align: "center" });

      const tocItems = [
        ...sections.map((s, i) => `${i + 1}.  ${s.label}`),
        `${sections.length + 1}.  Roles & Permissions`,
        `${sections.length + 2}.  Architecture Technique`,
      ];

      set(8, "normal", [200, 225, 220] as RGB);
      tocItems.forEach((item, i) => {
        pdf.text(item, PW / 2, 204 + i * 7, { align: "center" });
      });

      footerStamp();

      /* ══════════════════════════════════════════════════
         CONTENT PAGES
      ══════════════════════════════════════════════════ */
      newPage();

      sections.forEach((section, sIdx) => {
        addSectionHead(`${sIdx + 1}. ${section.label}`);
        y += 2;

        section.pages.forEach((page, pIdx) => {
          addPageHead(page.title, page.url);
          addRolePills(page.roles);
          y += 1;

          addLabel("Role metier");
          addText(page.business, 8.5, "normal", DARK);
          y += 1;

          addLabel("Architecture technique");
          addText(page.technical, 8.5, "normal", DARK);
          y += 1;

          addLabel("Fonctionnalites cles");
          addBullets(page.features);

          if (pIdx < section.pages.length - 1) {
            addSep();
          }
          y += 5;
        });

        y += 3;
      });

      /* ─── Roles & Permissions ─────────────────────────── */
      addSectionHead(`${sections.length + 1}. Roles & Permissions`);
      y += 2;

      roles.forEach((r) => {
        guard(20);
        const col = ROLE_COLORS[r.name] ?? SLATE;
        set(9, "bold", WHITE);
        const bw = pdf.getTextWidth(r.name) + 8;
        pdf.setFillColor(...col);
        pdf.roundedRect(ML, y - 5, bw, 7.5, 1.5, 1.5, "F");
        pdf.text(r.name, ML + 4, y);
        y += 9;
        addText(r.description, 8.5, "normal", DARK);
        y += 3;
      });

      y += 2;

      /* ─── Architecture Technique ──────────────────────── */
      addSectionHead(`${sections.length + 2}. Architecture Technique`);
      y += 2;

      techStack.forEach((layer) => {
        guard(18);
        set(9.5, "bold", TEAL);
        pdf.text(layer.layer, ML, y);
        y += 5;
        addBullets(layer.items);
        y += 3;
      });

      footerStamp();

      /* ══════════════════════════════════════════════════
         SCREENSHOTS PAGE
      ══════════════════════════════════════════════════ */
      newPage();
      set(13, "bold", DARK);
      pdf.text("Aperçu de la Plateforme", ML, y);
      y += 8;

      const shots = [
        { src: "/cap1.jpg",  fmt: "JPEG" as const, label: "Interface principale" },
        { src: "/stats.png", fmt: "PNG"  as const, label: "Statistiques & Indicateurs" },
        { src: "/spi.png",   fmt: "PNG"  as const, label: "Vue données financières" },
        { src: "/fd.png",    fmt: "PNG"  as const, label: "Gestion des fonds" },
      ];
      const iW = (CW - 6) / 2;
      for (let i = 0; i < shots.length; i += 2) {
        const li = await loadImg(shots[i].src);
        const ri = shots[i + 1] ? await loadImg(shots[i + 1].src) : null;
        const lH = li  ? Math.min(iW * (li.naturalHeight / li.naturalWidth), 70)  : 0;
        const rH = ri  ? Math.min(iW * (ri.naturalHeight / ri.naturalWidth), 70)  : 0;
        const rowH = Math.max(lH, rH, 40);
        guard(rowH + 16);
        if (li)  { pdf.addImage(li,  shots[i].fmt,     ML,          y, iW, lH); }
        if (ri && shots[i + 1]) { pdf.addImage(ri, shots[i + 1].fmt, ML + iW + 6, y, iW, rH); }
        set(7.5, "normal", GRAY);
        pdf.text(shots[i].label, ML + iW / 2, y + rowH + 5, { align: "center" });
        if (shots[i + 1]) pdf.text(shots[i + 1].label, ML + iW + 6 + iW / 2, y + rowH + 5, { align: "center" });
        y += rowH + 12;
      }

      /* ══════════════════════════════════════════════════
         ARCHITECTURE DIAGRAM PAGE
      ══════════════════════════════════════════════════ */
      newPage();
      set(13, "bold", DARK);
      pdf.text("Schéma d'Architecture Technique", ML, y);
      y += 10;

      const dX = ML, dW = CW;

      // Layer 1 — Frontend (teal)
      pdf.setFillColor(19, 78, 74);
      pdf.roundedRect(dX, y, dW, 22, 2, 2, "F");
      set(8.5, "bold", [94, 234, 212] as RGB);
      pdf.text("FRONTEND — Next.js 14 App Router · TypeScript · React 18", dX + 4, y + 8);
      set(7.5, "normal", [204, 251, 241] as RGB);
      pdf.text("Server Components (RSC)  ·  Client Components  ·  Server Actions  ·  Zod Validation", dX + 4, y + 16);
      y += 26;

      pdf.setDrawColor(...TEAL); pdf.setLineWidth(0.5);
      pdf.line(dX + dW / 2, y, dX + dW / 2, y + 4); y += 5;

      // Layer 2 — Auth (violet)
      pdf.setFillColor(46, 16, 101);
      pdf.roundedRect(dX, y, dW, 22, 2, 2, "F");
      set(8.5, "bold", [196, 181, 253] as RGB);
      pdf.text("AUTHENTIFICATION — NextAuth.js v5  ·  JWT  ·  bcryptjs", dX + 4, y + 8);
      set(7.5, "normal", [221, 214, 254] as RGB);
      pdf.text("Session 2 min  ·  Middleware RBAC  ·  5 rôles : VISITOR / CLIENT / AGENT / ADMIN / TRAINING", dX + 4, y + 16);
      y += 26;

      pdf.setDrawColor(...TEAL);
      pdf.line(dX + dW / 2, y, dX + dW / 2, y + 4); y += 5;

      // Layer 3 — Prisma + UI
      const hW = (dW - 4) / 2;
      pdf.setFillColor(8, 51, 68);
      pdf.roundedRect(dX, y, hW, 30, 2, 2, "F");
      set(8.5, "bold", [125, 211, 252] as RGB);
      pdf.text("PRISMA ORM 5.15", dX + 4, y + 8);
      set(7.5, "normal", [186, 230, 253] as RGB);
      pdf.text("StaticInfo*  ·  HistoricalData*", dX + 4, y + 16);
      pdf.text("User  ·  Country  ·  YieldCurve  ·  Contact", dX + 4, y + 23);

      pdf.setFillColor(28, 25, 23);
      pdf.roundedRect(dX + hW + 4, y, hW, 30, 2, 2, "F");
      set(8.5, "bold", [214, 211, 209] as RGB);
      pdf.text("INTERFACE & VALIDATION", dX + hW + 8, y + 8);
      set(7.5, "normal", [231, 229, 228] as RGB);
      pdf.text("TailwindCSS  ·  Radix UI  ·  Recharts  ·  Tremor", dX + hW + 8, y + 16);
      pdf.text("React Hook Form  ·  Zod  ·  Sonner  ·  next-themes", dX + hW + 8, y + 23);
      y += 34;

      pdf.setDrawColor(...TEAL);
      pdf.line(dX + dW / 2, y, dX + dW / 2, y + 4); y += 5;

      // Layer 4 — Database (green)
      pdf.setFillColor(5, 46, 22);
      pdf.roundedRect(dX, y, dW, 30, 2, 2, "F");
      set(8.5, "bold", [134, 239, 172] as RGB);
      pdf.text("BASE DE DONNÉES — PostgreSQL", dX + 4, y + 8);
      set(7.5, "normal", [187, 247, 208] as RGB);
      pdf.text("User · Continent · Country · StaticInfoEquity/Bond/Commo/Index/Fx/Fund", dX + 4, y + 16);
      pdf.text("HistoricalData*  ·  YieldCurve  ·  StaticInfoCountry  ·  Contact", dX + 4, y + 23);
      y += 35;

      /* ── RBAC Matrix ── */
      y += 6;
      set(13, "bold", DARK);
      pdf.text("Matrice d'Acces par Role", ML, y);
      y += 8;

      const rbacCols = ["VISITOR","CLIENT","AGENT","ADMIN"];
      const rbacColColors: Record<string, RGB> = { VISITOR:[71,85,99], CLIENT:[37,99,235], AGENT:[13,148,136], ADMIN:[124,58,237] };
      const rbacRows = [
        { label: "Pages publiques",             access: ["full","full","full","full"] },
        { label: "Actifs financiers",            access: ["none","full","full","full"] },
        { label: "Navigation geographique",      access: ["none","full","full","full"] },
        { label: "Admin pays & contacts",        access: ["none","none","partial","full"] },
        { label: "Gestion utilisateurs",         access: ["none","none","none","full"] },
      ];
      const cW2 = (CW - 60) / 4, lW2 = 60, rH2 = 8;

      // Header
      pdf.setFillColor(30, 41, 59);
      pdf.rect(ML, y, lW2, 9, "F");
      rbacCols.forEach((col, ci) => {
        const c = rbacColColors[col];
        pdf.setFillColor(...c);
        pdf.rect(ML + lW2 + ci * cW2, y, cW2, 9, "F");
        set(6.5, "bold", WHITE);
        pdf.text(col, ML + lW2 + ci * cW2 + cW2 / 2, y + 6, { align: "center" });
      });
      y += 10;

      rbacRows.forEach((row, ri) => {
        pdf.setFillColor(ri % 2 === 0 ? 15 : 30, ri % 2 === 0 ? 23 : 41, ri % 2 === 0 ? 42 : 59);
        pdf.rect(ML, y, lW2, rH2, "F");
        set(6, "normal", [203, 213, 225] as RGB);
        pdf.text(row.label, ML + 2, y + 5.5);
        row.access.forEach((acc, ci) => {
          pdf.setFillColor(ri % 2 === 0 ? 15 : 30, ri % 2 === 0 ? 23 : 41, ri % 2 === 0 ? 42 : 59);
          pdf.rect(ML + lW2 + ci * cW2, y, cW2, rH2, "F");
          const col = acc === "full" ? ([34,197,94] as RGB) : acc === "partial" ? ([234,179,8] as RGB) : ([75,85,99] as RGB);
          pdf.setFillColor(...col);
          pdf.circle(ML + lW2 + ci * cW2 + cW2 / 2, y + rH2 / 2, 2.5, "F");
        });
        y += rH2 + 0.5;
      });
      y += 4;
      // Legend
      set(6.5, "normal", GRAY);
      pdf.setFillColor(34, 197, 94); pdf.circle(ML + 4, y, 2.5, "F");
      pdf.text("Acces complet", ML + 9, y + 2);
      pdf.setFillColor(234, 179, 8); pdf.circle(ML + 46, y, 2.5, "F");
      pdf.text("Acces partiel", ML + 51, y + 2);
      pdf.setFillColor(75, 85, 99); pdf.circle(ML + 88, y, 2.5, "F");
      pdf.text("Aucun acces", ML + 93, y + 2);

      footerStamp();

      pdf.save("Convergence_Documentation.pdf");
    } catch (err) {
      console.error("PDF generation error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleDownload}
      disabled={loading}
      className="flex items-center gap-2 bg-teal-700 hover:bg-teal-600 text-white"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      {loading ? "Génération..." : "Télécharger la documentation (PDF)"}
    </Button>
  );
}
