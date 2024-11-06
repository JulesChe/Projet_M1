my-react-app/
├── public/                  # Dossier public pour les fichiers statiques (HTML, images, manifest.json, etc.)
│   ├── index.html           # Point d'entrée HTML
│   └── assets/              # Images, logos, icônes, etc.
│
├── src/                     # Dossier source principal
│   ├── components/          # Composants réutilisables
│   │   ├── Button/          # Exemple d'un composant isolé
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── Button.module.css  # CSS spécifique au composant
│   │   └── ...
│   │
│   ├── features/            # Dossiers pour chaque fonctionnalité du projet
│   │   ├── Auth/            # Exemple de fonctionnalité
│   │   │   ├── AuthContext.tsx  # Contexte pour la gestion de l'authentification
│   │   │   ├── AuthProvider.tsx # Fournisseur de contexte d'authentification
│   │   │   └── useAuth.tsx      # Hook personnalisé pour l'authentification
│   │   └── ...
│   │
│   ├── pages/               # Composants de pages (par route) pour le routage
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   └── ...
│   │
│   ├── hooks/               # Hooks personnalisés
│   │   ├── useFetch.ts      # Exemple de hook personnalisé pour les requêtes
│   │   └── ...
│   │
│   ├── services/            # Appels API et logique métier
│   │   ├── api.ts           # Configuration et fonctions pour les appels API
│   │   └── ...
│   │
│   ├── context/             # Contextes globaux pour l'application
│   │   ├── ThemeContext.tsx # Exemple de contexte pour la gestion du thème
│   │   └── ...
│   │
│   ├── styles/              # Fichiers de style globaux et thèmes
│   │   ├── global.css       # Styles globaux
│   │   └── variables.css    # Variables de thème ou styles de base
│   │
│   ├── App.tsx              # Composant racine
│   ├── index.tsx            # Point d'entrée de l'application
│   └── types/               # Déclarations TypeScript et types personnalisés
│       └── index.d.ts       # Types globaux
│
├── .env                     # Variables d'environnement
├── package.json             # Dépendances et scripts npm
└── tsconfig.json            # Configuration TypeScript (si TypeScript est utilisé)
