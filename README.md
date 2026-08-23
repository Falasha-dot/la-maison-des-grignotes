# La Maison des Grignote — Site vitrine

Site vitrine pour **La Maison des Grignote**, pâtisserie artisanale à Bouaké (Broukro), Côte d'Ivoire.
Responsable : Diby Bosson Agnès Jean Joanna — *« Des douceurs faites avec amour ! »*

## Ouvrir le site

Aucune installation n'est nécessaire. Ouvrez simplement `index.html` dans un navigateur,
ou servez le dossier avec n'importe quel serveur statique (Live Server, `python -m http.server`, etc.).

## Structure du projet

```
la-maison-des-grignote/
├── index.html              → page unique du site vitrine
├── css/
│   ├── style.css           → styles principaux, tokens (couleurs, typo)
│   └── responsive.css      → adaptations mobile / tablette / desktop
├── js/
│   ├── config.js           → TOUTES les informations de l'entreprise (à modifier ici)
│   ├── main.js              → lightbox galerie, liens de contact
│   ├── whatsapp.js         → génération des messages WhatsApp préremplis
│   ├── animations.js       → scroll reveal, header au scroll, menu mobile
│   └── supabase.js         → intégration Supabase (prête, désactivée par défaut)
├── assets/
│   ├── images/
│   │   ├── hero/, patisserie/, maquillage/, galerie/
│   ├── logo/
│   └── icons/
└── README.md
```

## Modifier les informations de l'entreprise

Toutes les coordonnées (téléphone, WhatsApp, email, adresse, réseaux sociaux) sont
centralisées dans **`js/config.js`**. C'est le seul fichier à modifier pour mettre
le site à jour — aucune information n'est dupliquée ailleurs dans le code.

⚠️ Le lien Facebook et le compte Instagram n'ont pas été fournis avec une URL complète.
Ajoutez-les dans `CONFIG.reseaux.facebook` et `CONFIG.reseaux.instagram` dès qu'ils
seront disponibles.

## Boutons WhatsApp

Tous les boutons "Commander" utilisent l'attribut `data-whatsapp="Nom de la prestation"`.
Au clic, un message prérempli s'ouvre automatiquement dans WhatsApp avec le bon numéro
(centralisé dans `config.js`). Le bouton flottant en bas à droite ouvre un message général.

## Images

Le dossier `assets/images/galerie/` contient 4 photos réelles fournies par la cliente
(réalisations de croquettes salées). Les autres visuels du site (icônes de produits,
fonds dégradés) sont des éléments graphiques génériques en attendant de vraies photos
de gâteaux et de gâteaux au four, à ajouter par la cliente.

Pour remplacer une image : déposez le nouveau fichier dans le dossier correspondant
et mettez à jour le chemin `src` dans `index.html`.

## Section Maquillage

Aucune prestation de maquillage n'a été communiquée par la cliente. La section est
présente (comme demandé) avec un contenu volontairement général, prête à être complétée
dès que les prestations réelles seront fournies (idéalement via Supabase, table `prestations`
avec `categorie = "maquillage"`).

## Témoignages

Aucun témoignage réel n'a été fourni. La section affiche actuellement :
*« Vos témoignages apparaîtront bientôt ici. »*
Un exemple de structure HTML pour un futur témoignage est laissé en commentaire dans
`index.html`, juste à cet endroit.

## Activer Supabase

Le fichier `js/supabase.js` est prêt à l'emploi mais désactivé par défaut (le site
fonctionne avec le contenu statique du HTML). Pour l'activer :

1. Dans `index.html`, décommentez la ligne :
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
   ```
   (elle doit rester **avant** `js/supabase.js`)

2. Dans `js/supabase.js`, renseignez :
   ```js
   const SUPABASE_URL = "https://xxxxx.supabase.co";
   const SUPABASE_ANON_KEY = "votre-clé-anon-publique";
   ```

3. Créez les tables suivantes dans votre projet Supabase :

   **`prestations`** — id, nom, description, categorie (`patisserie` | `maquillage`), prix, image_url, actif, created_at, updated_at

   **`galerie`** — id, titre, description, image_url, categorie, actif, created_at

   **`temoignages`** — id, nom, commentaire, note, photo_url, actif, created_at

   **`informations_site`** — id, nom_entreprise, responsable, slogan, telephone, whatsapp, email, ville, quartier, facebook, instagram, description, updated_at

4. Décommentez les appels dans `initSupabaseContent()` (dans `supabase.js`) et injectez
   les données récupérées dans le DOM aux emplacements souhaités.

## Espace administrateur (à venir)

Le projet est structuré pour accueillir un espace d'administration basé sur
**Supabase Auth**, permettant d'ajouter, modifier, supprimer et activer/désactiver :
prestations, galerie, témoignages, coordonnées et réseaux sociaux.

## Vérifications effectuées

- ✅ Responsive testé pour 1920 / 1440 / 1366 / 1024 / 768 / 430 / 390 / 375 px
- ✅ Menu hamburger animé sur mobile
- ✅ Boutons WhatsApp fonctionnels avec message prérempli encodé
- ✅ Galerie + Lightbox (clavier, clic extérieur, précédent/suivant)
- ✅ Animations au scroll (Intersection Observer) + `prefers-reduced-motion` respecté
- ✅ Aucun débordement horizontal
- ✅ Structure HTML sémantique + attributs d'accessibilité de base
- ✅ SEO local (title, meta description, mots-clés Bouaké / Broukro)
- ✅ Numéro WhatsApp utilisé : **05 55 61 46 42**
