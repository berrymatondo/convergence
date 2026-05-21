"use client";

import { useState } from "react";
import { FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type RGB = [number, number, number];

const TEAL: RGB = [0, 150, 136];
const DARK_TEAL: RGB = [0, 100, 95];
const WHITE: RGB = [255, 255, 255];
const DARK: RGB = [30, 30, 30];
const GRAY: RGB = [110, 110, 110];
const LIGHT_GRAY: RGB = [230, 230, 230];
const NAVY: RGB = [15, 30, 60];

/* ─── Cahier des charges content ─────────────────────────── */
const CDS = {
  metadata: {
    title: "Convergence — Cahier des Charges",
    version: "1.0",
    date: "Mai 2026",
    author: "EmergenceRDC",
    status: "Document de référence",
  },

  context: {
    title: "1. Contexte et Présentation du Projet",
    subsections: [
      {
        heading: "1.1 Contexte",
        body: "EmergenceRDC est un acteur spécialisé dans l'analyse et la diffusion de données financières sur les marchés émergents. Dans un contexte de mondialisation des flux de capitaux et de montée en puissance des économies d'Afrique, d'Asie et d'Amérique Latine, les investisseurs institutionnels, gestionnaires d'actifs et analystes financiers expriment un besoin croissant d'une plateforme centralisée, fiable et sécurisée pour accéder aux données de ces marchés.",
      },
      {
        heading: "1.2 Description du projet",
        body: "Convergence est une application web de gestion et de consultation de données financières dédiée aux marchés émergents. Elle couvre six classes d'actifs : indices boursiers, actions (equities), obligations (bonds), matières premières (commodities), taux de change (FX rates) et fonds d'investissement. La plateforme est multi-utilisateurs avec un contrôle d'accès basé sur les rôles (RBAC) et une segmentation géographique par continent et par pays.",
      },
      {
        heading: "1.3 Objectifs",
        body: "• Centraliser les données financières des marchés émergents sur une plateforme unique.\n• Offrir une visualisation structurée par classe d'actif et par zone géographique.\n• Garantir un accès sécurisé et différencié selon le profil utilisateur.\n• Permettre le suivi historique des prix et indicateurs clés.\n• Fournir aux équipes internes des outils d'administration robustes.",
      },
      {
        heading: "1.4 Périmètre",
        body: "La plateforme couvre les zones géographiques : AFRICA, AMERICA, ASIA, EUROPE, OCEANIA et WORLD. Les actifs référencés incluent des instruments des marchés émergents (ACF_2) et des marchés OCDE (ACF_1) à titre comparatif.",
      },
    ],
  },

  actors: {
    title: "2. Acteurs et Parties Prenantes",
    items: [
      {
        role: "ADMIN",
        description:
          "Administrateur système. Gère l'ensemble des utilisateurs, pays, actifs et paramètres. Accès illimité à toutes les fonctionnalités de la plateforme.",
      },
      {
        role: "AGENT",
        description:
          "Responsable d'une zone géographique. Accès à l'administration des pays et contacts de son périmètre uniquement. Consultation complète des actifs financiers.",
      },
      {
        role: "CLIENT",
        description:
          "Utilisateur professionnel (gestionnaire, analyste). Accès en consultation aux actifs financiers (indices, actions, obligations, commodities, FX, fonds) et aux vues géographiques.",
      },
      {
        role: "VISITOR",
        description:
          "Visiteur avec accès minimal. Pages publiques uniquement (accueil, contact). Aucun accès aux données financières.",
      },
      {
        role: "TRAINING",
        description:
          "Utilisateur en cours de formation. Accès restreint défini par l'administrateur.",
      },
    ],
  },

  functional: {
    title: "3. Exigences Fonctionnelles",
    modules: [
      {
        name: "3.1 Module Authentification",
        requirements: [
          "EF-01 : Le système doit permettre la connexion par identifiant et mot de passe.",
          "EF-02 : Le mot de passe doit être haché avant stockage (bcryptjs).",
          "EF-03 : La session utilisateur doit expirer automatiquement après 2 minutes d'inactivité.",
          "EF-04 : Le système doit gérer cinq rôles : ADMIN, AGENT, CLIENT, VISITOR, TRAINING.",
          "EF-05 : L'accès aux pages protégées doit être refusé sans session valide.",
          "EF-06 : Le système doit permettre l'inscription de nouveaux utilisateurs.",
        ],
      },
      {
        name: "3.2 Module Administration",
        requirements: [
          "EF-10 : L'administrateur doit pouvoir créer, modifier et supprimer des utilisateurs.",
          "EF-11 : L'administrateur doit pouvoir attribuer un rôle et un statut à chaque utilisateur.",
          "EF-12 : L'administrateur doit pouvoir gérer le référentiel des pays (CRUD).",
          "EF-13 : Chaque pays doit être associé à un continent, une devise et un code drapeau.",
          "EF-14 : L'administrateur doit pouvoir consulter et traiter les messages de contact.",
          "EF-15 : Les messages doivent suivre le workflow : NOUVEAU → EN COURS → TERMINÉ.",
        ],
      },
      {
        name: "3.3 Module Actifs Financiers",
        requirements: [
          "EF-20 : La plateforme doit référencer six classes d'actifs : indices, actions, obligations, commodities, taux de change, fonds.",
          "EF-21 : Chaque actif doit être consultable en liste paginée et en vue détail.",
          "EF-22 : La recherche textuelle doit être disponible sur toutes les listes d'actifs.",
          "EF-23 : Les données historiques de prix (quotidiennes) doivent être affichées sous forme de graphique.",
          "EF-24 : Les obligations doivent être catégorisées en 6 types : Emerging Market, OECD, Green, Dual Currency, Inflation-linked, Callable.",
          "EF-25 : Les fonds doivent référencer leurs acteurs : gestionnaire, dépositaire, administrateur, promoteur.",
          "EF-26 : Les agents doivent accéder uniquement aux actifs liés à leur zone géographique.",
        ],
      },
      {
        name: "3.4 Module Géographique",
        requirements: [
          "EF-30 : La plateforme doit offrir une navigation par continent et par pays.",
          "EF-31 : Chaque pays doit disposer d'une fiche avec indicateurs macroéconomiques (PIB, inflation, taux directeur, rating).",
          "EF-32 : La courbe des taux (yield curve) par pays doit être visualisable.",
          "EF-33 : La restriction géographique des agents doit être appliquée automatiquement à la connexion.",
        ],
      },
      {
        name: "3.5 Module Contact",
        requirements: [
          "EF-40 : Un formulaire de contact public doit permettre à tout visiteur de soumettre une demande.",
          "EF-41 : Chaque demande doit être enregistrée en base avec les champs : nom, email, sujet, message, date.",
          "EF-42 : Une confirmation visuelle (toast) doit être affichée après envoi.",
        ],
      },
    ],
  },

  nonFunctional: {
    title: "4. Exigences Non Fonctionnelles",
    items: [
      {
        category: "Performance",
        requirements: [
          "ENF-01 : Les pages de liste doivent charger en moins de 2 secondes sur connexion standard.",
          "ENF-02 : La pagination doit limiter les requêtes à 10-50 entrées par page.",
          "ENF-03 : Le moteur de recherche doit utiliser un délai (debounce) de 300 ms minimum.",
        ],
      },
      {
        category: "Sécurité",
        requirements: [
          "ENF-10 : Toutes les communications doivent transiter via HTTPS.",
          "ENF-11 : Les mots de passe ne doivent jamais être stockés en clair.",
          "ENF-12 : Les routes protégées doivent valider la session à chaque requête.",
          "ENF-13 : Les entrées utilisateur doivent être validées côté serveur (Zod).",
          "ENF-14 : Le contrôle d'accès RBAC doit être appliqué sur chaque action serveur.",
        ],
      },
      {
        category: "Disponibilité",
        requirements: [
          "ENF-20 : La plateforme doit viser une disponibilité de 99,5 % en production.",
          "ENF-21 : Les migrations de base de données doivent être réversibles (Prisma migrate).",
        ],
      },
      {
        category: "Maintenabilité",
        requirements: [
          "ENF-30 : Le code doit être typé statiquement en TypeScript.",
          "ENF-31 : Le schéma de base de données doit être géré via Prisma ORM.",
          "ENF-32 : Les composants UI doivent être réutilisables et centralisés dans /components.",
        ],
      },
      {
        category: "Accessibilité & UX",
        requirements: [
          "ENF-40 : L'interface doit être responsive (mobile et desktop).",
          "ENF-41 : Un mode sombre et un mode clair doivent être disponibles.",
          "ENF-42 : Les composants interactifs (accordion, tabs) doivent être accessibles au clavier.",
          "ENF-43 : Les messages d'erreur doivent être explicites et localisés en français.",
        ],
      },
    ],
  },

  technical: {
    title: "5. Architecture Technique",
    subsections: [
      {
        heading: "5.1 Stack technologique",
        body: "Framework : Next.js 14 (App Router) avec TypeScript. ORM : Prisma 5.15 sur PostgreSQL. Authentification : NextAuth.js v5 (JWT, bcryptjs). UI : TailwindCSS 3.4 + Radix UI + Tremor + Recharts. Validation : Zod + React Hook Form.",
      },
      {
        heading: "5.2 Architecture applicative",
        body: "L'application suit le modèle MVC adapté à Next.js : les Server Components jouent le rôle de contrôleurs et récupèrent les données via Prisma, les composants React constituent la vue, et les Server Actions traitent les mutations. Le routage est entièrement géré par l'App Router de Next.js avec des segments dynamiques ([id], [...slug]).",
      },
      {
        heading: "5.3 Modèle de données",
        body: "Entités principales : User, Continent, Country, Currency. Actifs financiers : StaticInfoEquity, StaticInfoBond, StaticInfoCommo, StaticInfoIndex, StaticInfoFx, StaticInfoFund. Données historiques : HistoricalDataEquity, HistoricalDataBond, HistoricalDataCommo, HistoricalDataIndex, HistoricalDataFx. Macroéconomie : StaticInfoCountry, YieldCurve. Communication : Contact.",
      },
      {
        heading: "5.4 Sécurité",
        body: "Authentification par credentials (username/password). Sessions JWT signées. Hachage bcryptjs (sel automatique). Validation Zod sur toutes les entrées. Middleware NextAuth pour la protection des routes. Segmentation géographique appliquée au niveau session.",
      },
      {
        heading: "5.5 Déploiement",
        body: "L'application est containerisée via Docker (Dockerfile présent). La base de données PostgreSQL est provisionnée séparément. Les variables d'environnement (DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL) sont injectées au déploiement. Le build de production exécute 'prisma generate && next build'.",
      },
    ],
  },

  deliverables: {
    title: "6. Livrables",
    items: [
      "Application web Convergence déployée et opérationnelle",
      "Code source versionné sur dépôt Git",
      "Schéma de base de données Prisma documenté",
      "Documentation technique et métier (présent document)",
      "Cahier des charges fonctionnel (présent document)",
      "Dockerfile pour containerisation",
      "Variables d'environnement documentées (.env.example)",
    ],
  },

  glossary: {
    title: "7. Glossaire",
    terms: [
      { term: "ISIN", def: "International Securities Identification Number — identifiant unique d'un instrument financier." },
      { term: "ACF", def: "Asset Class Family — catégorisation des actifs : ACF_1 (OCDE), ACF_2 (Marchés Émergents)." },
      { term: "Yield Curve", def: "Courbe des taux — représentation graphique des taux d'intérêt d'obligations par maturité." },
      { term: "RBAC", def: "Role-Based Access Control — contrôle d'accès basé sur les rôles utilisateurs." },
      { term: "JWT", def: "JSON Web Token — jeton d'authentification sécurisé à durée limitée." },
      { term: "ORM", def: "Object-Relational Mapping — couche d'abstraction entre le code et la base de données (Prisma)." },
      { term: "SSR", def: "Server-Side Rendering — rendu des pages côté serveur (Next.js App Router)." },
      { term: "Coupon", def: "Intérêt périodique versé par l'émetteur d'une obligation aux porteurs." },
      { term: "Maturité", def: "Date à laquelle le principal d'une obligation est remboursé à l'investisseur." },
      { term: "Green Bond", def: "Obligation verte — instrument de dette dont le produit finance des projets environnementaux." },
    ],
  },
};

export function DownloadCahierButton() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const { jsPDF } = await import("jspdf");

      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

      pdf.setProperties({
        title: "Convergence — Cahier des Charges",
        author: "EmergenceRDC",
        subject: "Cahier des charges fonctionnel et technique — Plateforme Convergence",
        keywords: "convergence, cahier des charges, emerging markets, specification, EmergenceRDC",
        creator: "EmergenceRDC",
      });

      const PW = 210;
      const PH = 297;
      const ML = 14;
      const CW = PW - ML * 2;
      let y = 14;
      let pageNum = 1;

      /* ─── Helpers ──────────────────────────────────────── */
      const set = (size: number, style: "normal" | "bold", color: RGB) => {
        pdf.setFontSize(size);
        pdf.setFont("helvetica", style);
        pdf.setTextColor(...color);
      };

      const footerStamp = () => {
        set(7.5, "normal", GRAY);
        pdf.text("EmergenceRDC  ·  Convergence — Cahier des Charges", ML, PH - 8);
        pdf.text(String(pageNum), PW - ML, PH - 8, { align: "right" });
      };

      const newPage = () => {
        footerStamp();
        pdf.addPage();
        pageNum++;
        y = 14;
        pdf.setFillColor(...NAVY);
        pdf.rect(0, 0, PW, 1.5, "F");
      };

      const guard = (need: number) => {
        if (y + need > PH - 18) newPage();
      };

      const addBody = (text: string, indent = 0) => {
        set(8.5, "normal", DARK);
        const lines = pdf.splitTextToSize(text, CW - indent);
        const lh = 8.5 * 0.43;
        guard(lines.length * lh + 2);
        pdf.text(lines, ML + indent, y);
        y += lines.length * lh + 1.5;
      };

      const addBullets = (items: string[]) => {
        items.forEach((item) => {
          set(8.5, "normal", DARK);
          const lines = pdf.splitTextToSize(`•  ${item}`, CW - 4);
          const lh = 8.5 * 0.43;
          guard(lines.length * lh + 1);
          pdf.text(lines, ML + 3, y);
          y += lines.length * lh + 0.8;
        });
        y += 1;
      };

      const addH1 = (text: string) => {
        guard(16);
        pdf.setFillColor(...NAVY);
        pdf.rect(ML, y - 1.5, CW, 11, "F");
        pdf.setFillColor(...TEAL);
        pdf.rect(ML, y - 1.5, 3, 11, "F");
        set(11, "bold", WHITE);
        pdf.text(text, ML + 7, y + 6);
        y += 15;
      };

      const addH2 = (text: string) => {
        guard(14);
        pdf.setFillColor(...TEAL);
        pdf.rect(ML, y, 2.5, 7, "F");
        set(9.5, "bold", DARK_TEAL);
        pdf.text(text, ML + 6, y + 5);
        y += 11;
      };

      const addSep = () => {
        guard(5);
        pdf.setDrawColor(...LIGHT_GRAY);
        pdf.setLineWidth(0.25);
        pdf.line(ML, y, ML + CW, y);
        y += 4;
      };

      const addKeyVal = (key: string, val: string) => {
        guard(7);
        set(8.5, "bold", NAVY);
        pdf.text(`${key} :`, ML, y);
        set(8.5, "normal", DARK);
        const kw = pdf.getTextWidth(`${key} : `);
        const lines = pdf.splitTextToSize(val, CW - kw);
        pdf.text(lines, ML + kw, y);
        y += lines.length * 3.8 + 1;
      };

      /* ══════════════════════════════════════════════════
         COVER PAGE
      ══════════════════════════════════════════════════ */
      pdf.setFillColor(...NAVY);
      pdf.rect(0, 0, PW, PH, "F");

      pdf.setFillColor(...TEAL);
      pdf.rect(0, 0, 6, PH, "F");

      // Top accent strip
      pdf.setFillColor(0, 100, 95);
      pdf.rect(0, 0, PW, 55, "F");

      set(9, "bold", [180, 230, 225] as RGB);
      pdf.text("EMERGENCERDC", ML + 8, 25);
      set(8, "normal", [120, 190, 185] as RGB);
      pdf.text("Plateforme Convergence  ·  Marches Emergants", ML + 8, 33);

      // Title block
      set(26, "bold", WHITE);
      pdf.text("CAHIER DES CHARGES", PW / 2, 90, { align: "center" });

      set(13, "normal", [160, 215, 210] as RGB);
      pdf.text("Fonctionnel & Technique", PW / 2, 102, { align: "center" });

      pdf.setDrawColor(...TEAL);
      pdf.setLineWidth(0.8);
      pdf.line(ML + 20, 112, PW - ML - 20, 112);

      // Meta block
      const metaY = 130;
      const metaItems = [
        ["Application", "Convergence"],
        ["Auteur", "EmergenceRDC"],
        ["Version", CDS.metadata.version],
        ["Date", CDS.metadata.date],
        ["Statut", CDS.metadata.status],
      ];
      metaItems.forEach(([k, v], i) => {
        set(8.5, "bold", [140, 200, 195] as RGB);
        pdf.text(`${k}`, PW / 2 - 30, metaY + i * 10, { align: "right" });
        pdf.setDrawColor(TEAL[0], TEAL[1], TEAL[2]);
        pdf.setLineWidth(0.2);
        pdf.line(PW / 2 - 28, metaY + i * 10 - 2, PW / 2 - 24, metaY + i * 10 - 2);
        set(8.5, "normal", WHITE);
        pdf.text(`${v}`, PW / 2 - 20, metaY + i * 10);
      });

      // Footer cover
      set(7.5, "normal", [80, 140, 135] as RGB);
      pdf.text("Document confidentiel  ·  Usage interne EmergenceRDC", PW / 2, PH - 18, {
        align: "center",
      });
      footerStamp();

      /* ══════════════════════════════════════════════════
         CONTENT PAGES
      ══════════════════════════════════════════════════ */
      newPage();

      /* ─── 1. Contexte ─────────────────────────────────── */
      addH1(CDS.context.title);
      CDS.context.subsections.forEach((sub) => {
        addH2(sub.heading);
        addBody(sub.body);
        y += 2;
      });
      y += 3;

      /* ─── 2. Acteurs ──────────────────────────────────── */
      addH1(CDS.actors.title);
      CDS.actors.items.forEach((actor, i) => {
        guard(20);
        const col = ({
          ADMIN: [124, 58, 237],
          AGENT: [13, 148, 136],
          CLIENT: [37, 99, 235],
          VISITOR: [75, 85, 99],
          TRAINING: [234, 88, 12],
        } as Record<string, RGB>)[actor.role] ?? (GRAY as RGB);

        pdf.setFillColor(...col);
        const bw = pdf.getTextWidth(actor.role) + 8;
        pdf.roundedRect(ML, y - 4.5, bw, 7, 1.5, 1.5, "F");
        set(9, "bold", WHITE);
        pdf.text(actor.role, ML + 4, y);
        y += 8;
        addBody(actor.description, 2);
        if (i < CDS.actors.items.length - 1) addSep();
        else y += 3;
      });

      /* ─── 3. Exigences fonctionnelles ─────────────────── */
      addH1(CDS.functional.title);
      CDS.functional.modules.forEach((mod) => {
        addH2(mod.name);
        addBullets(mod.requirements);
        y += 2;
      });

      /* ─── 4. Exigences non fonctionnelles ─────────────── */
      addH1(CDS.nonFunctional.title);
      CDS.nonFunctional.items.forEach((item) => {
        addH2(item.category);
        addBullets(item.requirements);
        y += 2;
      });

      /* ─── 5. Architecture technique ───────────────────── */
      addH1(CDS.technical.title);
      CDS.technical.subsections.forEach((sub) => {
        addH2(sub.heading);
        addBody(sub.body);
        y += 3;
      });

      /* ─── 6. Livrables ────────────────────────────────── */
      addH1(CDS.deliverables.title);
      addBullets(CDS.deliverables.items);
      y += 3;

      /* ─── 7. Glossaire ────────────────────────────────── */
      addH1(CDS.glossary.title);
      CDS.glossary.terms.forEach((entry) => {
        guard(12);
        set(8.5, "bold", DARK_TEAL);
        pdf.text(entry.term, ML, y);
        const termW = pdf.getTextWidth(entry.term + "  ");
        set(8.5, "normal", DARK);
        const lines = pdf.splitTextToSize(`—  ${entry.def}`, CW - termW);
        pdf.text(lines, ML + termW, y);
        y += lines.length * 3.8 + 2.5;
      });

      footerStamp();

      pdf.save("Convergence_CahierDesCharges.pdf");
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
      variant="outline"
      className="flex items-center gap-2 border-navy-700 text-navy-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <FileText className="h-4 w-4" />
      )}
      {loading ? "Génération..." : "Cahier des Charges (PDF)"}
    </Button>
  );
}
