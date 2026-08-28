# Didactica — site vitrine

Site de **Didactica**, école de langue allemande à Oujda (Maroc) : cours, préparation aux
examens Goethe et traduction. Le site présente l'école, ses formations et ses tarifs, et
oriente les visiteurs vers une prise de contact par WhatsApp.

**En ligne** : <https://hicham-o-sfh.github.io/Didactica/>
Un nom de domaine (`www.didactica-oujda.ma`) est prévu mais **pas encore acheté** ; il est
déjà inscrit dans `sitemap.xml`, `robots.txt` et les balises canoniques des pages.

---

## Ce que c'est, techniquement

Un site **statique**, sans build ni dépendances à installer : on ouvre les fichiers, on les
modifie, on les pousse. Les bibliothèques tierces sont versionnées dans `assets/`, pas
téléchargées depuis un CDN.

| Composant    | Version |
| ------------ | ------- |
| Bootstrap    | 5       |
| jQuery       | 3.7.1   |
| Owl Carousel | 2       |
| WOW.js       | 1.1     |
| Font Awesome | 6       |

### Arborescence

```
.
├── index.html                        Accueil
├── a-propos.html                     Présentation de l'école
├── tarifs-et-prix.html               Formations et tarifs
├── faq.html                          Questions fréquentes
├── contactez-nous.html               Coordonnées et formulaire
├── politique-de-confidentialite.html Mentions RGPD / loi 09-08
├── 404.html                          Page d'erreur (servie par GitHub Pages)
├── robots.txt, sitemap.xml           Référencement
└── assets/
    ├── css/    style.css (feuille du site) + bibliothèques minifiées
    ├── js/     main.js (code du site) + bibliothèques minifiées
    ├── fonts/  Font Awesome
    └── img/    images, classées par section
```

Le seul fichier JavaScript à maintenir est **`assets/js/main.js`** (~280 lignes) : menus,
carrousels, et la construction des trois messages WhatsApp pré-remplis. Tout le reste
d'`assets/js/` est tiers et minifié.

---

## Prévisualiser en local

Ouvrir les pages en `file://` **ne fonctionne pas correctement** : les chemins et le
`lazy loading` des images s'en trouvent faussés. Il faut un serveur local.

La façon la plus simple, dans VSCode : l'extension **Live Server** (`ritwickdey.LiveServer`),
puis clic droit sur `index.html` → _Open with Live Server_.

Sans VSCode, n'importe quel serveur statique fait l'affaire depuis la racine du dépôt :

```bash
python -m http.server 8000
```

---

## Déploiement

Le site est publié par **GitHub Pages** depuis la branche `master`, à la racine du dépôt.
Il n'y a ni étape de compilation ni action CI : **pousser sur `master` met le site en ligne**,
en général en moins d'une minute.

Conséquence à garder en tête : une page cassée poussée est une page cassée en production.
D'où la règle de prévisualiser avant de pousser.

---

## Où modifier les informations de contact

Elles sont **répétées en dur dans les pages**, faute d'un système de gabarits — c'est la
limite principale du site en l'état, et l'objet de la migration prévue dans `TODO.md`
(`ARCH-01`). Changer un numéro demande donc de passer partout.

| Information              | Valeur actuelle              | Où                                                             |
| ------------------------ | ---------------------------- | -------------------------------------------------------------- |
| Téléphone                | `+212 666 201 740`           | 18 liens `tel:` répartis sur les 7 pages                       |
| E-mail                   | `Didactica.Oujda@gmail.com`  | 15 liens `mailto:` répartis sur les 7 pages                    |
| WhatsApp (liens directs) | `wa.me/212666201740`         | `index.html`, `a-propos.html`, `contactez-nous.html`           |
| WhatsApp (formulaires)   | `212666201740`               | **`assets/js/main.js`, constante `CONTACT`** — un seul endroit |
| Adresse                  | Bd. Mohammed VI, Oujda       | Pied de page des 7 pages, et blocs JSON-LD                     |
| Réseaux sociaux          | Facebook, Instagram, YouTube | Pied de page des 7 pages                                       |

Quatre pages (`index`, `a-propos`, `faq`, `contactez-nous`) portent en plus un bloc **JSON-LD** `<script type="application/ld+json">` qui redit ces coordonnées pour
les moteurs de recherche : **le mettre à jour en même temps**, sous peine d'afficher un
ancien numéro dans Google.

Le pied de page est **identique octet à octet sur les 7 pages** : une recherche-remplacement
sur l'ensemble du dépôt est fiable pour ces valeurs-là.

---

## Formatage du code

Le dépôt est formaté avec **Prettier**, configuré par `.prettierrc` (80 colonnes, 2 espaces).

⚠️ Utiliser **Prettier 3.7.4**, la version embarquée par l'extension VSCode
`esbenp.prettier-vscode`. Une version plus récente installée via npm produirait un diff
différent sur l'ensemble des pages.

`.prettierignore` exclut volontairement :

- les bibliothèques minifiées (`*.min.css`, `*.min.js`) ;
- `assets/css/style.css`, gardée compactée.

Le `.vscode/settings.json` du dépôt route HTML, CSS, JS et JSON vers Prettier. Sans lui,
le formateur natif de VSCode reformaterait les pages dans un autre style et rendrait les
diffs illisibles. Après un clone, **recharger la fenêtre VSCode** pour qu'il prenne effet.

---

## Feuille de route

L'état du projet, les tâches en cours et les décisions en attente sont tenus à jour dans
**[`TODO.md`](TODO.md)**. Chaque fiche y est autonome : contexte, fichiers concernés, étapes
et critère de fin.

---

## Licence et contenu

Le contenu (textes, images, marque Didactica) appartient à l'école. Le gabarit HTML d'origine
et les bibliothèques tierces contenues dans `assets/` restent soumis à leurs licences
respectives.
