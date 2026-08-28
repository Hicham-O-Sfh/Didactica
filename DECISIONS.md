# Décisions — Didactica

Registre des choix qui engagent le projet : ceux qui sont **pris** et qu'on ne rediscute plus
sans raison, et ceux qui sont **en attente** et bloquent une fiche.

Il existe parce que ces choix étaient jusqu'ici dispersés dans les encadrés de `TODO.md`, où on
les redécouvrait — ou pire, où on les défaisait par inadvertance. Une décision prise et oubliée
coûte plus cher qu'une décision jamais prise.

- Le travail restant est dans [`TODO.md`](TODO.md).
- Le détail de ce qui a été fait est dans [`DONE.md`](DONE.md).

**Convention.** Chaque décision porte une date et, quand elle en a un, un renvoi vers la fiche
qui la met en œuvre. Une décision _prise_ peut être révisée — mais explicitement, en modifiant
ce fichier, pas au détour d'un commit.

---

## Sommaire

| #                                                 | Décision                                         | État              |
| ------------------------------------------------- | ------------------------------------------------ | ----------------- |
| [D1](#d1--générateur-de-site-statique--astro)     | Générateur de site statique : **Astro**          | ✅ Prise — 16/08  |
| [D2](#d2--conserver-les-originaux-des-images)     | Conserver les originaux des images converties    | ✅ Prise — 16/08  |
| [D3](#d3--conserver-la-collecte-du-cin)           | Conserver la collecte du CIN                     | ✅ Prise — 17/08  |
| [D4](#d4--zéro-css-dans-le-html)                  | Zéro CSS dans le HTML                            | ✅ Prise — 17/08  |
| [D5](#d5--prettier-comme-formateur-unique-en-374) | Prettier comme formateur unique, en 3.7.4        | ✅ Prise — 26/08  |
| [D6](#d6--pas-de-rel-sur-les-liens-mailto)        | Pas de `rel` sur les liens `mailto:`             | ✅ Prise — 26/08  |
| [D7](#d7--mesure-daudience--umami-par-défaut)     | Mesure d'audience : Umami par défaut             | 📌 Orientation    |
| [D8](#d8--service-de-formulaire)                  | Service de formulaire (`FORM-01`)                | ⏳ **En attente** |
| [D9](#d9--suppression-des-98-images-orphelines)   | Suppression des 98 images orphelines (`PERF-02`) | ⏳ **En attente** |
| [D10](#d10--obfuscation-du-javascript)            | Obfuscation du JavaScript (`CLEAN-04`)           | ⏳ **En attente** |
| [D11](#d11--target_blank-sur-les-mailto)          | `target="_blank"` sur les `mailto:` (`CLEAN-07`) | ⏳ **En attente** |
| [D12](#d12--version-allemande-ou-arabe)           | Version allemande ou arabe (`SEO-08`)            | ⏳ **En attente** |

---

# Décisions prises

## D1 — Générateur de site statique : Astro

_Prise le 16/08/2026. Met en œuvre : `ARCH-01`, `ARCH-02`._

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

## D2 — Conserver les originaux des images

_Prise le 16/08/2026, sur ta consigne. Mise en œuvre : `PERF-03`._ Voir [`DONE.md`](DONE.md).

`PERF-03` a converti les images en WebP **sans supprimer les JPEG/PNG d'origine**. Le gain de
poids attendu n'a donc pas été encaissé : chaque original converti est devenu orphelin à son
tour, et `assets/img/` a _augmenté_ — 8 Mo au départ, 9,3 Mo aujourd'hui.

Ce n'est pas une régression, c'est le prix assumé d'un filet de sécurité : tant que les
originaux sont là, une conversion ratée se rattrape sans rien regénérer.

**Ce que ça coûte aujourd'hui** : 7,4 Mo, et c'est exactement l'objet de
[D9](#d9--suppression-des-98-images-orphelines). Trancher D9 solde cette décision-ci.

---

## D3 — Conserver la collecte du CIN

_Prise le 17/08/2026, besoin métier confirmé. Mise en œuvre : `LEG-01`._

Le formulaire d'inscription collecte le **numéro de CIN et la date de naissance**. La question
s'est posée de les retirer — c'est la réponse réflexe devant une donnée sensible. Elle a été
écartée : l'école en a un besoin réel pour les inscriptions aux examens Goethe.

La collecte est donc **encadrée plutôt que supprimée** : c'est tout l'objet de `LEG-01`, qui a
produit `politique-de-confidentialite.html` et la mention de consentement du formulaire.

**Conséquence à ne pas perdre de vue** : toute fiche qui fait transiter ces données ailleurs
doit repasser par la politique de confidentialité. C'est explicitement le cas de `FORM-01`
([D8](#d8--service-de-formulaire)), qui les enverrait aussi par email.

---

## D4 — Zéro CSS dans le HTML

_Prise le 17/08/2026, à ta demande. Mise en œuvre : `CLEAN-05`._

Plus aucun bloc `<style>` ni attribut `style="…"` écrit à la main dans les pages : tout vit dans
une section « Didactica » en fin d'`assets/css/style.css`.

**La nuance qui compte** : il reste 67 attributs `style` au runtime, posés en JavaScript par Owl
Carousel, WOW.js et le préchargeur. Ce ne sont pas des oublis, et les retirer reviendrait à
retirer les bibliothèques — sujet d'`ARCH-03`, pas de celui-ci. Inutile de rouvrir le dossier en
les voyant dans l'inspecteur.

---

## D5 — Prettier comme formateur unique, en 3.7.4

_Prise le 26/08/2026. Mise en œuvre : `CLEAN-06`, `CLEAN-02`._

Tout le dépôt est formaté par **Prettier**, configuré par `.prettierrc` (80 colonnes, 2 espaces),
et `.vscode/settings.json` route HTML, CSS, JS et JSON vers lui.

Deux pièges, tous deux déjà rencontrés :

1. **Le formateur natif de VSCode.** Sans le `settings.json` du dépôt, VSCode confie le HTML à
   `vscode.html-language-features`, dont le style diffère. Un seul formatage manuel déferait
   `CLEAN-06` sur une page entière. Après un clone ou une modification de ce fichier,
   **recharger la fenêtre**.
2. **La version.** Utiliser **3.7.4**, celle qu'embarque l'extension `esbenp.prettier-vscode`.
   Une version npm plus récente reformaterait les 7 pages et noierait le diff suivant.

Sont volontairement exclus par `.prettierignore` : les bibliothèques minifiées, et
`assets/css/style.css`, gardée compactée.

---

## D6 — Pas de `rel` sur les liens `mailto:`

_Prise le 26/08/2026. Mise en œuvre : `CLEAN-03`._

`CLEAN-03` a ajouté `rel="noopener noreferrer"` aux **86 liens externes `http(s)`** et
volontairement **pas** aux 14 liens `mailto:`.

Sur un `mailto:`, `rel` n'a aucun effet, et l'audit Lighthouse ne les examine pas — il ne couvre
que les destinations `http(s)` d'origine différente. Les y ajouter aurait été du bruit dans le
diff pour un gain nul.

Un audit qui les signalerait un jour se trompe : ce n'est pas un oubli. Le vrai défaut de ces
liens est ailleurs, c'est [D11](#d11--target_blank-sur-les-mailto).

---

## D7 — Mesure d'audience : Umami par défaut

_Orientation prise le 17/08/2026 — **non définitive**, à confirmer au moment d'implémenter
`SEO-07`._ Le comparatif des trois candidats est dans la fiche, voir [`TODO.md`](TODO.md).

**Umami** tient la corde : gratuit à ce volume, sans cookies — donc **sans bandeau de
consentement**, ce qui compte après `LEG-01`.

Le raisonnement en une ligne : la seule fonction de Plausible qui manquerait vraiment est son
intégration Search Console, or la même information est gratuite dans Search Console elle-même,
qu'il faut ouvrir de toute façon (`SEO-06`). Environ 108 €/an pour éviter un second onglet ne se
justifie pas à ce stade.

**Google Analytics 4 est écarté**, lui, pour une raison de fond et non de prix : ses cookies
imposeraient un bandeau de consentement et contrediraient la politique de confidentialité écrite
en `LEG-01`.

---

# Décisions en attente

> Chacune bloque une fiche. Aucune n'est urgente au sens technique — mais tant qu'elles ne sont
> pas tranchées, le travail correspondant ne peut pas commencer.

## D8 — Service de formulaire

_Bloque `FORM-01`, la fiche à plus fort impact métier du document._

**La question.** Quel service reçoit les soumissions de formulaire par email, en doublure de
l'envoi WhatsApp : **Web3Forms**, **Formspree** ou **Netlify Forms** ?

**L'enjeu.** Aujourd'hui, un visiteur qui remplit le formulaire mais ne finalise pas dans
WhatsApp — bascule d'application ratée, hésitation, WhatsApp Web non connecté — est perdu **sans
que personne ne sache qu'il a existé**. C'est du prospect qui disparaît en silence.

**Ce qui t'appartient**, et que je ne ferai pas à ta place : choisir le service, **créer le
compte** et obtenir la clé d'API. Je ne crée pas de compte et ne saisis pas de clé.

**Le critère qui devrait décider**, et qui n'est pas le prix : le formulaire transporte des
**CIN et dates de naissance** ([D3](#d3--conserver-la-collecte-du-cin)). Ces données transiteront
par le service choisi et y seront stockées. Avant de choisir, regarder où sont hébergés ses
serveurs et ce qu'il dit de la durée de conservation — puis mettre
`politique-de-confidentialite.html` en accord, comme l'exige l'étape 4 de la fiche.

Netlify Forms suppose par ailleurs d'héberger chez Netlify : c'est un **changement d'hébergeur**,
pas seulement un choix de formulaire.

---

## D9 — Suppression des 98 images orphelines

_Bloque `PERF-02`. Gain mesuré : **7,4 Mo**, soit les deux tiers du dépôt._

**La question.** Feu vert pour supprimer les images qui ne sont référencées nulle part ?

**Pourquoi ça n'a pas été fait.** Ce n'est pas un oubli : les images ont été **recensées, pas
supprimées**, sur ta décision du 16/08 ([D2](#d2--conserver-les-originaux-des-images)). La liste
vit dans [`toDelete.md`](toDelete.md).

**Le rapport effort/gain est le meilleur du document** : le dépôt passe sous les 4 Mo — la cible
restante — sans autre travail que la suppression elle-même. Et `git` rend l'opération réversible.

**Deux précautions, si tu donnes le feu vert :**

1. **Régénérer la liste, ne jamais partir d'une copie.** L'ancienne annexe l'a déjà prouvé :
   `error/01.png` y figurait comme orpheline alors que la page 404 l'utilise depuis `SEO-03`.
2. **Tenir compte de l'angle mort connu** : trois images sont référencées dans `style.css` par
   des sélecteurs qui ne correspondent à aucune page (`.home-3 .footer-area`, `.enroll-area`,
   `.choose-area::before`). La détection textuelle les compte à tort comme utilisées — **332 Ko**
   déployés pour rien. À intégrer à la régénération.

---

## D10 — Obfuscation du JavaScript

_Bloque `CLEAN-04`. Coût : 10 minutes, une fois la décision prise._

**La question.** Acte-t-on l'abandon définitif de l'obfuscation de `assets/js/main.js` ?

**L'état réel.** L'historique porte deux commits d'obfuscation (`c1f0bd1`, `eb447bb`), mais le
fichier est **en clair dans `master`** : la boucle a été défaite pour modifier le numéro de
téléphone. La décision est donc déjà prise dans les faits ; il ne reste qu'à l'écrire.

**Recommandation : abandonner définitivement.** Le fichier ne contient aucun secret — le numéro
WhatsApp est déjà visible dans le HTML, dans le JSON-LD et dans le pied de page. L'obfuscation ne
protège rien, complique chaque modification, et impose de maintenir deux versions du même
fichier. Le cycle « obfusquer → désobfusquer pour corriger → réobfusquer » visible dans
l'historique en est la démonstration.

---

## D11 — `target="_blank"` sur les `mailto:`

_Bloque `CLEAN-07`. **Changement de comportement** — d'où la décision._

**La question.** Retire-t-on `target="_blank"` des 14 liens `mailto:` du pied de page ?

**Le constat.** Sur un `mailto:`, cet attribut n'a pas de sens : le navigateur ouvre un onglet
vide, passe la main au client mail, et l'onglet reste souvent là, blanc, jusqu'à ce que le
visiteur le referme.

**Pourquoi ça mérite ta validation** plutôt qu'un simple commit : c'est une verrue d'ergonomie,
pas un défaut de sécurité — le comportement observé par le visiteur change. À distinguer de
`CLEAN-03`, qui ne faisait que de la mise en conformité sans rien changer au rendu
([D6](#d6--pas-de-rel-sur-les-liens-mailto)).

**Recommandation : retirer.** Le cas où un onglet vide rend service n'existe pas.

---

## D12 — Version allemande ou arabe

_Bloque `SEO-08`. À trancher **après** `SEO-06`, pas avant._

**La question.** Faut-il une version arabe, voire allemande, du site ? Toutes les pages déclarent
`lang="fr"` sans aucune balise `hreflang`.

**Pourquoi c'est tentant.** Pour une école d'allemand au Maroc, une version arabe pourrait ouvrir
un tout autre volume de recherche.

**Pourquoi il ne faut pas décider maintenant.** La vraie question est de savoir si le trafic
ciblé cherche en français, en arabe, ou en darija translittérée — et personne ne le sait
aujourd'hui. La réponse est dans Search Console, qu'il faut ouvrir de toute façon (`SEO-06`).
**Décider après avoir des données**, pas avant : c'est un chantier bien trop lourd pour être
lancé sur une intuition.

---

# Ce qui attend une action hors code

Ces trois points ne sont pas des décisions à prendre mais des démarches à faire. Elles bloquent
chacune une ou plusieurs fiches, et aucune ne peut être faite depuis l'éditeur.

| Action                             | Ce qu'elle débloque                                                                                                                                                                                      |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Acheter le nom de domaine**      | `SEO-01` — les URL canoniques pointent vers `www.didactica-oujda.ma`, qui n'existe pas encore. `robots.txt` reste par ailleurs sans effet tant que le site est servi depuis une GitHub Pages « projet ». |
| **Créer la fiche Google Business** | `SEO-06`, et par ricochet les coordonnées GPS manquantes du JSON-LD (`SEO-02`)                                                                                                                           |
| **Ouvrir Search Console**          | `SEO-06`, puis `SEO-07` ([D7](#d7--mesure-daudience--umami-par-défaut)) et `SEO-08` ([D12](#d12--version-allemande-ou-arabe))                                                                            |

Le jour de l'achat du domaine, `SEO-01` décrit la marche à suivre en trois étapes — dont la
création du fichier `CNAME`, **volontairement omise jusque-là** : le poser avant que le DNS ne
résolve couperait le site actuellement en ligne.
