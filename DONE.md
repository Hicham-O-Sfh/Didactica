# Fiches terminées — Didactica

Journal des tâches achevées, extraites de [`TODO.md`](TODO.md) pour qu'il ne contienne plus que
le travail restant. **Rien n'a été résumé** : chaque fiche est reproduite telle qu'elle était,
avec son encadré de rétrospective — c'est-à-dire ce qui a réellement été fait, ce qui a différé
du plan, et les chiffres qui ont été recomptés en cours de route.

Ce document se lit **après coup** : quand on se demande pourquoi une chose est comme elle est,
ou qu'on croit avoir trouvé un bug qui est en fait une décision. Il ne se lit pas en début de
session — pour ça, voir [`TODO.md`](TODO.md).

Les décisions structurantes, elles, sont dans [`DECISIONS.md`](DECISIONS.md).

---

## Ce qui a été fait, dans l'ordre

15 fiches sur 28, du 16 au 28/08/2026.

| Date  | Fiche      | Objet                                        | Commits              |
| ----- | ---------- | -------------------------------------------- | -------------------- |
| 16/08 | `SEO-01`   | URL canoniques alignées sur l'URL en ligne   | `bf86b17`            |
| 16/08 | `SEO-02`   | Clé `sameAs` dupliquée dans le JSON-LD       | `bf86b17`, `93213c3` |
| 16/08 | `SEO-03`   | `robots.txt`, `sitemap.xml`, page `404.html` | `17d9f5a`            |
| 16/08 | `SEO-04`   | URL d'images Open Graph rendues absolues     | `3ec8a8b`            |
| 16/08 | `PERF-01`  | Polices Font Awesome purgées — **−13 Mo**    | `7e607be`, `1d8336f` |
| 16/08 | `PERF-03`  | Images optimisées et converties en WebP      | `986d331`, `158e362` |
| 16/08 | `PERF-04`  | Chargement différé des images                | —                    |
| 16/08 | `PERF-05`  | Dépendances mortes retirées                  | —                    |
| 17/08 | `PERF-06`  | Polices Google hébergées en local            | —                    |
| 17/08 | `CLEAN-05` | CSS sorti des pages HTML                     | —                    |
| 17/08 | `LEG-01`   | Collecte du CIN encadrée, politique écrite   | —                    |
| 26/08 | `CLEAN-06` | Formatage HTML uniformisé (Prettier)         | `16016a3`, `f9101f6` |
| 26/08 | `CLEAN-03` | 86 liens externes sécurisés                  | `ed4ae0b`            |
| 26/08 | `CLEAN-01` | Coordonnées de contact centralisées          | `8a8ecda`            |
| 28/08 | `CLEAN-02` | `.gitignore` et `README.md`                  | `db4d8c1`, `722e973` |

---

## Pourquoi cet ordre-là

**Ordre revu le 17/08/2026** : `LEG-01` passe devant `CLEAN-01…04`. Le nettoyage est confortable
mais sans urgence, alors que la collecte du CIN sans mention légale est le seul point du document
qui porte un risque autre que technique.

**Ordre revu le 26/08/2026**, une fois `LEG-01` faite : `CLEAN-06` est passée en premier parce
qu'elle devait précéder toute retouche de `contactez-nous.html` — sans elle, le diff de `FORM-01`
aurait été noyé dans du bruit d'indentation. Vient ensuite `CLEAN-03`, tant qu'on est dans les
mêmes fichiers, puis `CLEAN-01` : son étape 3 factorise les trois gestionnaires WhatsApp, soit
exactement le code que `FORM-01` doit réécrire. Dans cet ordre le refactor s'écrit une fois ;
dans l'ordre inverse, deux fois.

---

