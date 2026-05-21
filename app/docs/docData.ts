export type PageDoc = {
  title: string;
  url: string;
  roles: string[];
  business: string;
  technical: string;
  features: string[];
};

export type SectionData = {
  id: string;
  label: string;
  pages: PageDoc[];
};

export const sections: SectionData[] = [
  {
    id: "auth",
    label: "Authentification",
    pages: [
      {
        title: "Connexion",
        url: "/auth/login",
        roles: ["Public"],
        business:
          "Point d'entrée sécurisé de la plateforme. L'utilisateur s'authentifie avec son identifiant et son mot de passe. Une fois connecté, il est redirigé vers son espace selon son rôle. Sans session valide, toutes les pages protégées sont inaccessibles.",
        technical:
          "NextAuth.js v5 avec un credentials provider. Session JWT avec expiration de 2 minutes. Hachage des mots de passe via bcryptjs. Validation des champs par schéma Zod (LoginSchema). Formulaire piloté par React Hook Form.",
        features: [
          "Validation des champs en temps réel",
          "Session JWT sécurisée",
          "Redirection automatique post-connexion",
          "Affichage des erreurs d'authentification",
        ],
      },
      {
        title: "Inscription",
        url: "/auth/register",
        roles: ["Public"],
        business:
          "Permet la création d'un nouveau compte utilisateur. Le rôle (VISITOR par défaut) et le statut (INACTIF jusqu'à validation) sont gérés par un administrateur après création.",
        technical:
          "Formulaire React Hook Form validé par RegisterSchema (Zod). Le mot de passe est haché côté serveur avant persistance en base via Prisma. La session n'est pas créée automatiquement à l'inscription.",
        features: [
          "Validation du format email",
          "Confirmation du mot de passe",
          "Hachage sécurisé bcryptjs",
          "Gestion des erreurs de doublon",
        ],
      },
    ],
  },
  {
    id: "admin",
    label: "Administration",
    pages: [
      {
        title: "Gestion des Pays",
        url: "/admin/countries",
        roles: ["ADMIN", "AGENT"],
        business:
          "Référentiel géographique central de la plateforme. Chaque pays est le pivot autour duquel s'organisent les actifs financiers, les utilisateurs et les indicateurs macroéconomiques. La couverture des marchés émergents dépend de ce référentiel.",
        technical:
          "Liste paginée (20 entrées/page) avec recherche full-text insensible à la casse. CRUD complet (créer, lire, modifier, supprimer). Relations Prisma avec Continent, Currency et StaticInfoCountry. Breadcrumb dynamique.",
        features: [
          "Recherche par nom de pays",
          "Pagination (20 pays par page)",
          "Création / modification / suppression",
          "Vue détail par pays",
          "Association devise et continent",
          "Affichage du drapeau (code ISO)",
        ],
      },
      {
        title: "Gestion des Utilisateurs",
        url: "/admin/users",
        roles: ["ADMIN"],
        business:
          "Administration centralisée des comptes. Permet de définir les droits d'accès (rôle), l'état du compte (ACTIF, INACTIF, SUSPENDU) et le périmètre géographique de chaque utilisateur. Critique pour contrôler qui accède à quelles données.",
        technical:
          "Pagination (10 utilisateurs/page), recherche sur username. CRUD complet. Champs gérés : username, email, rôle (enum UserRoles), statut (enum UserStatuses), pays et continent rattachés.",
        features: [
          "Recherche par nom d'utilisateur",
          "Pagination (10 par page)",
          "Attribution de rôle et statut",
          "Rattachement géographique (pays/continent)",
          "Création / modification / suppression",
        ],
      },
      {
        title: "Messages de Contact",
        url: "/admin/contacts",
        roles: ["ADMIN", "AGENT"],
        business:
          "Gestion des demandes entrantes soumises via le formulaire public. Chaque message suit un workflow : NOUVEAU → EN COURS → TERMINÉ. Permet un suivi rigoureux des sollicitations clients ou prospects.",
        technical:
          "Liste des entrées Contact en base Prisma. Statut géré par l'enum ContactStatuses (NOUVEAU, ENCOURS, TERMINE). CRUD complet avec vue détail. Pagination et filtrage disponibles.",
        features: [
          "Suivi des statuts (NOUVEAU / EN COURS / TERMINÉ)",
          "Vue détail de chaque message",
          "Modification et suppression",
          "Pagination de la liste",
        ],
      },
    ],
  },
  {
    id: "indexes",
    label: "Indices Boursiers",
    pages: [
      {
        title: "Liste des Indices",
        url: "/admin/indexes",
        roles: ["CLIENT", "AGENT", "ADMIN"],
        business:
          "Un indice boursier est un panier d'actifs représentant la performance d'un marché, d'un secteur ou d'une zone géographique (ex : MSCI Emerging Markets, S&P 500). Outil de benchmarking essentiel pour mesurer la performance des portefeuilles exposés aux marchés émergents.",
        technical:
          "Liste paginée avec recherche. Chaque entrée StaticInfoIndex est liée à un pays. Vue grille ou tableau selon le breakpoint. Données historiques (HistoricalDataIndex) avec prix de clôture, variation journalière et date.",
        features: [
          "Recherche par nom ou ticker",
          "Pagination",
          "Lien vers la vue détail",
          "Données historiques quotidiennes",
          "Filtrage par pays",
        ],
      },
      {
        title: "Détail d'un Indice",
        url: "/admin/indexes/[indexId]",
        roles: ["CLIENT", "AGENT", "ADMIN"],
        business:
          "Fiche complète d'un indice : composition, historique de performance, pays de référence. Permet une analyse approfondie avant toute décision d'investissement ou de benchmarking.",
        technical:
          "Route dynamique Next.js. Chargement du StaticInfoIndex par ID avec ses relations (pays, données historiques). Graphique de performance via Recharts/Tremor. Breadcrumb contextualisé.",
        features: [
          "Graphique de performance historique",
          "Données de clôture et variation",
          "Informations statiques (nom, ticker, pays)",
          "Navigation retour vers la liste",
        ],
      },
    ],
  },
  {
    id: "equities",
    label: "Actions (Equities)",
    pages: [
      {
        title: "Liste des Actions",
        url: "/admin/equities",
        roles: ["CLIENT", "AGENT", "ADMIN"],
        business:
          "Une action (equity) représente une part de propriété dans une entreprise cotée. Les marchés émergents offrent un accès à des entreprises à fort potentiel de croissance en Afrique, Asie, Amérique Latine. La plateforme couvre 14 secteurs économiques.",
        technical:
          "Vue grille avec recherche. Chaque StaticInfoEquity possède un ISIN, un ticker, un secteur (enum SectorList), un pays. Données historiques quotidiennes via HistoricalDataEquity (prix, variation).",
        features: [
          "Recherche par ISIN, ticker ou nom",
          "Filtrage par secteur (14 secteurs)",
          "Vue grille avec carte par action",
          "Données historiques de cours",
          "Pagination",
        ],
      },
      {
        title: "Détail d'une Action",
        url: "/admin/equities/[equityId]",
        roles: ["CLIENT", "AGENT", "ADMIN"],
        business:
          "Fiche détaillée d'un titre : ISIN, ticker, émetteur, secteur, pays de cotation, historique de prix. Utilisée par les analystes pour évaluer un titre avant inscription dans un portefeuille ou recommandation.",
        technical:
          "Route dynamique. Chargement par ID avec relations (pays, secteur, historique). Affichage du graphique de cours. Breadcrumb dynamique. Composant allStaticEquities pour les données statiques globales.",
        features: [
          "Graphique de cours historique",
          "ISIN et ticker",
          "Secteur et pays de cotation",
          "Variation journalière",
          "Navigation retour",
        ],
      },
    ],
  },
  {
    id: "bonds",
    label: "Obligations (Bonds)",
    pages: [
      {
        title: "Liste des Obligations",
        url: "/admin/bonds",
        roles: ["CLIENT", "AGENT", "ADMIN"],
        business:
          "Une obligation est un instrument de dette : l'émetteur (État, entreprise) emprunte des fonds aux investisseurs en échange de paiements d'intérêts réguliers (coupons) et du remboursement du capital à échéance (maturité). La plateforme catégorise les obligations en 6 types pour une analyse ciblée des marchés émergents.",
        technical:
          "Interface à 6 onglets (Tabs Radix UI). Chaque onglet filtre par type via un champ booléen (greenBond, dualCurrency, inflationLinked, callable) ou par enum ACF (ACF_1 = OECD, ACF_2 = Emerging Markets). Tableau avec ScrollArea, pagination indépendante par onglet.",
        features: [
          "6 onglets : Emerging Market, OECD, Green, Dual Currency, Inflation-linked, Callable",
          "Recherche par émetteur ou description",
          "Colonnes : ISIN, taux de coupon, classe de coupon, devise principale, maturité, marché",
          "Pagination par onglet (50 entrées/page)",
          "Compteur total des obligations",
        ],
      },
      {
        title: "Détail d'une Obligation",
        url: "/admin/bonds/[bondId]",
        roles: ["CLIENT", "AGENT", "ADMIN"],
        business:
          "Fiche complète : émetteur, conditions de coupon, devise, marché d'émission, type d'obligation et historique de prix. Essentielle pour l'analyse crédit et la valorisation des portefeuilles obligataires.",
        technical:
          "Route dynamique. StaticInfoBond chargé avec relations (principalCurrency, market). Affichage conditionnel des attributs spéciaux (green, callable, inflation-linked). Données historiques HistoricalDataBond.",
        features: [
          "ISIN et description",
          "Taux et classe de coupon",
          "Devise principale et marché d'émission",
          "Date de maturité",
          "Indicateurs spéciaux (green, callable...)",
          "Historique de prix",
        ],
      },
    ],
  },
  {
    id: "commodities",
    label: "Matières Premières (Commodities)",
    pages: [
      {
        title: "Liste des Matières Premières",
        url: "/admin/commodities",
        roles: ["CLIENT", "AGENT", "ADMIN"],
        business:
          "Les matières premières sont des produits de base échangés sur les marchés mondiaux : métaux précieux (or, argent), énergie (pétrole, gaz naturel), produits agricoles (café, cacao, blé), métaux industriels (cuivre, aluminium). Indicateurs vitaux de la santé économique des pays producteurs émergents.",
        technical:
          "Liste avec commoSelect pour le filtrage par catégorie. StaticInfoCommo avec relations pays. Données historiques via HistoricalDataCommo (prix de clôture, variation). Vue commoBody et commoViews.",
        features: [
          "Filtrage par catégorie de matière première",
          "Recherche par nom",
          "Données historiques quotidiennes",
          "Lien vers la vue détail",
          "Pagination",
        ],
      },
      {
        title: "Détail d'une Matière Première",
        url: "/admin/commodities/[commoId]",
        roles: ["CLIENT", "AGENT", "ADMIN"],
        business:
          "Fiche d'une commodity : prix spot, historique de cours, marché de référence. Utilisée pour l'analyse des tendances de prix et l'évaluation de l'exposition aux matières premières dans un portefeuille.",
        technical:
          "Route dynamique. StaticInfoCommo avec données historiques. Graphique de cours. Composant commoViews pour la vue enrichie. Loading skeleton pour les états de chargement.",
        features: [
          "Graphique de cours historique",
          "Prix spot et variation journalière",
          "Marché de référence",
          "Catégorie et description",
        ],
      },
    ],
  },
  {
    id: "fxrates",
    label: "Taux de Change (FX Rates)",
    pages: [
      {
        title: "Liste des Taux de Change",
        url: "/admin/fxrates",
        roles: ["CLIENT", "AGENT", "ADMIN"],
        business:
          "Le taux de change mesure la valeur d'une devise par rapport à une autre. Sur les marchés émergents, la volatilité des devises est un facteur de risque et d'opportunité majeur. La plateforme couvre les paires de devises clés des marchés émergents.",
        technical:
          "StaticInfoFx avec paires de devises. fxSelect pour le filtrage. Données historiques HistoricalDataFx (taux de clôture, variation journalière). Composants fxBody, fxCountryView, allStaticFx.",
        features: [
          "Filtrage par pays ou devise",
          "Paires de devises (ex : EUR/USD, USD/NGN)",
          "Variation journalière en %",
          "Données historiques quotidiennes",
          "Lien vers le détail",
        ],
      },
      {
        title: "Détail d'un Taux de Change",
        url: "/admin/fxrates/[fxId]",
        roles: ["CLIENT", "AGENT", "ADMIN"],
        business:
          "Analyse d'une paire de devises : historique du taux, variation, pays concernés. Permet de suivre l'évolution du taux de change pour couvrir un risque de change ou identifier des opportunités d'arbitrage.",
        technical:
          "Route dynamique. StaticInfoFx avec relations pays et données historiques. Graphique via Recharts/Tremor. fxViews et fxDetails pour l'affichage enrichi.",
        features: [
          "Graphique d'évolution du taux",
          "Taux spot et variation",
          "Pays de référence",
          "Historique complet",
        ],
      },
    ],
  },
  {
    id: "funds",
    label: "Fonds d'Investissement (Funds)",
    pages: [
      {
        title: "Liste des Fonds",
        url: "/admin/funds",
        roles: ["CLIENT", "AGENT", "ADMIN"],
        business:
          "Un fonds d'investissement regroupe des capitaux de plusieurs investisseurs pour les placer dans un portefeuille diversifié géré professionnellement. Les fonds des marchés émergents permettent une exposition géographique et sectorielle optimisée. La plateforme référence les acteurs clés : gestionnaire (advisor), dépositaire (custodian), administrateur et promoteur.",
        technical:
          "StaticInfoFund avec relations vers les entités custodian, advisor, administrator, promoter. Recherche, pagination. Composants fundViews pour la vue enrichie.",
        features: [
          "Recherche par nom de fonds",
          "Relations : gestionnaire, dépositaire, administrateur, promoteur",
          "Pays de domiciliation",
          "Pagination",
          "Vue détail complète",
        ],
      },
      {
        title: "Détail d'un Fonds",
        url: "/admin/funds/[fundId]",
        roles: ["CLIENT", "AGENT", "ADMIN"],
        business:
          "Fiche complète du fonds : nom, domicile, acteurs impliqués (gestionnaire, dépositaire, administrateur, promoteur). Indispensable pour la due diligence et l'analyse des structures de distribution.",
        technical:
          "Route dynamique. Chargement StaticInfoFund avec toutes ses relations. Affichage des entités associées (Person, Company). Breadcrumb dynamique.",
        features: [
          "Nom et domicile du fonds",
          "Gestionnaire (advisor)",
          "Dépositaire (custodian)",
          "Administrateur",
          "Promoteur",
        ],
      },
    ],
  },
  {
    id: "public",
    label: "Pages Publiques",
    pages: [
      {
        title: "Page d'Accueil",
        url: "/",
        roles: ["Public"],
        business:
          "Vitrine de la plateforme Convergence. Présente la proposition de valeur et oriente les visiteurs vers la connexion. Premier point de contact avec les prospects et les utilisateurs non connectés.",
        technical:
          "Page statique Next.js (Server Component). Section hero avec call-to-action vers /auth/login. Responsive, supporte les thèmes dark/light via next-themes.",
        features: [
          "Section hero marketing",
          "Bouton de connexion",
          "Compatible thème dark/light",
          "Responsive mobile/desktop",
        ],
      },
      {
        title: "Formulaire de Contact",
        url: "/contact",
        roles: ["Public"],
        business:
          "Canal de communication ouvert au public. Permet aux visiteurs, prospects ou clients de soumettre une demande. Chaque message est enregistré en base avec le statut NOUVEAU pour être traité par l'équipe.",
        technical:
          "React Hook Form validé par ContactSchema (Zod). Server Action pour la persistance en base Prisma. Notification toast (Sonner) après envoi. Champs : nom, email, sujet, message.",
        features: [
          "Validation des champs (nom, email, message)",
          "Envoi en base de données",
          "Notification de confirmation",
          "Accessible sans connexion",
        ],
      },
      {
        title: "Vue par Continents",
        url: "/continents",
        roles: ["CLIENT", "AGENT", "ADMIN"],
        business:
          "Navigation géographique de la plateforme. Permet d'explorer les données par grande zone (AFRICA, AMERICA, ASIA, EUROPE, OCEANIA, WORLD). Les agents sont automatiquement restreints à leur continent assigné, garantissant la segmentation des données.",
        technical:
          "Routing dynamique /continents/[contId]/[[...slug]]. Accordion Radix UI pour la navigation par continent. Restriction AGENT : lecture du continent en session JWT, redirection si hors périmètre. Composant General Overview (Go) par pays.",
        features: [
          "Navigation par continent",
          "Accordion de navigation",
          "Restriction géographique AGENT",
          "Vue détail par pays",
          "Indicateurs macroéconomiques (StaticInfoCountry)",
          "Courbe des taux (YieldCurve)",
        ],
      },
    ],
  },
];

