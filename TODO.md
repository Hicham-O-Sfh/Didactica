# TODO — Didactica

Feuille de route d'amélioration du site. Chaque tâche est **autonome** : elle contient son
contexte, les fichiers concernés, les étapes et un critère de fin. Elle peut donc être traitée
dans une session Claude Code séparée, sans relire tout le document.

**Convention** : cocher la case et ajouter le hash du commit une fois la tâche terminée.

| Légende | Signification                                |
| ------- | -------------------------------------------- |
| 🔴      | Critique — bloque le SEO ou expose un risque |
| 🟠      | Important — gain élevé                       |
| 🟡      | Confort — à faire quand le reste est fait    |
| ⏱️      | Effort estimé pour une session               |

---

## Contexte du projet

- Site vitrine statique, école d'allemand **Didactica** à Oujda (Maroc).
- 5 pages HTML : `index.html`, `a-propos.html`, `tarifs-et-prix.html`, `faq.html`, `contactez-nous.html`.
- Stack actuelle : HTML/CSS/JS pur, jQuery 3.7.1 + Bootstrap 5 + Owl Carousel + WOW.js. Aucun build.
- Hébergement : **GitHub Pages** (`github.com/Hicham-O-Sfh/Didactica`). Nom de domaine à acheter ultérieurement.
- Objectif métier prioritaire : **référencement naturel local** (« cours d'allemand Oujda ») et
  génération de contacts WhatsApp.
- Le formulaire d'inscription collecte CIN + date de naissance : **besoin métier confirmé**, on le garde
  (voir `LEG-01` pour l'encadrement légal).

---

## Décision d'architecture

> **Question posée** : quelle solution technique est cohérente avec un excellent SEO ?

**Réponse : un générateur de site statique — Astro — déployé sur GitHub Pages via GitHub Actions.**

Le raisonnement :

1. **Google indexe du HTML, pas du JavaScript.** La tentation naturelle pour supprimer la duplication
   du nav/footer serait de les injecter côté client (`fetch()` + `innerHTML`). **C'est à proscrire** :
   le contenu injecté est mal ou tardivement crawlé, et les liens internes du menu — qui portent le
   maillage interne, donc une bonne partie du SEO — deviendraient invisibles au premier passage.
2. Astro génère du **HTML statique pur** au build. Le résultat déployé est exactement ce qu'il y a
   aujourd'hui, en mieux : zéro JavaScript de framework envoyé au navigateur par défaut.
3. Astro apporte nativement **l'optimisation d'images** (WebP/AVIF, `srcset` responsive,
   `width`/`height` pour éviter le CLS, lazy-loading). C'est précisément le chantier de la Phase 1,
   automatisé de façon permanente au lieu d'être fait une fois à la main.
4. Les partiels (`Header.astro`, `Footer.astro`) et un fichier de config unique
   (`src/config.ts` : téléphone, WhatsApp, adresse, réseaux sociaux) éliminent la duplication × 5.
5. GitHub Pages sait déployer un build Astro via GitHub Actions — pas de changement d'hébergeur.

**Alternative acceptable** : Eleventy (11ty), plus léger et plus proche du HTML brut, mais sans
l'optimisation d'images intégrée. À retenir si la migration Astro paraît trop lourde.

**Séquencement** : les Phases 0 à 2 ne nécessitent **aucun build** et apportent l'essentiel du gain.
La migration (Phase 3) vient après, une fois le terrain déblayé — il serait absurde de migrer
65 images inutilisées et 13 Mo de polices mortes.

---

## Phase 0 — Corrections critiques SEO

> Rapides, sans risque, à faire en premier. Sans elles, tout le reste du travail SEO est bridé.

### 🔴 SEO-01 — Aligner les URL canoniques sur l'URL réellement en ligne ⏱️ 30 min

> ✅ **Fait le 16/08/2026** — commit `bf86b17`.
> URL de base retenue : `https://www.didactica-oujda.ma` (décision assumée, domaine pas encore
> acquis — voir « Reste à faire » ci-dessous). Les 5 pages plus `404.html` utilisent désormais
> une forme littérale unique : un seul « Replace in Files » suffira le jour de l'achat.
> **Le fichier `CNAME` n'a volontairement pas été créé** : le poser avant que le DNS ne résolve
> couperait immédiatement le site actuellement servi sur `hicham-o-sfh.github.io/Didactica/`.
>
> **Reste à faire (le jour de l'achat du domaine) :**
>
> 1. VSCode → Rechercher dans les fichiers : `https://www.didactica-oujda.ma` → nouvelle URL.
> 2. Créer `CNAME` à la racine contenant le domaine (sans `https://`, sans barre finale).
> 3. Configurer le DNS chez le registrar, puis cocher « Enforce HTTPS » dans Settings → Pages.

**Problème.** Les balises `<link rel="canonical">` et `og:url` des 5 pages pointent vers
`https://www.didactica-oujda.ma`, un domaine **qui n'est pas encore acheté**. Si le site est
actuellement servi depuis `https://hicham-o-sfh.github.io/Didactica/`, on déclare à Google que la
version officielle de chaque page se trouve à une adresse qui n'existe pas. Conséquence : les pages
peuvent être désindexées ou jamais indexées. C'est le point le plus grave du repo.

**Fichiers.** Les 5 `.html` (balises `<link rel="canonical">`, `<meta property="og:url">`, et le
champ `url` du JSON-LD).

**Étapes.**

1. Vérifier d'abord l'URL réelle de publication (Settings → Pages du dépôt GitHub) et si le domaine
   `didactica-oujda.ma` est déjà réservé. **Cette vérification conditionne tout le reste.**
2. Si le domaine n'est pas acquis : remplacer toutes les URL absolues par l'URL GitHub Pages.
3. Si le domaine est acquis : ajouter un fichier `CNAME` à la racine contenant `www.didactica-oujda.ma`,
   configurer le DNS, et conserver les canonicals existantes.
4. Dans les deux cas : le préfixe d'URL doit se retrouver **au même endroit** partout (canonical,
   `og:url`, JSON-LD `url` et `logo`, sitemap).

**Terminé quand.** Les 5 canonicals, les `og:url` et le JSON-LD pointent vers une URL qui répond
en 200, et une seule URL de base est utilisée dans tout le repo.

---

### 🔴 SEO-02 — Corriger la clé `sameAs` dupliquée dans le JSON-LD ⏱️ 15 min

> ✅ **Fait le 16/08/2026** — commits `bf86b17` (JSON-LD) et `93213c3` (numéro unique).
> `sameAs` dupliqué supprimé. **Décision client : un numéro unique, `+212666201740`**, qui remplace
> partout l'ancien fixe `+212536703333` et l'ancien mobile WhatsApp `+212671721510` (HTML et
> `main.js` compris). La question « fixe ou mobile » de cette fiche est donc close.
> Autres correctifs appliqués : `addressRegion` valait `Maroc` (un pays, pas une région) → `Oriental`
> + `addressCountry: MA` ; `openingHours` passé en tableau ; `additionalType` redondant supprimé ;
> `telephone`/`address`/`openingHours` retirés du `ContactPage` de `contactez-nous.html` (propriétés
> invalides sur une `CreativeWork`) et déplacés dans `mainEntity`.
> Enrichissements : `@type: ["School", "LocalBusiness"]` (le type `LanguageSchool` évoqué plus bas
> **n'existe pas** dans schema.org ; `LocalBusiness` est ce qui rend `priceRange` valide),
> `@id` commun aux 3 pages, `priceRange`, `areaServed`, `hasMap`, `image`.
>
> **Reste à faire :** `geo` (coordonnées GPS) et `foundingDate` non renseignés — je n'avais pas la
> donnée et je ne l'ai pas inventée. À récupérer depuis la fiche Google Business (`SEO-06`).

**Problème.** Dans `index.html`, l'objet JSON-LD `School` contient **deux fois** la clé `"sameAs"`
(vers la ligne 42 et la ligne 57), avec un contenu identique. En JSON, une clé dupliquée est
invalide : les parsers ne gardent que la dernière. Le bloc peut être rejeté par Google.

Second problème dans le même bloc : `"telephone"` vaut `+212536703333` alors que **tous** les
formulaires et boutons du site envoient vers WhatsApp `+212671721510`. Il faut trancher — s'il
s'agit du fixe de l'école et du mobile WhatsApp, les deux sont légitimes mais doivent être
déclarés proprement (`telephone` pour le fixe, un second `ContactPoint` pour le mobile).

**Fichiers.** `index.html` (bloc `<script type="application/ld+json">`), et vérifier les 4 autres pages.

**Étapes.**

1. Supprimer la seconde occurrence de `sameAs`.
2. Clarifier avec le client quel numéro est le numéro principal, et refléter la décision dans le JSON-LD.
3. Valider le bloc sur <https://validator.schema.org/> et dans le test des résultats enrichis de Google.
4. Enrichir tant qu'à faire : `priceRange`, `geo` (coordonnées GPS), `areaServed`, `foundingDate`.
   Envisager le type plus précis `LanguageSchool` ou `EducationalOrganization`.

**Terminé quand.** Le JSON-LD passe le validateur schema.org sans erreur ni avertissement sur les 5 pages.

---

### 🔴 SEO-03 — Créer `robots.txt`, `sitemap.xml` et une page `404.html` ⏱️ 45 min

> ✅ **Fait le 16/08/2026** — commit `17d9f5a`.
> Les trois fichiers sont créés à la racine. `404.html` reprend le header et le footer existants,
> réutilise `assets/img/error/01.png` et porte `robots: noindex, follow`.
> Le formulaire d'inscription (popup `.search-popup`) n'y a **pas** été dupliqué : le bouton
> « S'inscrire maintenant ! » y est un simple lien vers `contactez-nous.html`. Cela évite une 6ᵉ
> copie du formulaire collectant le CIN, donc un 6ᵉ endroit à reprendre pour `LEG-01`.
>
> **Reste à faire :** soumettre le sitemap dans Google Search Console (`SEO-06`).
> ⚠️ Un `robots.txt` n'est lu qu'à la racine d'un domaine : tant que le site est servi depuis une
> GitHub Pages « projet » (`hicham-o-sfh.github.io/Didactica/`), le fichier est ignoré par les
> moteurs. Il deviendra effectif avec le domaine personnalisé.

**Problème.** Aucun des trois n'existe. Pour un site dont tout l'effort porte sur le référencement,
c'est un angle mort : Google n'a aucune carte du site, et une URL erronée renvoie la 404 générique
de GitHub Pages, sans navigation ni image de marque.

**Fichiers à créer.** `robots.txt`, `sitemap.xml`, `404.html` (à la racine).

**Étapes.**

1. `robots.txt` : autoriser tout, et déclarer `Sitemap: <URL_DE_BASE>/sitemap.xml` — en utilisant
   l'URL de base fixée en `SEO-01`.
2. `sitemap.xml` : les 5 pages, avec `<lastmod>` et des `<priority>` cohérentes
   (accueil 1.0, tarifs et contact 0.8, à propos et FAQ 0.6).
3. `404.html` : réutiliser le header et le footer existants, un message clair en français et des
   liens vers l'accueil, les tarifs et le contact. **Note GitHub Pages** : le fichier doit
   s'appeler exactement `404.html` et se trouver à la racine pour être pris en compte.
4. Après mise en ligne : soumettre le sitemap dans Google Search Console.

**Terminé quand.** Les trois fichiers sont en ligne, le sitemap est valide (XML bien formé, URL en 200),
et une URL inexistante affiche la page 404 personnalisée.

---

### 🟠 SEO-04 — Rendre les URL d'images des balises Open Graph absolues ⏱️ 15 min

> ✅ **Fait le 16/08/2026** — commit `3ec8a8b`.
> `og:image` et `twitter:image` en URL absolue sur les 5 pages, avec `og:image:width/height/alt`,
> `og:site_name` et `og:locale`. Les balises Twitter Card existaient déjà partout.
> Image de partage créée : `assets/img/og/share-1200x630.jpg` (1200 × 630, 106 Ko), composée avec
> ffmpeg à partir de `slider-1.jpg` et du logo sur bandeau clair — l'ancien `logo.png` faisait
> 457 × 112, très en dessous du minimum exigé par Facebook et WhatsApp.
> Supprimées car **hors spécification Open Graph** (donc ignorées) : `og:instagram`, `og:facebook`,
> `og:whatsapp`, `og:map`, `og:email`, `og:phone`, ainsi que le bloc `og:video` qui déclarait une
> chaîne YouTube en `video/mp4`.
>
> **Reste à faire :** l'image de partage est fonctionnelle mais générée automatiquement — une vraie
> création graphique (accroche + « Oujda ») serait plus vendeuse. Tester ensuite dans le débogueur
> de partage Facebook, une fois le site en ligne sur son domaine.

**Problème.** `<meta property="og:image" content="assets/img/logo/logo.png">` utilise un chemin
**relatif**. Les réseaux sociaux (Facebook, WhatsApp, LinkedIn) exigent une URL absolue : l'aperçu
de partage s'affiche donc sans image. Sachant que WhatsApp est le canal principal de conversion du
site, l'aperçu de lien compte réellement.

**Fichiers.** Les 5 `.html`.

**Étapes.**

1. Passer `og:image` en URL absolue.
2. Fournir une vraie image de partage (1200 × 630 px) plutôt que le logo, qui s'affichera mal recadré.
3. Ajouter les balises `twitter:card` (`summary_large_image`), `twitter:title`, `twitter:description`,
   `twitter:image`.
4. Supprimer `og:instagram` et `og:youtube` : ces propriétés n'existent pas dans la spécification
   Open Graph et sont ignorées. Les profils sociaux sont déjà correctement déclarés via `sameAs`.
5. Tester avec le débogueur de partage de Facebook.

**Terminé quand.** Un lien collé dans WhatsApp affiche titre, description et image.

---

## Phase 1 — Performance

> Le chantier au meilleur rapport effort/impact. Le repo pèse 45 Mo pour 5 pages statiques.
> Cible : mobile marocain en 3G/4G. La performance est un critère de classement Google
> (Core Web Vitals) autant qu'un critère de conversion.

### 🔴 PERF-01 — Purger les polices Font Awesome inutilisées ⏱️ 1 h — **gain ~13 Mo**

> ✅ **Fait le 16/08/2026** — commits `7e607be` (bascule light→regular), `1d8336f` (purge)
> et `723179c` (preload).
>
> | Mesure                          | Avant    | Après      |
> | ------------------------------- | -------- | ---------- |
> | `assets/fonts/`                 | 13,4 Mo  | **870 Ko** |
> | Fichiers de police              | 22       | **3**      |
> | `all-fontawesome.min.css` brut  | 512 Ko   | **187 Ko** |
> | …**gzippé** (poids transféré)   | 99,9 Ko  | **42,2 Ko**|
>
> **Corrections aux chiffres de cette fiche :** il y avait **11** fichiers `.ttf` et non 15 ;
> `assets/fonts/` pesait 13,4 Mo et non 14 Mo ; le CSS 512 Ko et non 400 Ko.
>
> **La fiche avait raison sur un point où je me suis trompé d'abord** : il existe bien des règles
> de glyphes propres à une famille. Le duotone utilise des sélecteurs `.fa-duotone.fa-x:after`
> pour sa seconde couche de couleur — **330 Ko d'un seul tenant**, soit 64 % du fichier, pour une
> famille utilisée zéro fois. C'est là qu'est venu l'essentiel du gain CSS. En revanche les
> règles `.fa-nom:before{content:"\f…"}` sont bien communes à toutes les familles.
>
> **Bascule `fal` → `far` (étape 4) : faite, et vérifiée plutôt qu'arbitrée à l'œil.** La table
> `cmap` de `fa-regular-400.ttf` a été lue directement : les 4 codepoints concernés (`U+F34E`,
> `U+F590`, `U+F5A0`, `U+F2A0`) y sont présents. Seul effet visible : un trait un peu plus épais.
>
> **Écart assumé sur l'étape 5** : `fa-brands-400` est préchargée en plus de solid et regular.
> Elle ne pèse que 116 Ko et sert la barre sociale en haut de chaque page — l'omettre garantissait
> quatre icônes invisibles au chargement, `font-display` valant `block`.
>
> **Vérification (étape 6)** : les 6 pages chargées en navigateur, chaque icône mesurée au canvas
> pour détecter un repli sur la police système. **0 icône cassée sur 122 vérifications**, et seules
> les 3 polices conservées sont demandées.
>
> **Reste à faire — décision à prendre.** Le CSS conserve les **4733** définitions d'icônes alors
> que le site en utilise **37**. Les élaguer ferait passer le fichier de 42,2 à ~10 Ko gzippés,
> mais figerait le jeu d'icônes : en ajouter une plus tard imposerait de régénérer le fichier
> depuis le kit Font Awesome. À arbitrer — voir aussi `ARCH-01`, où un build rendrait l'opération
> automatique et donc sans risque.

**Problème.** `assets/fonts/` pèse **14 Mo** : le kit Font Awesome complet, chaque famille en `.ttf`
**et** `.woff2`. Or l'analyse du HTML montre que seules 4 familles sont utilisées :

| Famille                                    | Occurrences | Verdict                             |
| ------------------------------------------ | ----------- | ----------------------------------- |
| solid (`fas`, `fa-solid`)                  | 127         | **garder**                          |
| regular (`far`, `fa-regular`)              | 103         | **garder**                          |
| brands (`fab`, `fa-brands`)                | 47          | **garder**                          |
| light (`fal`)                              | 7           | garder, ou convertir (voir étape 4) |
| thin, duotone, sharp (×4), v4compatibility | **0**       | **supprimer**                       |

Les fichiers `.ttf` sont intégralement inutiles : aucun navigateur ciblé ne les demande, le `.woff2`
est systématiquement servi en premier par le `@font-face`.

**Total : 1,3 Mo à conserver, 13 Mo à supprimer.**

**Fichiers.** `assets/fonts/*`, `assets/css/all-fontawesome.min.css`.

**Étapes.**

1. Supprimer les 15 fichiers `.ttf`.
2. Supprimer `fa-duotone-900.woff2`, `fa-sharp-*.woff2` (4 fichiers), `fa-thin-100.woff2`,
   `fa-v4compatibility.woff2`.
3. Nettoyer les blocs `@font-face` correspondants dans `all-fontawesome.min.css`, **ainsi que les
   règles de glyphes des familles supprimées** (le CSS fait 400 Ko, l'essentiel est constitué de
   déclarations de contenu inutilisées).
4. Les 7 usages de `fal` (light) sont marginaux : envisager de les basculer en `far` pour supprimer
   une famille de plus. À arbitrer visuellement.
5. Ajouter `<link rel="preload" as="font" type="font/woff2" crossorigin>` sur `fa-solid-900.woff2`
   et `fa-regular-400.woff2` uniquement.
6. **Vérification obligatoire** : parcourir les 5 pages et confirmer qu'aucune icône n'est devenue
   un carré vide.

**Terminé quand.** `assets/fonts/` pèse moins de 1,5 Mo et aucune icône n'est cassée sur les 5 pages.

---

### 🟠 PERF-02 — Supprimer les 65 images inutilisées ⏱️ 45 min — **gain ~4,1 Mo**

> 📋 **Inventaire fait le 16/08/2026, suppression volontairement reportée.**
> Décision d'Hicham : les images orphelines sont **recensées, pas supprimées**. La liste vit
> dans [toDelete.md](toDelete.md), régénérable à tout moment.
>
> Détection refaite de zéro plutôt que reprise de l'Annexe A : **64 images orphelines** et non 65,
> pour **3,9 Mo**. L'écart est `assets/img/error/01.png`, désormais utilisée par la page 404
> créée en `SEO-03` — ce qui illustre pourquoi la liste doit être régénérée avant toute
> suppression, et non recopiée.
>
> Contrôle effectué sur le point de vigilance de l'étape 2 : le site ne construit **aucun** chemin
> d'image dynamiquement. Le seul mécanisme de ce type, `data-background`, est du code mort
> (`PERF-05`) et plus aucun attribut de ce nom n'existe dans le HTML.
>
> **Reste à faire** : régénérer `toDelete.md`, puis supprimer — quand tu le décideras.

**Problème.** 65 des 114 images du repo ne sont référencées **nulle part** dans le HTML, le CSS ou
le JS. Ce sont des reliquats du thème d'origine : blog, portfolio, recherche, campus, alumni…
Autant de fichiers versionnés, clonés et déployés pour rien.

La liste exacte figure en **Annexe A**.

**Étapes.**

1. Reprendre la liste de l'Annexe A.
2. **Re-vérifier avant suppression** : la détection s'appuie sur une recherche textuelle des chemins.
   Contrôler qu'aucune image n'est appelée via une construction dynamique en JS ou une règle CSS
   exotique. (`git` rend l'opération réversible de toute façon.)
3. Supprimer, puis supprimer aussi les dossiers devenus vides.
4. Parcourir les 5 pages et vérifier la console navigateur : zéro 404.

**Terminé quand.** `assets/img/` pèse environ 4 Mo et la console est vide d'erreurs 404 sur les 5 pages.

---

### 🔴 PERF-03 — Optimiser et convertir les images restantes ⏱️ 2 h — **gain ~3 Mo**

**Problème.** Les images restantes sont des JPEG bruts non optimisés, jusqu'à **437 Ko pour une
seule** (`assets/img/footer/01.jpg`). Aucune version WebP. Sept fichiers dépassent 250 Ko :

```
437 Ko  assets/img/footer/01.jpg
404 Ko  assets/img/breadcrumb/01.jpg
374 Ko  assets/img/testimonial/bg.jpg
365 Ko  assets/img/counter/01.jpg
273 Ko  assets/img/slider/slider-1.jpg
250 Ko  assets/img/enroll/01.jpg
153 Ko  assets/img/logo/dialog-punkt-deutsch-logo.png
```

**Étapes.**

1. Redimensionner : aucune image d'arrière-plan n'a besoin de dépasser 1920 px de large, aucune
   vignette 800 px.
2. Convertir en **WebP** (qualité 80) avec conservation du JPEG en repli via `<picture>`.
   Après la migration Astro (`ARCH-01`), ce travail deviendra automatique — mais le gain est
   trop important pour attendre.
3. Compresser le PNG du logo partenaire (153 Ko est excessif pour un logo).
4. Ajouter `width` et `height` explicites sur **toutes** les balises `<img>` : c'est ce qui empêche
   le décalage de mise en page (CLS), une des trois Core Web Vitals.

**Terminé quand.** Aucune image ne dépasse 150 Ko et le total de `assets/img/` est sous 2 Mo.

---

### 🔴 PERF-04 — Activer le chargement différé des images ⏱️ 30 min

**Problème.** Les **68 balises `<img>`** du site sont dépourvues de `loading="lazy"`. Toutes les
images se téléchargent au chargement initial, y compris celles situées trois écrans plus bas.

**Étapes.**

1. Ajouter `loading="lazy"` et `decoding="async"` à toutes les `<img>`…
2. …**sauf** celles visibles immédiatement (logo du header, première image du slider) : les charger
   en différé dégraderait le LCP. Leur mettre au contraire `fetchpriority="high"`.
3. Vérifier au chargement, onglet Réseau, que les images du bas de page ne partent qu'au défilement.

**Terminé quand.** Le nombre de requêtes au chargement initial de `index.html` est divisé par deux ou plus.

---

### 🟠 PERF-05 — Retirer les dépendances mortes ⏱️ 30 min

**Problème.** Des ressources sont chargées sur chaque page sans jamais servir :

- `assets/css/magnific-popup.min.css` — **zéro** occurrence de `magnificPopup` ou de la moindre
  classe associée dans tout le repo. Chargé sur les 5 pages.
- `assets/js/modernizr.min.js` — aucune détection de fonctionnalité (`Modernizr.*`) dans `main.js`.
  À vérifier avant suppression : le thème d'origine s'en sert peut-être pour ajouter des classes
  sur `<html>` exploitées par le CSS.
- Le gestionnaire `$(document).on("ready", …)` de `main.js` (lignes 25-33) est **du code mort à
  double titre** : cette syntaxe a été **supprimée dans jQuery 3.0** et ne s'exécute donc jamais
  (le site utilise jQuery 3.7.1) ; et l'attribut `data-background` qu'elle traite n'apparaît plus
  dans aucune page. Sans conséquence aujourd'hui, mais c'est un piège pour la prochaine personne
  qui ajoutera un `data-background` en pensant qu'il fonctionne.

**Fichiers.** Les 5 `.html`, `assets/js/main.js`, `assets/css/magnific-popup.min.css`.

**Terminé quand.** Le fichier CSS est supprimé, les `<link>` retirés des 5 pages, le bloc mort de
`main.js` supprimé, et le site fonctionne à l'identique.

---

### 🟡 PERF-06 — Héberger les polices Google en local ⏱️ 45 min

**Problème.** `assets/css/style.css` commence par un `@import url(https://fonts.googleapis.com/…)`
chargeant Yantramanav et Roboto. Un `@import` en tête de feuille de style est **bloquant pour le
rendu** et impose une résolution DNS + connexion vers un domaine tiers avant le premier pixel
affiché. C'est incohérent avec des polices Font Awesome déjà servies en local.

**Étapes.**

1. Télécharger les graisses réellement utilisées (l'import en demande 6 par famille, soit 12 —
   le site en utilise vraisemblablement 3 ou 4).
2. Les placer dans `assets/fonts/`, déclarer les `@font-face` avec `font-display: swap`.
3. Supprimer le `@import`.
4. Bénéfice annexe : suppression d'une requête vers un service tiers, appréciable pour le RGPD.

**Terminé quand.** Aucune requête sortante vers `fonts.googleapis.com` ou `fonts.gstatic.com` et le
rendu typographique est inchangé.

---

### 🟠 PERF-07 — Élaguer le CSS et le JS non utilisés (code et bibliothèques) ⏱️ 4 h

**Problème.** Le site charge sur chaque page l'intégralité de bibliothèques dont il n'exploite
qu'une fraction. État mesuré le 16/08/2026, **après** `PERF-01` :

| Fichier                   | Brut       | **Gzippé** | Soupçon                                          |
| ------------------------- | ---------- | ---------- | ------------------------------------------------ |
| `bootstrap.min.css`       | 227 Ko     | 30,3 Ko    | grille + navbar utilisées, le reste probablement pas |
| `all-fontawesome.min.css` | 187 Ko     | 42,2 Ko    | **4733 icônes déclarées, 37 utilisées**          |
| `style.css`               | 65 Ko      | 12,7 Ko    | thème d'origine, sections supprimées non purgées |
| `animate.min.css`         | 44 Ko      | 3,9 Ko     | seules les animations pilotées par WOW.js servent |
| `jquery-3.7.1.min.js`     | 85 Ko      | 29,7 Ko    | requis par Owl Carousel — voir `ARCH-03`         |
| `bootstrap.bundle.min.js` | 79 Ko      | 23,2 Ko    | seul le `collapse` du menu mobile semble utilisé |
| `owl.carousel.min.js`     | 43 Ko      | 11,2 Ko    | un seul carrousel sur le site                    |
| `modernizr.min.js`        | 11 Ko      | 4,4 Ko     | voir `PERF-05`, aucune détection appelée         |
| **Total**                 | **765 Ko** | **165 Ko** |                                                  |

`PERF-05` ne traite que les dépendances **entièrement** mortes. Cette fiche vise l'étage
au-dessus : le code mort **à l'intérieur** des fichiers conservés.

**Étapes.**

1. Relever la couverture réelle avec l'onglet *Coverage* de Chrome DevTools, sur les 6 pages,
   en interagissant (menu mobile, carrousel, modale d'inscription, défilement complet).
2. CSS : passer PurgeCSS en lui donnant les 6 `.html` **et** `main.js` comme sources.
3. JS : décider bibliothèque par bibliothèque. Bootstrap n'est peut-être utilisé que pour le
   `collapse` du menu — auquel cas 20 lignes de JS natif remplacent 79 Ko.
4. Font Awesome : ne conserver que les 37 icônes réellement utilisées (~10 Ko gzippés au lieu
   de 42,2). Décision déjà posée en `PERF-01`.

**Pièges à ne pas manquer.**

- **Classes ajoutées dynamiquement.** `main.js` injecte des icônes, WOW.js pose `animated` et les
  classes `animate__*` au défilement, Owl Carousel génère toute sa structure au runtime. Un
  PurgeCSS naïf les supprimera. Il faut une *safelist*, et retester en interaction réelle.
- **Ordre des opérations.** À faire idéalement **après `ARCH-01`** : avec un build, l'élagage est
  rejoué à chaque modification et ne peut plus se désynchroniser du code. Fait à la main
  aujourd'hui, le résultat se périme dès qu'une icône ou une classe est ajoutée.

**Terminé quand.** Le poids gzippé de `assets/css/` + `assets/js/` est réduit d'au moins moitié,
et les 6 pages sont vérifiées en interaction (menu mobile, carrousel, modale, animations) sans
régression visuelle.

---

## Phase 2 — Nettoyage du dépôt

### 🟠 CLEAN-01 — Centraliser le numéro de téléphone et les informations de contact ⏱️ 1 h

> ⚠️ **Mise à jour du 16/08/2026** (commit `93213c3`). Le site n'a plus qu'un seul numéro, `+212666201740` (voir
> `SEO-02`) : la divergence fixe / mobile a disparu. En revanche **la dispersion reste entière** —
> le numéro est toujours codé en dur 3 fois dans `main.js` et une vingtaine de fois dans les 6
> pages HTML. La centralisation décrite ci-dessous est donc toujours à faire, à ceci près qu'il n'y
> a plus qu'une valeur à centraliser.
>
> Détail relevé au passage : `main.js:69` construit `https://wa.me/+212666201740` (avec le `+`)
> alors que les lignes 266 et 276 utilisent `https://wa.me/212666201740` (sans). Les deux formes
> fonctionnent, mais l'incohérence disparaîtra d'elle-même à la centralisation.

**Problème.** Le numéro WhatsApp `+212671721510` est codé en dur **4 fois** dans `main.js`
(lignes ~72, ~232, ~243, et l'URL `wa.me`), et se répète dans les 5 pages HTML ainsi que dans le
JSON-LD. Le commit `dcfbbc9 update phone number` illustre exactement le coût de cette dispersion.
S'y ajoute la divergence relevée en `SEO-02` entre le fixe et le mobile.

**Étapes (avant migration Astro).**

1. Créer en tête de `main.js` un objet de configuration unique :
   `const CONTACT = { whatsapp: "212671721510", tel: "+212536703333", email: "…" };`
2. Remplacer les occurrences en dur par des références à cet objet.
3. Factoriser les trois gestionnaires WhatsApp (`#send-whatsapp-form`, `#whatsapp-button`,
   `#send-footer-whatsapp-message`) : ils font tous la même chose — valider, construire un message,
   encoder, ouvrir `wa.me`. Une seule fonction `ouvrirWhatsApp(message)` suffit.
4. _(Après `ARCH-01`, cette configuration migrera vers `src/config.ts` et couvrira aussi le HTML.)_

**Terminé quand.** Changer de numéro ne demande de modifier qu'un seul endroit dans le JavaScript.

---

### 🟡 CLEAN-02 — Ajouter `.gitignore` et `README.md` ⏱️ 20 min

**Problème.** Ni l'un ni l'autre n'existe. Le README est le premier écran de la page GitHub du
projet, et il est vide. `.gitignore` deviendra nécessaire dès la Phase 3 (`node_modules/`, `dist/`).

**Étapes.**

1. `README.md` : ce qu'est le projet, comment le prévisualiser en local, comment il est déployé,
   où modifier les informations de contact.
2. `.gitignore` : `node_modules/`, `dist/`, `.DS_Store`, `Thumbs.db`, `.env`, `.astro/`.

**Terminé quand.** La page GitHub du dépôt présente le projet correctement.

---

### 🟡 CLEAN-03 — Sécuriser les liens externes ⏱️ 15 min

**Problème.** Les **20 liens** `target="_blank"` du site n'ont pas d'attribut `rel`. Les navigateurs
modernes appliquent `noopener` implicitement, le risque réel est donc faible — mais l'attribut reste
attendu par les audits Lighthouse et les vieux navigateurs.

**Étapes.** Ajouter `rel="noopener noreferrer"` aux 20 liens (réseaux sociaux, WhatsApp, partenaires).

**Terminé quand.** L'audit Lighthouse ne signale plus de lien externe non sécurisé.

---

### 🟡 CLEAN-04 — Renoncer à l'obfuscation du JavaScript ⏱️ 10 min — _décision_

**Constat.** L'historique montre deux commits d'obfuscation (`c1f0bd1`, `eb447bb`), mais
`assets/js/main.js` est aujourd'hui **en clair** dans la branche `master` — c'est donc cette version
lisible qui est en ligne, la boucle a été défaite pour modifier le numéro de téléphone.

**Recommandation : abandonner définitivement.** Le fichier ne contient aucun secret — le numéro
WhatsApp est déjà visible dans le HTML, dans le JSON-LD et dans le pied de page. L'obfuscation ne
protège rien, complique chaque modification, et impose de maintenir deux versions du même fichier
(le cycle « obfusquer → désobfusquer pour corriger → réobfusquer » visible dans l'historique en est
la démonstration).

**Étapes.** Acter la décision, la documenter dans le README, et supprimer tout script d'obfuscation
résiduel s'il en existe un.

---

## Phase 3 — Maintenabilité (migration)

> Prérequis : Phases 0 à 2 terminées. Inutile de migrer ce qui doit être supprimé.

### 🟠 ARCH-01 — Migrer vers Astro ⏱️ 1 à 2 jours

**Problème.** Le `<nav>` et le `<footer>` sont copiés-collés à l'identique dans les 5 pages — le
pied de page est strictement identique partout (empreinte `d58410e9` sur les cinq fichiers).
Toute modification, si minime soit-elle, exige cinq éditions manuelles, avec un risque d'oubli
proportionnel. C'est la dette qui coûtera le plus cher dans la durée.

**Approche.** Voir la section « Décision d'architecture » ci-dessus pour la justification SEO.

**Étapes.**

1. `npm create astro@latest` dans un dossier de travail, template minimal, sans framework UI.
2. Créer `src/layouts/Base.astro` : `<head>` (meta, JSON-LD paramétré), header, `<slot />`, footer.
3. Extraire `src/components/Header.astro` et `Footer.astro` depuis le HTML existant.
4. Créer `src/config.ts` : téléphone, WhatsApp, email, adresse, horaires, réseaux sociaux, URL de base.
   Toutes les pages et le JSON-LD y puisent — cela clôt définitivement `CLEAN-01`.
5. Convertir les 5 pages en `src/pages/*.astro`, chacune ne portant que son contenu propre.
6. Basculer les images sur le composant `<Image />` d'Astro : WebP, `srcset`, dimensions et
   lazy-loading deviennent automatiques.
7. Intégrer `@astrojs/sitemap` — la tâche `SEO-03` devient auto-maintenue.
8. **Conserver les URL à l'identique** (`/a-propos.html`, etc.) ou mettre en place des redirections 301. Changer les URL sans redirection réinitialiserait le référencement acquis. Point de
   vigilance majeur de cette migration.
9. Configurer `site` et `base` dans `astro.config.mjs` conformément à `SEO-01`.

**Terminé quand.** `npm run build` produit un `dist/` visuellement identique au site actuel, avec
les mêmes URL, et modifier le pied de page ne demande plus qu'une seule édition.

---

### 🟠 ARCH-02 — Déploiement automatique via GitHub Actions ⏱️ 1 h

**Prérequis.** `ARCH-01`.

**Étapes.**

1. Créer `.github/workflows/deploy.yml` : build Astro puis publication sur GitHub Pages
   (`actions/deploy-pages`).
2. Basculer la source Pages du dépôt de « branche » vers « GitHub Actions ».
3. Vérifier qu'un `git push` sur `master` déclenche bien la mise en ligne.

**Terminé quand.** Un push sur `master` met le site à jour automatiquement.

---

### 🟡 ARCH-03 — Réduire la dépendance à jQuery ⏱️ 3 h — _optionnel_

**Constat.** `main.js` ne fait que du DOM très simple : classes, gestionnaires de clic, défilement.
jQuery (~87 Ko) n'y est indispensable que pour Owl Carousel, qui en dépend.

**Étapes.**

1. Réécrire `main.js` en JavaScript natif.
2. Remplacer Owl Carousel par une alternative sans dépendance (Swiper, ou un carrousel CSS
   `scroll-snap` — largement suffisant pour ces usages).
3. Supprimer jQuery.

**Gain.** Environ 150 Ko de JavaScript. À traiter **après** les Phases 0-2 : le rapport
effort/bénéfice y est nettement moins bon que sur les images et les polices.

---

## Phase 4 — SEO avancé et contenu

### 🟠 SEO-05 — Enrichir les données structurées locales ⏱️ 1 h

**Prérequis.** `SEO-02`.

**Étapes.**

1. Ajouter un JSON-LD `FAQPage` sur `faq.html` — c'est ce qui permet l'affichage des questions
   dépliables directement dans les résultats Google. Fort impact sur le taux de clic, peu d'effort.
2. Ajouter un JSON-LD `BreadcrumbList` sur les pages internes.
3. Ajouter `Course` ou `Offer` sur `tarifs-et-prix.html` pour les formules proposées.
4. Compléter la fiche `School` : `geo`, `priceRange`, `hasMap`, `image`.

**Terminé quand.** Le test des résultats enrichis de Google détecte FAQ, fil d'Ariane et école,
sans erreur.

---

### 🟠 SEO-06 — Configurer Google Search Console et Google Business Profile ⏱️ 1 h

**Problème.** Aucune trace d'une vérification Search Console dans le repo. Sans elle, aucune
visibilité sur les requêtes, l'indexation ou les erreurs de crawl — on travaille à l'aveugle.

**Étapes.**

1. Vérifier la propriété (balise meta ou fichier HTML à la racine).
2. Soumettre le sitemap de `SEO-03`.
3. Créer / revendiquer la fiche **Google Business Profile** de l'école. Pour une école de langues
   locale, c'est **le levier de référencement le plus rentable qui existe** — souvent devant le site
   lui-même. Photos, horaires, avis clients.
4. Vérifier la cohérence NAP (nom, adresse, téléphone) entre le site, le JSON-LD et la fiche Google :
   toute divergence affaiblit le référencement local. À rapprocher de l'incohérence de numéro relevée
   en `SEO-02`.

**Terminé quand.** Search Console reçoit des données et la fiche Google est publiée et vérifiée.

---

### 🟡 SEO-07 — Ajouter une mesure d'audience respectueuse de la vie privée ⏱️ 45 min

**Problème.** Aucun outil de mesure. Impossible de savoir combien de visiteurs cliquent sur les
boutons WhatsApp — donc impossible de mesurer la conversion réelle du site.

**Étapes.**

1. Choisir un outil sans cookies (Plausible, Umami, ou Cloudflare Web Analytics — gratuit) pour
   éviter le bandeau de consentement qu'imposerait Google Analytics.
2. Suivre en événements les clics sur les boutons WhatsApp : c'est **la** métrique qui compte ici.

**Terminé quand.** Le tableau de bord affiche les visites et les clics WhatsApp.

---

### 🟡 SEO-08 — Envisager une version allemande ou arabe ⏱️ à évaluer — _décision_

**Constat.** Toutes les pages déclarent `lang="fr"`, sans aucune balise `hreflang`. Pour une école
d'allemand au Maroc, une version arabe (voire allemande) pourrait ouvrir un tout autre volume de
recherche.

**À arbitrer avec le client** : le trafic ciblé cherche-t-il en français, en arabe, ou en darija
translittérée ? À vérifier dans Search Console une fois `SEO-06` en place — décider **après** avoir
des données, pas avant.

---

## Phase 5 — Conformité et formulaires

### 🔴 LEG-01 — Encadrer la collecte du CIN et de la date de naissance ⏱️ 2 h

**Problème.** Le formulaire d'inscription collecte **CIN et date de naissance** et les transmet dans
une URL `wa.me`, sans consentement explicite, sans mention légale, et sans politique de
confidentialité. Le besoin métier est confirmé et le champ est conservé — mais il doit être encadré.
Au Maroc, la **loi 09-08** relative à la protection des personnes physiques à l'égard du traitement
des données à caractère personnel s'applique, et le CIN est une donnée d'identification directe.

**Fichiers.** `index.html` et les autres pages portant le formulaire, plus une nouvelle page.

**Étapes.**

1. Créer `politique-de-confidentialite.html` : quelles données sont collectées, pourquoi, comment
   (transmission via WhatsApp), combien de temps elles sont conservées, comment exercer ses droits.
   La lier depuis le pied de page des 5 pages.
2. Ajouter dans le formulaire une case à cocher de consentement **obligatoire**, avec un lien vers
   cette politique.
3. Ajouter sous le champ CIN une mention expliquant **pourquoi** il est demandé (constitution du
   dossier d'inscription) — cela lève aussi le frein à la conversion : un visiteur à qui l'on
   demande son CIN sans explication abandonne.
4. Envisager de déclarer le traitement auprès de la **CNDP**.
5. Ajouter une page ou une section de mentions légales (raison sociale, adresse, contact, hébergeur).

**Terminé quand.** La politique de confidentialité est en ligne, liée depuis le pied de page, et le
formulaire ne peut être envoyé sans consentement explicite.

---

### 🟠 FORM-01 — Ne plus perdre de prospects ⏱️ 2 h

**Problème.** Tous les formulaires se contentent d'ouvrir `wa.me` dans un nouvel onglet. Deux
conséquences concrètes :

- **Aucune trace des contacts.** Si le visiteur ne finalise pas l'envoi dans WhatsApp — bascule
  d'application ratée, hésitation, WhatsApp Web non connecté sur ordinateur — le contact est perdu
  sans que personne ne sache qu'il a existé.
- **Le bloqueur de fenêtres.** `window.open()` déclenché dans un gestionnaire de clic passe
  généralement, mais reste fragile selon les navigateurs et les navigateurs intégrés (Instagram,
  Facebook) — précisément par où arrive une partie du trafic.

**Étapes.**

1. Doubler l'envoi WhatsApp d'une soumission vers un service de formulaire (Formspree, Web3Forms,
   ou Netlify Forms) qui envoie le dossier par email — un filet de sécurité, sans backend à maintenir.
2. Remplacer `window.open()` par un vrai lien `<a href="wa.me/…" target="_blank">` dont l'attribut
   `href` est mis à jour dynamiquement : plus robuste face aux bloqueurs.
3. Afficher une confirmation visuelle après envoi, au lieu de laisser l'utilisateur devant un
   formulaire d'apparence inchangée.
4. Le CIN transitant alors aussi par email, la politique de confidentialité de `LEG-01` doit en
   tenir compte.

**Terminé quand.** Chaque envoi de formulaire laisse une trace consultable, même si le visiteur ne
finalise pas dans WhatsApp.

---

### 🟡 A11Y-01 — Audit d'accessibilité ⏱️ 2 h

**Constat.** Les 68 images ont toutes un attribut `alt` — c'est un bon point de départ, rarement
acquis. Reste à vérifier le reste.

**Étapes.**

1. Contraste des couleurs : la palette (`--theme-color: #116e63`, `--body-text-color: #757f95`)
   doit être vérifiée au ratio 4.5:1. Le gris du corps de texte est un point d'attention.
2. Navigation au clavier : formulaires, menu déroulant, fenêtre modale d'inscription (la modale
   doit piéger le focus et se fermer avec `Échap`).
3. Libellés de formulaire correctement associés (`<label for>`), messages d'erreur annoncés.
4. Hiérarchie des titres : un seul `<h1>` par page, pas de niveau sauté.
5. Vérifier que les `alt` existants sont **pertinents** et non de simples reliquats du thème.

**Terminé quand.** Score Lighthouse Accessibilité ≥ 95 sur les 5 pages.

---

## Ordre d'exécution recommandé

```
SEO-01 ──► SEO-02 ──► SEO-03 ──► SEO-04          (Phase 0 : critique, ~2 h au total)
   │
   ▼
PERF-01 ──► PERF-02 ──► PERF-03 ──► PERF-04       (Phase 1 : ~20 Mo de gain)
   │        PERF-05, PERF-06 en parallèle
   ▼
CLEAN-01…04                                       (Phase 2 : nettoyage)
   │
   ▼
LEG-01 ──► FORM-01                                (Phase 5 : à traiter tôt, risque juridique)
   │
   ▼
ARCH-01 ──► ARCH-02 ──► ARCH-03                   (Phase 3 : migration)
   │
   ▼
SEO-05…08, A11Y-01                                (Phase 4 : SEO avancé)
```

**Si le temps est compté**, les cinq tâches à faire en priorité absolue :
`SEO-01`, `SEO-03`, `PERF-01`, `PERF-04`, `LEG-01`.

---

## Annexe A — Images inutilisées (65 fichiers, ~4,1 Mo)

> ⚠️ **Annexe périmée, conservée pour mémoire.** La liste à jour est [toDelete.md](toDelete.md),
> régénérée le 16/08/2026 : **64 fichiers, 3,9 Mo**. `assets/img/error/01.png` en est sortie,
> la page 404 l'utilise désormais. Ne pas travailler à partir de la liste ci-dessous.

Détectées par recherche du chemin exact dans l'ensemble du HTML, du CSS et du JS.
**À re-vérifier avant suppression.** Voir `PERF-02`.

```
assets/img/alumni/01.jpg
assets/img/blog/01.jpg
assets/img/blog/02.jpg
assets/img/blog/03.jpg
assets/img/blog/bs-1.jpg
assets/img/blog/bs-2.jpg
assets/img/blog/bs-3.jpg
assets/img/blog/com-1.jpg
assets/img/blog/com-2.jpg
assets/img/blog/com-3.jpg
assets/img/blog/single.jpg
assets/img/campus-life/01.jpg
assets/img/campus-tour/01.jpg
assets/img/club/06.jpg
assets/img/club/single.jpg
assets/img/course/01.jpg
assets/img/course/02.jpg
assets/img/course/03.jpg
assets/img/course/04.jpg
assets/img/course/05.jpg
assets/img/course/06.jpg
assets/img/course/single.jpg
assets/img/course/teacher.jpg
assets/img/department/02.jpg
assets/img/department/single.jpg
assets/img/error/01.png
assets/img/event/02.jpg
assets/img/event/03.jpg
assets/img/event/04.jpg
assets/img/event/05.jpg
assets/img/event/06.jpg
assets/img/event/author.jpg
assets/img/event/single.jpg
assets/img/icon/acting.svg
assets/img/icon/course.svg
assets/img/icon/course-material.svg
assets/img/icon/global-education.svg
assets/img/icon/graduation.svg
assets/img/icon/human.svg
assets/img/icon/information.svg
assets/img/icon/money.svg
assets/img/icon/online-course.svg
assets/img/icon/scholarship.svg
assets/img/icon/scholarship-2.svg
assets/img/portfolio/01.jpg
assets/img/portfolio/02.jpg
assets/img/portfolio/03.jpg
assets/img/portfolio/04.jpg
assets/img/portfolio/05.jpg
assets/img/portfolio/06.jpg
assets/img/portfolio/single.jpg
assets/img/research/01.jpg
assets/img/research/02.jpg
assets/img/research/03.jpg
assets/img/research/04.jpg
assets/img/research/05.jpg
assets/img/research/06.jpg
assets/img/research/single.jpg
assets/img/scholarship/01.jpg
assets/img/slider/slider-3.jpg
assets/img/team/05.jpg
assets/img/team/06.jpg
assets/img/team/07.jpg
assets/img/team/08.jpg
assets/img/video/01.jpg
```

`assets/img/error/01.png` fait exception : le conserver, il servira à la page 404 de `SEO-03`.

---

## Annexe B — Polices à supprimer (~13 Mo)

Voir `PERF-01`.

**Tous les fichiers `.ttf`** (15 fichiers, aucun navigateur ciblé ne les demande) :

```
assets/fonts/*.ttf
```

**Familles jamais utilisées** (0 occurrence dans le HTML) :

```
assets/fonts/fa-duotone-900.woff2
assets/fonts/fa-sharp-light-300.woff2
assets/fonts/fa-sharp-regular-400.woff2
assets/fonts/fa-sharp-solid-900.woff2
assets/fonts/fa-sharp-thin-100.woff2
assets/fonts/fa-thin-100.woff2
assets/fonts/fa-v4compatibility.woff2
```

**À conserver** (1,3 Mo) :

```
assets/fonts/fa-solid-900.woff2      (127 usages)
assets/fonts/fa-regular-400.woff2    (103 usages)
assets/fonts/fa-brands-400.woff2     (47 usages)
assets/fonts/fa-light-300.woff2      (7 usages — convertibles, voir PERF-01 étape 4)
```

---

## Annexe C — État initial mesuré (16 août 2026)

Référence pour mesurer les progrès.

| Indicateur                                | Valeur                                      |
| ----------------------------------------- | ------------------------------------------- |
| Poids total du dépôt                      | 45 Mo                                       |
| `assets/fonts/`                           | 14 Mo                                       |
| `assets/img/`                             | 8 Mo                                        |
| `assets/css/`                             | 880 Ko                                      |
| `assets/js/`                              | 244 Ko                                      |
| Images totales / inutilisées              | 114 / **65**                                |
| Balises `<img>` sans `loading="lazy"`     | **68 / 68**                                 |
| Balises `<img>` sans `alt`                | 0 / 68 ✅                                   |
| Liens `target="_blank"` sans `rel`        | 20 / 20                                     |
| Pages HTML                                | 5 (5 121 lignes au total)                   |
| `robots.txt` / `sitemap.xml` / `404.html` | absents                                     |
| Empreinte du pied de page sur les 5 pages | identique (`d58410e9`) — duplication totale |

**Cible après Phases 0-2 : dépôt sous 8 Mo**, soit une réduction de plus de 80 %.
