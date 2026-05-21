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