## Phase 0 — Corrections critiques SEO

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
>
> - `addressCountry: MA` ; `openingHours` passé en tableau ; `additionalType` redondant supprimé ;
>   `telephone`/`address`/`openingHours` retirés du `ContactPage` de `contactez-nous.html` (propriétés
>   invalides sur une `CreativeWork`) et déplacés dans `mainEntity`.
>   Enrichissements : `@type: ["School", "LocalBusiness"]` (le type `LanguageSchool` évoqué plus bas
>   **n'existe pas** dans schema.org ; `LocalBusiness` est ce qui rend `priceRange` valide),
>   `@id` commun aux 3 pages, `priceRange`, `areaServed`, `hasMap`, `image`.
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

> `PERF-02` et `PERF-07` ne sont pas ici : elles restent ouvertes, dans [`TODO.md`](TODO.md).

### 🔴 PERF-01 — Purger les polices Font Awesome inutilisées ⏱️ 1 h — **gain ~13 Mo**

> ✅ **Fait le 16/08/2026** — commits `7e607be` (bascule light→regular), `1d8336f` (purge)
> et `723179c` (preload).
>
> | Mesure                         | Avant   | Après       |
> | ------------------------------ | ------- | ----------- |
> | `assets/fonts/`                | 13,4 Mo | **870 Ko**  |
> | Fichiers de police             | 22      | **3**       |
> | `all-fontawesome.min.css` brut | 512 Ko  | **187 Ko**  |
> | …**gzippé** (poids transféré)  | 99,9 Ko | **42,2 Ko** |
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

### 🔴 PERF-03 — Optimiser et convertir les images restantes ⏱️ 2 h — **gain ~3 Mo**

> ✅ **Fait le 16/08/2026** — commits `986d331` (conversion) et `158e362` (bascule + dimensions).
>
> | Mesure                              | Avant   | Après      |
> | ----------------------------------- | ------- | ---------- |
> | Poids des images **servies**        | 3,9 Mo  | **1,8 Mo** |
> | Images > 150 Ko                     | 8       | **3**      |
> | Balises `<img>` sans `width/height` | 90 / 90 | **0 / 90** |
>
> **La qualité a été mesurée, pas choisie au jugé — et le résultat contredit la consigne
> initiale.** En q92, la conversion produisait des fichiers **plus lourds** que les JPEG
> d'origine (+18 %) : ces sources sont déjà compressées avec perte, et q92 demande à WebP d'en
> préserver fidèlement jusqu'aux artefacts.
>
> | Qualité | Poids (6 photos) | SSIM  |
> | ------- | ---------------- | ----- |
> | q92     | **+18 %**        | 0,991 |
> | q85     | −19 %            | 0,982 |
> | **q80** | **−34 %**        | 0,977 |
> | q75     | −47 %            | 0,969 |
>
> D'où deux régimes : **photos en q80** (SSIM ≥ 0,977, écart non perceptible), **graphiques en
> q92** (logos, formes, icônes — bords nets, et le gain y atteignait déjà 50 à 94 %).
>
> **Redimensionnements décidés d'après la taille d'affichage relevée en navigateur**, marge ×2
> pour les écrans haute densité. Le cas le plus flagrant : `dialog-punkt-deutsch-logo.png`,
> 761 px de large pour un affichage à 80 px — 149 Ko devenus 8 Ko.
>
> **Deux fichiers gardent leur format**, à dessein : `og/share-1200x630.jpg` (WhatsApp et Facebook
> traitent le JPEG de façon fiable pour les aperçus, le WebP non) et
> `partner/goethe-institut-logo.png` (PNG à palette de 12 Ko, dont le WebP pesait 25 Ko avec perte
> **comme** sans perte).
>
> **Écart assumé sur l'étape 2 : pas de `<picture>` avec repli JPEG.** Le WebP est supporté par
> tous les navigateurs ciblés depuis 2020, et 50 blocs `<picture>` écrits à la main seraient jetés
> lors de `ARCH-01`, où `<Image />` les régénère automatiquement.
>
> **Critère « aucune image > 150 Ko » : non atteint sur 3 fichiers** — `footer/01.webp` (218 Ko),
> `breadcrumb/01.webp` (181 Ko) et `testimonial/bg.webp` (180 Ko). Ce sont les fonds pleine
> largeur, déjà ramenés de 1920 à 1600 px. Descendre sous 150 Ko imposerait 1280 px, visiblement
> mou sur un écran de bureau. Je n'ai pas dégradé davantage sans arbitrage.
>
> **Reste à faire.** `assets/img/` pèse toujours 9,3 Mo sur le disque : les originaux convertis
> sont conservés, conformément à ta consigne, et recensés dans [toDelete.md](toDelete.md).
> Le critère « total sous 2 Mo » sera atteint mécaniquement à leur suppression. Par ailleurs, des
> fonds réellement adaptatifs (`srcset` / `image-set()`) demandent un build : voir `ARCH-01`.

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

> ✅ **Fait le 16/08/2026.**
>
> | Mesure — `index.html`, 1280 × 800 | Avant    | Après      |
> | --------------------------------- | -------- | ---------- |
> | Requêtes d'images au chargement   | 43       | **8**      |
> | Poids d'images au chargement      | 1 194 Ko | **711 Ko** |
> | Requêtes totales au chargement    | 61       | **33**     |
>
> **Correction au décompte de cette fiche : 90 balises `<img>` et non 68.** Le chiffre datait de
> l'état initial, avant la page `404.html` (`SEO-03`). Réparties ainsi : **82** en `loading="lazy"`,
> **8** laissées prioritaires, et `decoding="async"` sur les 90.
>
> Les 8 prioritaires sont le logo du header des 6 pages (seule image du viewport initial partout),
> `contact/01.webp` en tête de `contactez-nous.html`, et l'illustration de `404.html` qui portait
> déjà ses attributs depuis `SEO-03`.
>
> **Ajout hors énoncé, mais c'est là qu'était le vrai gain LCP.** Les images réellement en haut de
> page ne sont pas des `<img>` mais des **fonds CSS** (`slider-1.webp` sur l'accueil,
> `breadcrumb/01.webp` sur « À propos »), déclarés en style inline : ils ne peuvent pas porter
> `fetchpriority`, et le navigateur ne les découvre qu'après le calcul des styles. Un
> `<link rel="preload" as="image" fetchpriority="high">` a donc été ajouté sur ces deux pages.
> Mesuré : `breadcrumb/01.webp` part désormais à **24 ms**.
>
> **Owl Carousel a été vérifié** (c'était le risque principal) : il clone les slides, et les clones
> héritent du `loading="lazy"`. Contrôle après défilement complet de l'accueil — **0 image vide
> hors carrousel, 0 sur un slide actif** ; les seules non chargées sont des clones hors écran dont
> l'URL est déjà en cache. Les 49 sources d'images des 6 pages répondent toutes en 200.
>
> **Limite de la mesure, à assumer.** Le pane de prévisualisation ne composite pas d'images : le
> lazy loading ne s'y déclenche donc jamais, même pour une image dans le viewport. Les chiffres
> ci-dessus comparent deux fois le **même** état (avant / après, mêmes conditions) et sont donc
> valides, mais un vrai navigateur visible chargera en plus les 2 à 4 images proches du viewport —
> soit ~10 à 12 requêtes au lieu de 8. Le critère reste largement tenu.
>
> **Reste à faire — c'est désormais le poste dominant.** Sur les 8 requêtes restantes, **7 sont des
> fonds CSS** (696 des 711 Ko) que `loading="lazy"` ne peut pas atteindre :
> `testimonial/bg.webp` (180 Ko), `counter/01.webp` (145 Ko), `slider-1` + `slider-2` (192 Ko),
> `department/01.webp` (79 Ko), `cta/01.webp` (70 Ko), `background-whatsapp.webp` (32 Ko). Ils se
> téléchargent tous au chargement quelle que soit la position de défilement. Les différer demande
> soit du JS, soit `ARCH-01` — à traiter avec `PERF-07`.
>
> **Trouvaille au passage, à verser à `PERF-02`.** Trois fonds CSS ont des sélecteurs qui ne
> correspondent à **aucune** page : `.home-3 .footer-area` → `footer/01.webp` (218 Ko, le plus gros
> fichier du dépôt), `.enroll-area` → `enroll/01.webp` (86 Ko), `.choose-area::before` →
> `shape/01.webp` (28 Ko). Le navigateur ne les demande jamais, mais ces **332 Ko** sont versionnés
> et déployés pour rien. La détection d'orphelines de `PERF-02` les a manqués : elle cherche le
> chemin dans le CSS, or le chemin y est bien — c'est le sélecteur qui est mort.

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

> ✅ **Fait le 16/08/2026.** Les trois constats de la fiche se sont vérifiés — mais aucun n'a été
> pris pour argent comptant.
>
> | Supprimé                   | Brut        | Gzippé     |
> | -------------------------- | ----------- | ---------- |
> | `magnific-popup.min.css`   | 5,1 Ko      | 1,5 Ko     |
> | `modernizr.min.js`         | 10,8 Ko     | 4,4 Ko     |
> | **Total, sur chaque page** | **15,9 Ko** | **5,9 Ko** |
>
> Plus **2 requêtes HTTP en moins par page**, soit 12 sur l'ensemble du site — sur une connexion
> mobile, la latence par requête compte souvent davantage que les kilo-octets.
>
> **Magnific Popup** : le CSS était chargé sur les 6 pages, mais **son JavaScript ne l'était même
> pas**. Vérifié plus finement qu'une recherche de `magnificPopup` : ses 31 classes ont été
> croisées avec toutes les classes du HTML **et** avec celles injectées dynamiquement par
> `main.js` (`addClass`, `toggleClass`…). **0 sur 31 utilisée.**
>
> **Modernizr** : c'est le point que la fiche demandait de vérifier avant suppression, et elle avait
> raison de le demander — il s'agit d'un **Modernizr 2.8.3 qui pose 43 classes sur `<html>`**
> (`flexbox`, `csstransforms`, `svg`, `no-touch`…). Ces 43 classes ont été croisées avec les
> sélecteurs de **tous** les fichiers CSS du projet : une seule correspondance réelle,
> `.no-js .owl-carousel` dans le CSS d'Owl. Or **`<html lang="fr">` ne porte aucune classe** : la
> règle ne s'appliquait donc ni avant ni après. Aucun changement de comportement, confirmé en
> navigateur (`document.documentElement.className` est vide et les 5 carrousels s'initialisent).
>
> **Le bloc `data-background` de `main.js`** : les deux motifs de mort sont confirmés
> expérimentalement. Zéro élément `[data-background]` dans tout le repo ; et sur une page de test
> isolée en jQuery 3.7.1, `$(document).on("ready", fn)` **ne s'exécute pas** au chargement là où
> `$(fn)` s'exécute.
>
> **Précision à apporter à la fiche** : ce n'est pas la _syntaxe_ qui a été supprimée en jQuery 3.0
> — `"ready"` reste un nom d'événement valide et le gestionnaire se déclenche si on émet
> l'événement à la main. Ce que jQuery 3.0 a supprimé, c'est le **déclenchement automatique** de cet
> événement au DOM ready. Le gestionnaire était donc bien mort, mais parce que plus rien ne
> l'appelle, pas parce qu'il serait invalide.
>
> **Non-régression vérifiée sur les 6 pages** : zéro requête en échec, zéro erreur console, jQuery /
> Bootstrap / WOW présents, les 5 carrousels de l'accueil initialisés, la modale d'inscription qui
> s'ouvre et se ferme, les boutons « choisir un pack » qui remplissent bien le message, et
> l'accordéon de la FAQ fonctionnel.
>
> **Remarque annexe, à verser à `PERF-07`.** Le CSS d'Owl référence
> `url(assets/css/owl.video.play.html)` — un fichier **HTML** utilisé comme image, reliquat du
> thème. La règle ne s'applique jamais (aucune vidéo Owl sur le site), donc le fichier n'est jamais
> demandé, mais il traîne dans `assets/css/`. À traiter avec l'élagage d'Owl.

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

> ✅ **Fait le 17/08/2026.** La fiche visait un `@import` bloquant ; le diagnostic a révélé bien
> pire, et a changé la nature de la tâche.
>
> **L'URL de l'`@import` était cassée.** Elle contenait `&amp;` au lieu de `&` — un échappement
> HTML dans un fichier CSS. Google Fonts recevait donc un paramètre nommé `amp;family` et
> l'ignorait. Vérifié en interrogeant directement l'API : la réponse ne contenait **que
> Yantramanav**. Conséquences, mesurées en navigateur :
>
> 1. **Roboto n'a jamais été chargé.** `--body-font: "Roboto", sans-serif` retombait sur la police
>    système. Sur Windows c'était Arial, sur Android Roboto, sur iOS Helvetica — le corps de texte
>    n'avait donc pas la même allure d'une plateforme à l'autre.
> 2. **`display=swap` était ignoré lui aussi**, `font-display` valant donc `auto` : Yantramanav
>    bloquait l'affichage du texte jusqu'à 3 s. L'inverse de ce que la fiche supposait acquis.
> 3. Le CSS demande `font-weight` **600** et **800**, or **Yantramanav ne possède ni l'un ni
>    l'autre** (100, 300, 400, 500, 700, 900 seulement). Le navigateur retombait sur 700 et 900 —
>    confirmé : ce sont les deux seules faces qu'il chargeait réellement.
>
> **Décision d'Hicham : entériner l'existant plutôt que réparer.** Servir Roboto en local aurait
> coûté 283 Ko sur une cible 3G/4G pour _changer_ l'apparence du site. Le corps de texte utilise
> donc désormais une pile système explicite, et seule Yantramanav est hébergée.
>
> | Mesure                         | Avant                         | Après               |
> | ------------------------------ | ----------------------------- | ------------------- |
> | Requêtes vers un domaine tiers | 1 (bloquante, en tête de CSS) | **0**               |
> | Polices de texte téléchargées  | Yantramanav ×2 (via Google)   | **33 Ko, en local** |
> | `font-display`                 | `auto` (bloquant)             | **`swap`**          |
>
> **4 fichiers téléchargés depuis `fonts.gstatic.com`**, pour 51 Ko sur le disque :
> `yantramanav-{700,900}-{latin,latin-ext}.woff2`. Seuls les deux `latin` sont réellement servis
> (33 Ko) — grâce à `unicode-range`, un sous-ensemble n'est demandé que si un de ses caractères est
> affiché. Les `latin-ext` ne coûtent donc rien aujourd'hui et couvrent un ajout de contenu futur.
> Les deux faces `latin` sont préchargées, comme le sont déjà celles de Font Awesome.
>
> **⚠️ Écart à assumer sur le critère « rendu inchangé ».** La pile retenue commence par
> `system-ui`, qui sur Windows résout vers **Segoe UI**, alors que l'ancien repli générique
> `sans-serif` donnait **Arial**. Mesuré au canvas sur une même chaîne : 397,44 px contre
> 399,72 px. Le rendu du corps de texte change donc légèrement sur Windows et iOS ; il est
> identique sur Android. Pour un rendu rigoureusement identique partout, il suffit de remplacer la
> valeur de `--body-font` par `sans-serif` seul, dans `assets/css/style.css`.
>
> **Nettoyage annexe.** Les deux `<link rel="dns-prefetch">` ont été retirés des 5 pages qui les
> portaient : celui vers `fonts.googleapis.com` n'a plus d'objet, et celui vers `cdn.jsdelivr.net`
> ne servait à rien — **aucune ressource du site n'a jamais été chargée depuis jsDelivr**.
>
> **Vérifié** sur les 6 pages : **zéro requête sortante**, zéro requête en échec, Yantramanav 700 et
> 900 chargées depuis `assets/fonts/`.

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

## Phase 2 — Nettoyage du dépôt

> `CLEAN-04` et `CLEAN-07` ne sont pas ici : elles attendent une décision, voir
> [`DECISIONS.md`](DECISIONS.md).

### 🟠 CLEAN-05 — Sortir tout le CSS des pages HTML ⏱️ 1 h

> ✅ **Fait le 17/08/2026**, à la demande d'Hicham.
>
> | Mesure                       | Avant | Après |
> | ---------------------------- | ----- | ----- |
> | Blocs `<style>` dans le HTML | 2     | **0** |
> | Attributs `style="…"` écrits | 21    | **0** |
>
> Les 2 blocs `<style>` (`404.html`, `politique-de-confidentialite.html`) et les 21 styles inline
> sont regroupés dans une section « Didactica » en fin de `assets/css/style.css`. Classes créées :
> `.text-underline` (9 usages), `.hero-bg-1`, `.hero-bg-2`, `.breadcrumb-bg`, `.text-red`,
> `.title-sm`, `.title-tight`, `.frame-borderless`, `.partner-logo-sm`, plus les sections
> `.error-area` et `.legal-area`.
>
> **Les 67 attributs `style` qui restent au runtime ne sont pas du code du site** : Owl Carousel,
> WOW.js et le préchargeur les posent en JavaScript. Les supprimer reviendrait à retirer les
> bibliothèques — c'est le sujet de `ARCH-03`, pas celui-ci.
>
> **Commentaires** : 22 commentaires explicatifs multilignes retirés des 7 pages (ils renvoyaient à
> des fiches de ce document, leur place est ici et non dans le HTML livré au navigateur). Les
> repères courts de structure (`<!-- footer area end -->`) sont conservés.
>
> **Non-régression vérifiée** : le texte visible des 6 pages suivies a été comparé à `HEAD` — les
> seuls écarts sont les ajouts voulus (lien Confidentialité, mention CIN, consentement, nouvelles
> spécialités). Zéro requête en échec, fonds de slider et de fil d'Ariane rendus depuis le CSS,
> page 404 et page légale correctement stylées.

---

### 🟡 CLEAN-06 — Uniformiser le formatage des fichiers HTML ⏱️ 30 min

> ✅ **Fait le 26/08/2026** — commits `16016a3` (configuration) et `f9101f6` (formatage).
>
> Deux commits plutôt qu'un, pour que le second ne contienne **rien d'autre** que du formatage.
>
> **Largeur mesurée, pas supposée.** Le formatage a été rejoué à 80, 100, 120 et 160 colonnes sur
> les pages déjà propres : 80 est de loin la valeur qui les touche le moins. C'est bien la largeur
> d'origine du projet.
>
> **`endOfLine` laissé sur `auto`.** Le dépôt est en `core.autocrlf=true` — CRLF sur disque, LF
> dans le dépôt. Forcer `lf` aurait réécrit les fins de ligne de tous les fichiers pour rien,
> soit exactement le bruit que cette fiche cherche à supprimer.
>
> **Version alignée sur l'éditeur.** L'extension VSCode installée embarque Prettier **3.7.4** ;
> c'est cette version qui a été utilisée, pour que le dépôt et un simple `Ctrl+S` produisent le
> même résultat. Effet visible : le doctype passe en minuscules, comportement de Prettier 3.
>
> **`.prettierignore` ajouté en plus de la fiche.** Tous les fichiers d'`assets/` sont minifiés,
> `style.css` compris. Le formatage se déclenchant à la sauvegarde, ouvrir puis enregistrer
> `bootstrap.min.css` suffisait à produire un diff de plusieurs dizaines de milliers de lignes.
>
> **Contenu vérifié avant écriture** en comparant le DOM rendu nœud par nœud : identique partout,
> à onze libellés d'`<option>` près qui gagnent un blanc en tête. Sans conséquence — la spec HTML
> rogne le libellé à l'affichage, et `main.js` lit `$("#specialite").val()`, donc l'attribut
> `value` et non le texte.
>
> **Résultat au-delà du critère de fin** : le bloc `<footer>` est désormais identique **octet à
> octet** sur les 7 pages (183 lignes, même empreinte), et le header ne diffère plus que par la
> classe `active` du lien courant. Les partiels d'`ARCH-01` pourront être extraits sans
> réconciliation manuelle. Sur les 2 001 lignes du diff, `git diff -w` n'en retient que 1 229 :
> le reste est de la pure ré-indentation.
>
> **⚠️ La prémisse de la fiche était fausse — vérifié le 26/08/2026.** L'énoncé affirmait que
> « Prettier s'exécute à l'enregistrement dans VSCode ». Ni l'un ni l'autre n'est vrai :
>
> ```json
> "[html]": { "editor.defaultFormatter": "vscode.html-language-features" }
> ```
>
> Le HTML est confié au **formateur natif de VSCode, pas à Prettier**, et `editor.formatOnSave`
> n'est défini nulle part — rien ne se formate automatiquement. Conséquence : un `Shift+Alt+F`
> sur une page **défera** le travail de cette fiche, et le `.prettierrc` versionné ne sera même
> pas consulté.
>
> **Tranché le 26/08/2026** : un `.vscode/settings.json` a été ajouté au dépôt, qui route
> `[html]`, `[css]`, `[javascript]` et `[json]` vers `esbenp.prettier-vscode`. Il ne vaut que
> pour Didactica, prime sur les réglages personnels — laissés intacts — et suit le projet sur
> toute autre machine. `editor.formatOnSave` n'y est volontairement pas défini : c'est une
> préférence personnelle, pas une contrainte du projet.
>
> **Version : à jour, l'écart est sans effet.** L'extension `esbenp.prettier-vscode 12.4.0`
> embarque Prettier **3.7.4**, la dernière publiée sur npm est **3.9.6**. Les deux produisent une
> sortie identique octet pour octet sur les 7 pages — la mise à jour n'est pas urgente.
>
> **Constat au passage, non traité ici** : `404.html` (135 lignes de header) et
> `politique-de-confidentialite.html` (138) n'ont pas le même menu que les 5 pages principales
> (141). À trancher lors de l'extraction des partiels.

**Problème.** Prettier s'exécute à l'enregistrement dans VSCode, mais n'a pas été passé sur tous les
fichiers : `contactez-nous.html` et `politique-de-confidentialite.html` ont une indentation de 2
espaces en moins que les autres. Conséquence concrète : un même bloc partagé (header, formulaire)
n'est plus détectable par simple comparaison de texte, et tout script de vérification doit
normaliser les espaces avant de comparer — c'est exactement ce qu'il a fallu faire pour `LEG-01`.
Autre effet visible : `git diff` affiche 1 225 lignes modifiées sur `contactez-nous.html` là où
seules quelques lignes ont changé.

**Étapes.**

1. Passer Prettier sur les 7 `.html` en une fois, en commit séparé et **sans autre modification**,
   pour que le bruit de formatage ne masque jamais un vrai changement.
2. Ajouter un `.prettierrc` à la racine pour figer le style (indentation 2, largeur 80).

**Terminé quand.** Les 7 pages ont le même style de formatage et un bloc partagé se compare
octet à octet.

---

### 🟡 CLEAN-03 — Sécuriser les liens externes ⏱️ 15 min

> ✅ **Fait le 26/08/2026** — commit `ed4ae0b`. 86 liens sécurisés, 86 vérifiés.
>
> **Le décompte de 86 était juste, mais pour une raison qu'il fallait établir.** Le site porte
> en réalité **105** attributs `target="_blank"`, répartis en trois familles que la fiche ne
> distinguait pas :
>
> | Famille                                                                           | Nombre | Traitement                                      |
> | --------------------------------------------------------------------------------- | ------ | ----------------------------------------------- |
> | Liens externes `http(s)` — Maps, Facebook, Instagram, YouTube, WhatsApp, LinkedIn | **86** | `rel="noopener noreferrer"` ajouté              |
> | Liens `mailto:`                                                                   | 14     | laissés tels quels — voir `CLEAN-07` ci-dessous |
> | Liens internes vers `politique-de-confidentialite.html`                           | 5      | déjà pourvus d'un `rel` depuis `LEG-01`         |
>
> Sur `mailto:`, `rel` n'a **aucun effet** et l'audit Lighthouse ne les examine pas : il ne
> couvre que les destinations `http(s)` d'origine différente. Les y ajouter aurait été du bruit.
>
> **Fait par script**, comme la fiche le suggérait, en filtrant sur le schéma de l'`href` — les
> attributs étant éclatés sur plusieurs lignes depuis `CLEAN-06`, une recherche-remplacement
> textuelle n'aurait pas suffi. Prettier a été repassé ensuite : la ligne YouTube dépassait
> 80 colonnes une fois l'attribut ajouté.
>
> **Contrôlé après coup** : 86 liens externes sur 86 portent l'attribut, aucun ne manque, et le
> contenu des 7 pages est identique à l'état précédent une fois les `rel` neutralisés de part et
> d'autre. `main.js` ne construit aucun lien — rien à traiter côté JavaScript, ce qui confirme
> au passage le diagnostic de `FORM-01` : tout passe par `window.open()`.

> ⚠️ **Décompte corrigé le 17/08/2026 : 86 liens, pas 20.** Le chiffre datait de l'état initial,
> avant la page `404.html` et avant l'ajout des boutons WhatsApp. Recompté sur les 6 pages :
> **86 liens `target="_blank"`, dont 86 sans `rel`.** L'effort est donc plus proche de 30 min que
> de 15, et c'est un bon candidat à un script plutôt qu'à une édition manuelle.

**Problème.** Les **86 liens** `target="_blank"` du site n'ont pas d'attribut `rel`. Les navigateurs
modernes appliquent `noopener` implicitement, le risque réel est donc faible — mais l'attribut reste
attendu par les audits Lighthouse et les vieux navigateurs.

**Étapes.** Ajouter `rel="noopener noreferrer"` aux 86 liens (réseaux sociaux, WhatsApp, partenaires).

**Terminé quand.** L'audit Lighthouse ne signale plus de lien externe non sécurisé.

---

### 🟠 CLEAN-01 — Centraliser le numéro de téléphone et les informations de contact ⏱️ 1 h

> ✅ **Fait le 26/08/2026** — commit `8a8ecda`.
>
> Le numéro n'existe plus qu'une fois dans `main.js`, dans un objet `CONTACT` en tête de fichier.
> Les trois gestionnaires passent par une fonction `ouvrirWhatsApp()` unique : le fichier ne
> contient plus qu'**un seul `window.open()`**, contre trois auparavant.
>
> **Conséquence directe sur `FORM-01`** : remplacer `window.open()` par un vrai lien `<a>` ne
> touchera qu'un seul endroit. C'était la raison d'ordonnancer cette fiche avant.
>
> **Écart assumé avec l'énoncé.** La fiche proposait `CONTACT = { whatsapp, tel, email }`. Or
> `tel` et `email` ne sont lus **nulle part** en JavaScript : ils seraient restés de la
> configuration morte, et auraient surtout donné l'illusion d'une centralisation que le HTML
> dément — il conserve **41 copies** du numéro et **33 de l'adresse email**. Seul `whatsapp` est
> donc centralisé. Le critère de fin est bien atteint, il porte explicitement sur le JavaScript.
> Le HTML attend le fichier de configuration d'`ARCH-01`, comme l'étape 4 le prévoyait.
>
> **Seul changement de comportement** : l'URL du formulaire d'inscription perd son « + ». Les deux
> formes fonctionnent — l'incohérence relevée par la fiche a disparu d'elle-même.
>
> **Fidélité des messages vérifiée** : les deux gabarits n'ont pas été retapés mais extraits mot
> pour mot de l'ancien code et réinsérés tels quels, puis les deux versions ont été évaluées avec
> les mêmes valeurs — messages identiques. Les 14 identifiants visés par le fichier existent tous
> dans les pages.

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

> ✅ **Terminée le 28/08/2026** — commits `db4d8c1` (`.gitignore`) et `722e973` (`README.md`).
>
> **Le README documente trois choses qu'on redécouvrait à chaque session** : que `file://` ne
> permet pas de prévisualiser correctement (chemins et lazy loading faussés), qu'un `git push`
> sur `master` publie directement le site sans étape de compilation, et surtout **où sont les
> coordonnées de contact** — 18 liens `tel:`, 15 liens `mailto:`, et quatre blocs JSON-LD qu'on
> oublie facilement de mettre à jour en même temps, au risque d'afficher un ancien numéro dans
> Google. Seul le numéro WhatsApp des formulaires est centralisé, dans la constante `CONTACT`
> de `main.js` (`CLEAN-01`).
>
> Il porte aussi l'avertissement sur **Prettier 3.7.4** : une version npm plus récente
> reformaterait les 7 pages et rendrait le diff suivant illisible.
>
> **Reste hors périmètre** : le README parle du domaine `www.didactica-oujda.ma` comme prévu
> mais non acheté. À reprendre quand `SEO-01` aboutira.
>
> ---
>
> _Historique._ **Moitié faite le 26/08/2026** — commit `db4d8c1`.
>
> Le `.gitignore` n'a pas été créé par anticipation mais par nécessité : en fin de session,
> l'extension VSCode **WhiteSource/Mend Advise** a déposé `.vscode/diff/vulsCount.txt` dans le
> dépôt et ajouté une clé `WhiteSource Advise.Diff.BaseBranch` à `.vscode/settings.json`.
> Sans `.gitignore`, l'artefact partait dans l'historique. Il couvre aussi `node_modules/`,
> `dist/` et `.astro/` pour `ARCH-01`, ainsi que `.env`.
>
> La clé de l'extension a été **conservée** plutôt que retirée : elle vaut `master`, ce qui est
> correct pour ce dépôt, et l'extension la réécrirait de toute façon à chaque analyse.
>
> **Problème.** Ni l'un ni l'autre n'existe. Le README est le premier écran de la page GitHub du
> projet, et il est vide. `.gitignore` deviendra nécessaire dès la Phase 3 (`node_modules/`, `dist/`).

**Étapes.**

1. `README.md` : ce qu'est le projet, comment le prévisualiser en local, comment il est déployé,
   où modifier les informations de contact.
2. `.gitignore` : `node_modules/`, `dist/`, `.DS_Store`, `Thumbs.db`, `.env`, `.astro/`.

**Terminé quand.** La page GitHub du dépôt présente le projet correctement.

---

## Phase 5 — Conformité

### 🔴 LEG-01 — Encadrer la collecte du CIN et de la date de naissance ⏱️ 2 h

> ✅ **Fait le 17/08/2026.** La fiche parlait de conformité ; l'échange avec Hicham a révélé que
> le vrai enjeu était **aussi commercial**, et cela a changé la mise en œuvre.
>
> **Le « pourquoi » du CIN n'a pas été relégué dans la politique de confidentialité.** CIN et date
> de naissance servent à établir une **pré-inscription**, laquelle ouvre droit à une **réduction
> d'au moins 10 %** quand l'élève se présente à l'école. Enfermer cette information derrière un
> lien que personne ne clique, c'était perdre un argument de vente sur le champ qui fait justement
> abandonner les visiteurs. Elle est donc affichée **directement sous le champ CIN**, et reprise en
> tête de la politique.
>
> **Un lien seul ne vaut pas consentement** (étape 2 de la fiche) : une case à cocher obligatoire,
> non cochée par défaut, a été ajoutée avant le bouton d'envoi. **Aucune ligne de JavaScript n'a
> été nécessaire** — `main.js:42` appelait déjà `form.reportValidity()`, qui prend nativement en
> charge un `required` sur une case. Vérifié en navigateur : sans la case, `reportValidity()`
> renvoie `false` et le premier champ invalide est bien `consentement` ; avec, l'envoi passe.
>
> **Correction de vocabulaire** : Hicham parlait de « TOS ». Des CGU encadrent un service en ligne
> (compte, achat) ; ici il n'y a qu'une collecte de données. La page créée est donc une
> **politique de confidentialité**, ce qu'attendent aussi les audits et Google.
>
> | Livrable                                       | Portée                            |
> | ---------------------------------------------- | --------------------------------- |
> | `politique-de-confidentialite.html`            | nouvelle page, 9 sections courtes |
> | Mention explicative sous le champ CIN          | **5** pages portant le formulaire |
> | Case de consentement obligatoire               | **5** pages portant le formulaire |
> | Lien « Confidentialité » au **menu principal** | **7** pages                       |
> | Lien « Confidentialité » au **pied de page**   | **7** pages                       |
> | Entrée sitemap (`priority` 0.3)                | `sitemap.xml`                     |
>
> La page réutilise le header et le footer de `404.html` — pas de 8ᵉ variante à maintenir — et ne
> contient **pas** le formulaire, pour la même raison qu'en `SEO-03` : ne pas créer un 5ᵉ endroit
> collectant le CIN.
>
> **↺ Deuxième version, le 17/08/2026 — la première était trop longue.** Hicham a demandé « simple
> et droit au but », en donnant <https://didactica.ma/avis-legal/> comme référence — l'autre site
> du groupe. Cette page fait ~250 mots, sept sections, des puces plutôt que des paragraphes. La
> page a donc été **réécrite de zéro sur ce gabarit** : de ~1 100 à **372 mots**, tableau des
> données remplacé par une liste à puces, encadré mis en avant fondu dans le texte, CSS local
> réduit de 60 à 25 lignes. Ce qui a été **conservé malgré la coupe** : la section « Pourquoi la
> CIN et la date de naissance » (c'est l'argument commercial, pas du remplissage) et la
> transparence sur le circuit WhatsApp.
>
> **Points de fond tranchés dans la page** :
>
> - **Conservation : 2 ans après le dernier contact** (décision d'Hicham).
> - **Transparence sur le circuit réel** : le site n'a aucune base de données ; tant que le
>   visiteur n'a pas appuyé sur « envoyer » dans WhatsApp, rien ne parvient à l'école et rien
>   n'est stocké. C'est dit explicitement — c'est rassurant, et c'est vrai.
> - **Mineurs** : le formulaire demande une date de naissance et les classes peuvent accueillir des
>   mineurs ; l'accord du représentant légal est prévu (fondu dans « Consentement » à la réécriture).
> - **Cookies** : la page peut affirmer qu'il n'y en a **aucun** et qu'aucune ressource tierce n'est
>   chargée — acquis de `PERF-06`, vérifié. À rouvrir si `SEO-07` (mesure d'audience) est mis en place.
>
> **✅ Forme juridique tranchée le 17/08/2026 : SARL**, après vérification d'Hicham. La page porte
> donc **Int and Inc SARL**. Conséquences : c'est la **loi 09-08** seule qui s'applique, l'autorité
> de recours est la **CNDP**, et les identifiants attendus sont **RC** et **ICE** — le doute RGPD /
> AEPD de la première version est levé et a été retiré de la page.
>
> ⚠️ **À signaler à Hicham** : <https://didactica.ma/avis-legal/> affiche encore « Int and Inc
> **SL** ». Si la SARL est la bonne forme, cette page de l'autre site est à corriger aussi.
>
> **L'étape 4 (déclaration CNDP) n'a pas été traitée** : démarche administrative hors code.
>
> **Vérifié en navigateur** sur les 7 pages : toutes en 200, zéro erreur console, zéro requête
> sortante, liens présents au menu **et** au pied de page partout, blocage du formulaire effectif.
> Menu contrôlé après ajout du 6ᵉ item : une seule ligne à 1280 et à 1000 px, aucun débordement
> horizontal, repli en burger correct à 375 px.
>
> **Retours d'Hicham traités le 17/08/2026** (hors énoncé de la fiche, mais issus de la relecture) :
>
> - **Puces invisibles dans la page.** `style.css` pose `li{list-style:none}` **sur la balise `li`
>   elle-même** : une règle `list-style: disc` posée sur le `<ul>` ne peut pas la contrer, la valeur
>   héritée perdant face à une déclaration directe sur l'élément. Corrigé en visant le `li`.
> - **Options « Spécialité » revues** : 8 → **13**, sur les 4 pages du formulaire. « Médecine » et
>   « Infirmier/Infirmière » fusionnés en **Santé**, ajout de métiers techniques, informatique,
>   hôtellerie, droit, éducation et « lycéen / étudiant sans spécialité ». Ordre calé sur les
>   débouchés Ausbildung : santé et métiers techniques en tête.
>   Au passage, les `&` des libellés sont désormais **échappés en `&amp;`** — ils ne l'étaient pas
>   dans le thème d'origine, et c'est le même oubli qui avait cassé l'URL Google Fonts en `PERF-06`.
> - **Header élargi** : `style.css` plafonnait `.container` à 1200 px (Bootstrap prévoit 1320), ce
>   qui tassait logo, menu et bouton au centre des grands écrans. Une règle en fin de `style.css`
>   porte le conteneur **de la seule barre de navigation** à 1600 px au-delà de 1400 px de large :
>   le logo gagne 200 px vers la gauche, le bouton autant vers la droite. Le reste du site garde sa
>   grille à 1200 px. Vérifié : inchangé en dessous de 1400 px, menu sur une ligne, pas de
>   défilement horizontal.
>
> **↺ Troisième passage, le 17/08/2026 — une erreur de ma part corrigée.**
> `tarifs-et-prix.html` **portait aussi le formulaire d'inscription**, avec le champ CIN, et je
> l'avais manqué : ma recherche initiale des pages concernées avait été tronquée à 40 résultats et
> j'en avais conclu qu'il n'y avait que 4 pages. Cette page a donc vécu deux passages sans case de
> consentement, sans mention explicative et avec les 8 anciennes spécialités. Corrigé : le bloc du
> formulaire est désormais **strictement identique sur les 5 pages** (empreinte `979c48e6`).
> Leçon pour les fiches suivantes : ne jamais conclure « N pages » à partir d'une recherche dont la
> sortie est tronquée.
>
> Défaut de conformité corrigé au passage dans ce même bloc : le libellé du groupe de niveaux
> portait `for="specialite"`, déjà pris par le `<select>` des spécialités — deux libellés pointaient
> donc la même commande, et le groupe de radios n'en avait aucun. Remplacé par un `<span>`.

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

## Annexe B — Avancement mesuré

Colonne de gauche : l'état initial du 16/08/2026. Colonne de droite : **mesure refaite le
26/08/2026**, après les Phases 0, 1 et l'essentiel de la 2.

| Indicateur                                 | 16/08 (départ)   | 26/08 (actuel)            |
| ------------------------------------------ | ---------------- | ------------------------- |
| Poids total du dépôt                       | 45 Mo            | **11,3 Mo**               |
| `assets/fonts/`                            | 14 Mo            | **921 Ko**                |
| `assets/img/`                              | 8 Mo             | 9,3 Mo ⚠️                 |
| `assets/css/`                              | 880 Ko           | **530 Ko**                |
| `assets/js/`                               | 244 Ko           | **223 Ko**                |
| `assets/css/` + `assets/js/` gzippés       | non mesuré       | 159,8 Ko (`PERF-07`)      |
| Images sur disque / jamais référencées     | 114 / 65         | 151 / **98** (7,4 Mo) ⚠️  |
| Balises `<img>` sans `loading` ni priorité | 68 / 68          | **0 / 93** ✅             |
| Balises `<img>` sans `alt`                 | 0 / 68 ✅        | **0 / 93** ✅             |
| Liens externes `_blank` sans `rel`         | 20 / 20          | **0 / 86** ✅             |
| Numéro WhatsApp codé en dur dans le JS     | 4 fois           | **1 fois** ✅             |
| `window.open()` dans `main.js`             | 3                | **1** ✅                  |
| Pages HTML                                 | 5 (5 121 lignes) | 7 (7 543 lignes)          |
| `robots.txt` / `sitemap.xml` / `404.html`  | absents          | **présents** ✅           |
| Requêtes vers un domaine tiers             | 1 (Google Fonts) | **0** ✅                  |
| Pied de page : empreintes distinctes       | ×5, identique    | **1 pour 7 pages** ✅     |
| Formatage des pages                        | hétérogène       | **Prettier, uniforme** ✅ |

⚠️ **Les deux lignes qui augmentent sont attendues, pas des régressions.** `assets/img/` contient
à la fois les originaux JPEG/PNG **et** leurs conversions WebP : `PERF-03` a converti sans
supprimer, conformément à ta consigne. Le nombre d'images « inutilisées » monte pour la même
raison — les originaux sont désormais orphelins. Tout est recensé dans [toDelete.md](toDelete.md).

**Cible restante : dépôt sous 4 Mo.** Elle est atteinte mécaniquement le jour où `PERF-02` est
exécuté (−7,4 Mo mesurés le 26/08), sans autre travail. C'est de loin le meilleur rapport effort/gain du document.