export const roles = [
  {
    name: "VISITOR",
    description:
      "Consultation très limitée. Accès aux pages publiques uniquement (accueil, contact).",
  },
  {
    name: "CLIENT",
    description:
      "Accès en lecture aux actifs financiers (indices, équités, obligations, commodities, FX, fonds) et aux vues par continents.",
  },
  {
    name: "AGENT",
    description:
      "Accès partiel à l'administration (pays, contacts) limité à son continent/pays assigné. Accès complet aux actifs financiers.",
  },
  {
    name: "ADMIN",
    description:
      "Accès complet à toutes les fonctionnalités : gestion des utilisateurs, pays, contacts, actifs et paramètres système.",
  },
  {
    name: "TRAINING",
    description:
      "Accès restreint réservé aux utilisateurs en formation sur la plateforme.",
  },
];

export const techStack = [
  {
    layer: "Framework & Runtime",
    items: [
      "Next.js 14.2 — App Router, Server Components, Server Actions",
      "TypeScript — typage statique strict",
      "React 18 — Suspense, concurrent features",
    ],
  },
  {
    layer: "Base de données & ORM",
    items: [
      "PostgreSQL — base de données relationnelle principale",
      "Prisma 5.15 — ORM avec schéma typé et migrations",
      "Relations : User, Country, Continent, Currency, Assets historiques",
    ],
  },
  {
    layer: "Authentification & Sécurité",
    items: [
      "NextAuth.js v5 (beta) — authentification credentials",
      "JWT — stratégie de session (expiration 2 min)",
      "bcryptjs — hachage des mots de passe",
      "Zod — validation des schémas côté serveur et client",
    ],
  },
  {
    layer: "Interface utilisateur",
    items: [
      "TailwindCSS 3.4 — utility-first CSS",
      "Radix UI — composants accessibles (Accordion, Tabs, Dialog...)",
      "Tremor & Recharts — graphiques financiers",
      "Remix Icon & Lucide React — icônes",
      "Sonner — notifications toast",
      "next-themes — dark/light mode",
    ],
  },
  {
    layer: "Formulaires & Validation",
    items: [
      "React Hook Form 7 — gestion des formulaires performante",
      "Zod — schémas de validation (LoginSchema, RegisterSchema, ContactSchema...)",
      "use-debounce — recherche différée",
    ],
  },
  {
    layer: "Modèle de données financières",
    items: [
      "StaticInfoEquity — actions (ISIN, ticker, secteur, pays)",
      "StaticInfoBond — obligations (coupon, maturité, type, devise)",
      "StaticInfoCommo — matières premières",
      "StaticInfoIndex — indices boursiers",
      "StaticInfoFx — paires de devises",
      "StaticInfoFund — fonds (acteurs, domicile)",
      "HistoricalData* — séries de prix quotidiens pour chaque classe d'actif",
      "YieldCurve — courbe des taux par pays et tenor",
      "StaticInfoCountry — indicateurs macro (PIB, inflation, taux directeur, rating)",
    ],
  },
];
