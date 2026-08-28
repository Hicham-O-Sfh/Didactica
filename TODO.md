# TODO — Didactica

Travail **restant**. Chaque fiche est autonome : elle contient son contexte, les fichiers
concernés, les étapes et un critère de fin. Elle peut donc être traitée dans une session séparée,
sans relire tout le document.

| Fichier                        | Ce qu'on y trouve                                                       |
| ------------------------------ | ----------------------------------------------------------------------- |
| **`TODO.md`** (ici)            | Ce qu'il reste à faire                                                  |
| [`DECISIONS.md`](DECISIONS.md) | Les choix pris — et les 5 qui sont **en attente** et bloquent une fiche |
| [`DONE.md`](DONE.md)           | Les 15 fiches terminées, avec leurs rétrospectives                      |
| [`README.md`](README.md)       | Le projet lui-même : structure, prévisualisation, déploiement           |
| [`toDelete.md`](toDelete.md)   | Liste régénérable des images orphelines                                 |

**Convention** : cocher la case, ajouter le hash du commit, puis **déplacer la fiche dans
`DONE.md`** avec un encadré de rétrospective. Ce document ne garde pas ce qui est fait.

| Légende | Signification                                  |
| ------- | ---------------------------------------------- |
| 🔴      | Critique — bloque le SEO ou expose un risque   |
| 🟠      | Important — gain élevé                         |
| 🟡      | Confort — à faire quand le reste est fait      |
| ⏱️      | Effort estimé pour une session                 |
| ⏳      | Bloquée par une décision — voir `DECISIONS.md` |

---

## Point de reprise — à lire en début de session

### 1. Vérifier en navigateur — **jamais fait**

Les sessions des 26 et 28/08 ont modifié les 7 pages et `main.js` sans qu'aucun rendu n'ait été
contrôlé, et **tout est déjà poussé, donc en ligne**. C'est la première chose à faire, avant
d'ouvrir une nouvelle fiche : chaque fiche ajoutée creuse l'écart entre ce qui est publié et ce
qui est vérifié.

Dans Live Server :

1. Les **trois formulaires WhatsApp** — inscription, demande de rappel, message libre du pied de
   page. Ils ont été refactorisés en `CLEAN-01` : vérifier que le message pré-rempli arrive
   complet et correctement retourné à la ligne.
2. Les pages **`contactez-nous.html`** et **`politique-de-confidentialite.html`**, entièrement
   réécrites par le formateur en `CLEAN-06`.

### 2. Recharger la fenêtre VSCode

`Ctrl+Shift+P` → _Reload Window_, pour que `.vscode/settings.json` prenne effet. Sans cela, un
formatage manuel d'une page HTML passera encore par le formateur natif et défera `CLEAN-06`
(voir [D5](DECISIONS.md#d5--prettier-comme-formateur-unique-en-374)).

---

## Où en est-on — 28/08/2026

**Phases 0 et 1 terminées**, à l'exception de `PERF-02` (suppression volontairement reportée) et
de `PERF-07`. **Phase 2 terminée** hors les deux fiches qui attendent une décision.

| Phase                              | État                                                   |
| ---------------------------------- | ------------------------------------------------------ |
| **0 — Critique SEO**               | ✅ terminée                                            |
| **1 — Performance**                | ⏳ `PERF-02` (décision) — ⬜ `PERF-07`                 |
| **2 — Nettoyage du dépôt**         | ⏳ `CLEAN-04` `CLEAN-07` (décisions)                   |
| **3 — Maintenabilité (migration)** | ⬜ `ARCH-01` `ARCH-02` `ARCH-03`                       |
| **4 — SEO avancé**                 | ⬜ `SEO-05` `SEO-06` `SEO-07` — ⏳ `SEO-08` (décision) |
| **5 — Conformité et formulaires**  | ⏳ `FORM-01` (décision) — ⬜ `A11Y-01`                 |

**13 fiches restantes sur 28.** Cinq d'entre elles ne demandent pas du travail mais **une
décision de ta part** : elles sont listées dans [`DECISIONS.md`](DECISIONS.md#décisions-en-attente).

### La prochaine, sans hésitation : `FORM-01`

Une fois le contrôle en navigateur fait, c'est la fiche à plus fort impact métier : ne plus
perdre de prospects. Le terrain est déblayé — `CLEAN-01` a réduit `main.js` à un seul
`window.open()`, `CLEAN-06` a rendu les diffs HTML lisibles, et la politique de confidentialité
écrite en `LEG-01` couvre déjà l'envoi par email qu'elle introduit.

Mais elle est **bloquée** : il faut choisir le service de formulaire et créer le compte, ce qui
te revient — voir [D8](DECISIONS.md#d8--service-de-formulaire).

**Si tu préfères une session courte**, `CLEAN-07` (15 min) et `CLEAN-04` (10 min) partent dès que
tu tranches [D11](DECISIONS.md#d11--target_blank-sur-les-mailto) et
[D10](DECISIONS.md#d10--obfuscation-du-javascript).

**Si tu veux le meilleur rapport effort/gain du document**, c'est `PERF-02` : **7,4 Mo**, le dépôt
passe sous les 4 Mo, une décision suffit — [D9](DECISIONS.md#d9--suppression-des-98-images-orphelines).

---

## Contexte du projet

> Voir [`README.md`](README.md) pour la structure du dépôt et la marche à suivre au quotidien.
> Ce qui suit est ce qu'un README ne dit pas : les contraintes et l'objectif métier.

---

- Site vitrine statique, école d'allemand **Didactica** à Oujda (Maroc).
- **7 pages HTML**.
  ⚠️ Beaucoup de fiches parlent encore de « 5 pages » ou « 6 pages » : c'est l'état du site au
  moment où elles ont été écrites, pas une erreur. Le compte actuel est 7.
- Aucun build : HTML/CSS/JS pur. La migration est le sujet d'`ARCH-01`.
- Hébergement **GitHub Pages**, nom de domaine pas encore acheté — ce qui bloque `SEO-01`.
- Objectif métier prioritaire : **référencement naturel local** (« cours d'allemand Oujda ») et
  génération de contacts WhatsApp. C'est l'aune à laquelle se priorisent les fiches.
- Le formulaire d'inscription collecte CIN + date de naissance : **besoin métier confirmé**, on
  le garde — voir [D3](DECISIONS.md#d3--conserver-la-collecte-du-cin).

---

## Phase 1 — Performance (reste)

---

### 🟠 PERF-02 — Supprimer les images inutilisées ⏱️ 45 min — **gain ~7,4 Mo**

> 📋 **Inventaire fait le 16/08/2026, suppression volontairement reportée.**
> Décision d'Hicham : les images orphelines sont **recensées, pas supprimées**. La liste vit
> dans [toDelete.md](toDelete.md), régénérable à tout moment.
>
> Détection refaite de zéro plutôt que reprise de l'ancienne annexe : **64 images orphelines** et non 65,
> pour **3,9 Mo**. L'écart est `assets/img/error/01.png`, désormais utilisée par la page 404
> créée en `SEO-03` — ce qui illustre pourquoi la liste doit être régénérée avant toute
> suppression, et non recopiée.
>
> Contrôle effectué sur le point de vigilance de l'étape 2 : le site ne construit **aucun** chemin
> d'image dynamiquement. Le seul mécanisme de ce type, `data-background`, était du code mort et a
> été supprimé depuis (`PERF-05`).
>
> **⚠️ Angle mort de la détection, trouvé pendant `PERF-04`.** Trois images sont référencées dans
> `style.css` par un sélecteur qui ne correspond à **aucune** page — la recherche textuelle du
> chemin les compte donc à tort comme utilisées :
>
> | Sélecteur              | Image            | Poids  |
> | ---------------------- | ---------------- | ------ |
> | `.home-3 .footer-area` | `footer/01.webp` | 218 Ko |
> | `.enroll-area`         | `enroll/01.webp` | 86 Ko  |
> | `.choose-area::before` | `shape/01.webp`  | 28 Ko  |
>
> Aucune page ne porte ces classes : le navigateur ne demande jamais ces fichiers, mais **332 Ko**
> sont versionnés et déployés pour rien. À intégrer à `toDelete.md` lors de la régénération, en
> vérifiant au passage s'il existe d'autres sélecteurs morts du même genre.
>
> **⚠️ Les deux chiffres de cette fiche ne se contredisent pas, ils datent d'instants différents.**
> Les **3,9 Mo** ci-dessus valaient au 16/08, pour 64 images orphelines, **avant** `PERF-03`.
> Cette fiche-là a converti en WebP **sans supprimer les originaux**, conformément à ta consigne :
> chaque original converti est donc devenu orphelin à son tour. D'où la progression :
>
> | Date                                                | Images sur disque | Jamais référencées | Poids récupérable |
> | --------------------------------------------------- | ----------------: | -----------------: | ----------------: |
> | 16/08, avant `PERF-03`                              |               114 |                 64 |            3,9 Mo |
> | 16/08, après `PERF-03` ([toDelete.md](toDelete.md)) |               151 |                100 |            7,5 Mo |
> | **26/08, mesure de contrôle**                       |           **151** |             **98** |        **7,4 Mo** |
>
> L'écart de deux images entre le 16 et le 26 tient à `error/01.png`, reprise par la page 404, et
> à une méthode de détection légèrement différente. Il illustre exactement pourquoi la fiche
> impose de régénérer la liste avant toute suppression.
>
> **Reste à faire** : régénérer `toDelete.md` (en tenant compte de l'angle mort ci-dessus), puis
> supprimer — quand tu le décideras.

**Problème.** 65 des 114 images du repo ne sont référencées **nulle part** dans le HTML, le CSS ou
le JS. Ce sont des reliquats du thème d'origine : blog, portfolio, recherche, campus, alumni…
Autant de fichiers versionnés, clonés et déployés pour rien.

La liste exacte vit dans [toDelete.md](toDelete.md), régénérable à tout moment. L'ancienne annexe du présent document a été retirée pour éviter qu'on ne travaille à partir d'une copie périmée.

**Étapes.**

1. Régénérer [toDelete.md](toDelete.md) — ne jamais partir d'une liste recopiée.
2. **Re-vérifier avant suppression** : la détection s'appuie sur une recherche textuelle des chemins.
   Contrôler qu'aucune image n'est appelée via une construction dynamique en JS ou une règle CSS
   exotique. (`git` rend l'opération réversible de toute façon.)
3. Supprimer, puis supprimer aussi les dossiers devenus vides.
4. Parcourir les 5 pages et vérifier la console navigateur : zéro 404.

**Terminé quand.** `assets/img/` pèse environ 4 Mo et la console est vide d'erreurs 404 sur les 5 pages.

---

### 🟠 PERF-07 — Élaguer le CSS et le JS non utilisés (code et bibliothèques) ⏱️ 4 h

**Problème.** Le site charge sur chaque page l'intégralité de bibliothèques dont il n'exploite
qu'une fraction. État mesuré le 16/08/2026, **après** `PERF-01` :

| Fichier                   | Brut       | **Gzippé** | Soupçon                                              |
| ------------------------- | ---------- | ---------- | ---------------------------------------------------- |
| `bootstrap.min.css`       | 227 Ko     | 30,3 Ko    | grille + navbar utilisées, le reste probablement pas |
| `all-fontawesome.min.css` | 187 Ko     | 42,2 Ko    | **4733 icônes déclarées, 37 utilisées**              |
| `style.css`               | 65 Ko      | 12,7 Ko    | thème d'origine, sections supprimées non purgées     |
| `animate.min.css`         | 44 Ko      | 3,9 Ko     | seules les animations pilotées par WOW.js servent    |
| `jquery-3.7.1.min.js`     | 85 Ko      | 29,7 Ko    | requis par Owl Carousel — voir `ARCH-03`             |
| `bootstrap.bundle.min.js` | 79 Ko      | 23,2 Ko    | seul le `collapse` du menu mobile semble utilisé     |
| `owl.carousel.min.js`     | 43 Ko      | 11,2 Ko    | un seul carrousel sur le site                        |
| `modernizr.min.js`        | 11 Ko      | 4,4 Ko     | voir `PERF-05`, aucune détection appelée             |
| **Total**                 | **765 Ko** | **165 Ko** |                                                      |

`PERF-05` ne traite que les dépendances **entièrement** mortes. Cette fiche vise l'étage
au-dessus : le code mort **à l'intérieur** des fichiers conservés.

> 📏 **Code mort mesuré le 26/08/2026**, par comparaison des classes déclarées dans chaque
> feuille avec celles réellement présentes dans les 7 pages et dans `main.js` :
>
> | Feuille                   | Classes déclarées | Utilisées | Part morte |  Gzippé |
> | ------------------------- | ----------------: | --------: | ---------: | ------: |
> | `all-fontawesome.min.css` |             4 877 |        52 |   **99 %** | 41,9 Ko |
> | `bootstrap.min.css`       |             2 029 |        72 |   **96 %** | 30,3 Ko |
> | `animate.min.css`         |                64 |         4 |   **94 %** |  4,0 Ko |
> | `owl.carousel.min.css`    |                34 |         2 |       94 % |  1,1 Ko |
> | `style.css`               |               454 |       179 |   **61 %** | 13,8 Ko |
>
> Cas le plus net : `animate.css` déclare **61 animations**, le site en utilise **3** —
> `fadeInUp`, `fadeInRight`, `fadeInLeft`. Aucune classe `animate__*` n'est employée : c'est
> la v3 de Daniel Eden, aux noms non préfixés.
>
> **Réserve d'honnêteté** : Bootstrap et Owl fabriquent des classes à l'exécution
> (`show`, `collapsing`, `owl-item`, `owl-stage`…) qu'un comptage statique classe à tort comme
> mortes. Les pourcentages de ces deux lignes sont un **plafond**, pas une mesure. Font Awesome
> et `style.css` ne souffrent pas de ce biais : leurs classes sont toutes écrites à la main.
>
> Total actuel : **159,8 Ko gzippés** pour `assets/css/` + `assets/js/`. L'objectif de la fiche
> — diviser par deux — suppose donc de descendre sous 80 Ko.
>
> **Toutes les bibliothèques chargées servent** à quelque chose : grille Bootstrap (195 usages),
> `data-bs-toggle` pour le menu et l'accordéon, Owl (10), WOW (12), jQuery requis par Owl et
> `main.js`. Il n'y a donc rien à supprimer en bloc — tout le gain est _à l'intérieur_ des
> fichiers, ce qui est bien l'objet de cette fiche.

**Étapes.**

1. Relever la couverture réelle avec l'onglet _Coverage_ de Chrome DevTools, sur les 7 pages,
   en interagissant (menu mobile, carrousel, modale d'inscription, défilement complet).
2. CSS : passer PurgeCSS en lui donnant les 7 `.html` **et** `main.js` comme sources.
3. JS : décider bibliothèque par bibliothèque. Bootstrap n'est peut-être utilisé que pour le
   `collapse` du menu — auquel cas 20 lignes de JS natif remplacent 79 Ko.
4. Font Awesome : ne conserver que les 37 icônes réellement utilisées (~10 Ko gzippés au lieu
   de 42,2). Décision déjà posée en `PERF-01`.

**Pièges à ne pas manquer.**

- **Classes ajoutées dynamiquement.** `main.js` injecte des icônes, WOW.js pose `animated` et les
  classes `animate__*` au défilement, Owl Carousel génère toute sa structure au runtime. Un
  PurgeCSS naïf les supprimera. Il faut une _safelist_, et retester en interaction réelle.
- **Ordre des opérations.** À faire idéalement **après `ARCH-01`** : avec un build, l'élagage est
  rejoué à chaque modification et ne peut plus se désynchroniser du code. Fait à la main
  aujourd'hui, le résultat se périme dès qu'une icône ou une classe est ajoutée.

**Terminé quand.** Le poids gzippé de `assets/css/` + `assets/js/` est réduit d'au moins moitié,
et les 7 pages sont vérifiées en interaction (menu mobile, carrousel, modale, animations) sans
régression visuelle.

---

## Phase 2 — Nettoyage du dépôt (reste)

> Les deux fiches restantes attendent chacune une décision, pas du travail. 25 minutes à deux
> une fois tranchées.

---

### 🟡 CLEAN-07 — Retirer `target="_blank"` des 14 liens `mailto:` ⏱️ 15 min

**Constat, relevé pendant `CLEAN-03` le 26/08/2026.** Les 14 liens `mailto:Didactica.Oujda@gmail.com`
du pied de page portent `target="_blank"`. Sur un lien `mailto:`, cet attribut n'a pas de sens :
le navigateur ouvre un onglet vide, passe la main au client mail, et l'onglet reste souvent là,
blanc, jusqu'à ce que le visiteur le referme. C'est une verrue d'ergonomie, pas un défaut de
sécurité — d'où une fiche séparée plutôt qu'une correction glissée dans `CLEAN-03`, qui ne
faisait que de la mise en conformité.

**Fichiers.** Les 7 `.html` (bloc `<footer>`, identique octet à octet sur les 7 depuis `CLEAN-06`).

**Étapes.**

1. Retirer `target="_blank"` des seuls liens dont l'`href` commence par `mailto:`.
2. Vérifier sur une page que le clic ouvre bien le client mail sans laisser d'onglet.
3. Repasser Prettier.

**Attention.** C'est un **changement de comportement**, contrairement à `CLEAN-03`. À valider
avant de l'appliquer.

**Terminé quand.** Plus aucun `mailto:` ne porte `target="_blank"`, et le clic ne laisse pas
d'onglet vide.

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

> Prérequis : Phases 0 à 2 terminées. Inutile de migrer ce qui doit être supprimé — d'où
> l'intérêt de trancher [D9](DECISIONS.md#d9--suppression-des-98-images-orphelines) avant.
>
> Le choix d'Astro et son raisonnement sont dans
> [D1](DECISIONS.md#d1--générateur-de-site-statique--astro).

---

### 🟠 ARCH-01 — Migrer vers Astro ⏱️ 1 à 2 jours

**Problème.** Le `<nav>` et le `<footer>` sont copiés-collés à l'identique dans les 7 pages — le
pied de page est strictement identique partout (empreinte `d58410e9` sur les cinq fichiers).
Toute modification, si minime soit-elle, exige cinq éditions manuelles, avec un risque d'oubli
proportionnel. C'est la dette qui coûtera le plus cher dans la durée.

**Approche.** La justification SEO du choix d'Astro est dans
[D1](DECISIONS.md#d1--générateur-de-site-statique--astro).

**Étapes.**

1. `npm create astro@latest` dans un dossier de travail, template minimal, sans framework UI.
2. Créer `src/layouts/Base.astro` : `<head>` (meta, JSON-LD paramétré), header, `<slot />`, footer.
3. Extraire `src/components/Header.astro` et `Footer.astro` depuis le HTML existant.
4. Créer `src/config.ts` : téléphone, WhatsApp, email, adresse, horaires, réseaux sociaux, URL de base.
   Toutes les pages et le JSON-LD y puisent — cela clôt définitivement `CLEAN-01`.
5. Convertir les 7 pages en `src/pages/*.astro`, chacune ne portant que son contenu propre.
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

---

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

> 📌 **Orientation prise le 17/08/2026 — à implémenter plus tard, choix non définitif.**
>
> **Option retenue par défaut : Umami** (offre Cloud gratuite, sans cookies, événements
> personnalisés). Raison du choix : la seule fonction de Plausible qui manquerait vraiment est son
> intégration Search Console — or la même information est **gratuite dans Search Console
> elle-même**, qu'il faut ouvrir de toute façon (`SEO-06`). Payer ~108 €/an pour éviter un second
> onglet ne se justifie pas à ce stade.
>
> **La porte reste ouverte**, à trancher au moment de l'implémentation :
>
> | Candidat               | Ce qui le ferait gagner                                                                                           | Ce qu'il coûte                                                                                                                                             |
> | ---------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | **Umami**              | gratuit à ce volume, rapport de parcours page à page, auto-hébergeable simplement                                 | pas de rapport hebdo par email, pas d'alerte de pic                                                                                                        |
> | **Plausible**          | rapport hebdomadaire par email, alerte de pic de trafic, clics sortants suivis sans code, Search Console intégrée | ~9 €/mois, pas d'offre gratuite                                                                                                                            |
> | **Google Analytics 4** | gratuit, très complet, familier                                                                                   | **cookies → bandeau de consentement obligatoire**, plus lourd, données envoyées à Google — contredirait la politique de confidentialité écrite en `LEG-01` |
>
> Ce que **ni** Umami **ni** Plausible ne donneront : identité des visiteurs, enregistrement de
> session, carte de chaleur, suivi d'une même personne d'un appareil à l'autre. C'est le prix de
> l'absence de cookies, et c'est ce qui évite le bandeau.
>
> **⚠️ Piège technique valable pour les trois.** Le suivi automatique des clics sortants (extension
> de script de Plausible) ne fonctionne que sur de vrais liens `<a href>`. Or `main.js` ouvre
> WhatsApp par `window.open()` : **aucun outil ne verrait ces clics** sans événement écrit à la
> main. À traiter avec `FORM-01`, qui prévoit justement de remplacer `window.open()` par un vrai
> lien — l'ordre logique est donc `FORM-01` puis `SEO-07`.
>
> **⚠️ Second piège, ajouté le 26/08/2026 après `CLEAN-03`.** Les 5 liens internes vers
> `politique-de-confidentialite.html` portent `rel="noopener noreferrer"` depuis `LEG-01`. Le
> `noreferrer` vide `document.referrer` : quel que soit l'outil, ces visites apparaîtront en
> **trafic direct** et non comme une navigation interne. Ce n'est pas grave, mais il faut le savoir
> avant de s'étonner du chiffre. Si l'on veut voir le parcours réel, il suffira de ramener ces
> 5 liens à `rel="noopener"` seul — le `noreferrer` n'apporte rien sur un lien vers soi-même.
>
> **⚠️ Conséquence obligatoire sur `LEG-01`, quel que soit l'outil retenu.** La politique de
> confidentialité affirme aujourd'hui qu'aucun cookie n'est déposé **et qu'aucune ressource tierce
> n'est chargée**. La seconde moitié devient fausse dès l'ajout du script : deux phrases à
> reprendre dans la section « Cookies ». Avec Google Analytics, il faudrait en plus un vrai bandeau
> de consentement, donc une refonte de la section.
>
> **Rappel de séquencement** : `SEO-06` (Search Console) est gratuit, ne demande aucun code et
> apporte plus à un référencement local que n'importe lequel de ces trois outils. À faire avant.

**Problème.** Aucun outil de mesure. Impossible de savoir combien de visiteurs cliquent sur les
boutons WhatsApp — donc impossible de mesurer la conversion réelle du site.

**Étapes.**

1. Confirmer le choix de l'outil (voir l'encadré ci-dessus) et créer le compte.
2. Poser le script de mesure sur les 7 pages.
3. Suivre en événements les clics sur les boutons WhatsApp : c'est **la** métrique qui compte ici.
   Les **trois** points d'envoi doivent porter un nom d'événement distinct — `#send-whatsapp-form`
   (formulaire), `#whatsapp-button` (bouton flottant), `#send-footer-whatsapp-message` (pied de
   page) — sans quoi on saura combien de clics, mais pas lesquels convertissent.
4. Envisager d'attacher au clic le niveau et l'objectif choisis dans le formulaire (propriétés
   d'événement) : cela dirait quel public le site attire réellement.
5. Mettre à jour la section « Cookies » de `politique-de-confidentialite.html`.

**Terminé quand.** Le tableau de bord affiche les visites et distingue les clics WhatsApp des
trois boutons, et la politique de confidentialité est à jour.

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

**Terminé quand.** Score Lighthouse Accessibilité ≥ 95 sur les 7 pages.

---

## Ordre d'exécution recommandé

```
⏸️  Vérification navigateur          ← d'abord, voir le point de reprise
   │
   ▼
⏳ FORM-01          (D8 : choix du service + création du compte)
   │
   ▼
⏳ CLEAN-07, CLEAN-04, PERF-02       (D11, D10, D9 : trois décisions, ~1 h de travail)
   │
   ▼
⬜ ARCH-01 ──► ARCH-02 ──► ARCH-03   (migration Astro)
   │
   ▼
⬜ PERF-07                            (après ARCH-01, sinon l'élagage se périme)
   │
   ▼
⬜ SEO-06 ──► SEO-05, SEO-07, ⏳ SEO-08
   │
   ▼
⬜ A11Y-01
```

**Trois contraintes d'ordre, à ne pas défaire :**

1. **`PERF-07` après `ARCH-01`.** Élaguer le CSS et le JS avant la migration reviendrait à le
   refaire après : le build Astro change ce qui est réellement chargé.
2. **`SEO-06` avant `SEO-07` et `SEO-08`.** Les deux dépendent de données que seule Search
   Console fournit. Décider avant d'avoir les chiffres, c'est décider au hasard.
3. **`PERF-02` avant `ARCH-01`.** Migrer 98 images orphelines et 7,4 Mo serait absurde.

---

## Annexe — Images inutilisées

> L'annexe qui listait les images a été **retirée le 17/08/2026** : elle était périmée, et
> recopier une liste obsolète est précisément l'erreur contre laquelle `PERF-02` met en garde.
>
> La liste vivante est [toDelete.md](toDelete.md), régénérable à tout moment. Lire l'encadré de
> `PERF-02` avant de l'utiliser : la détection a un angle mort sur les sélecteurs CSS morts.
>
> L'annexe « polices à supprimer » est sans objet depuis `PERF-01`. `assets/fonts/` ne contient
> plus que les 3 fichiers Font Awesome réellement utilisés, plus les 4 de Yantramanav ajoutés
> par `PERF-06`.
>
> **L'avancement mesuré** (poids du dépôt, compteurs avant/après) est passé dans
> [`DONE.md`](DONE.md#annexe-b--avancement-mesuré).
