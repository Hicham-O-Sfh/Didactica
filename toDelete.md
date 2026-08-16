# Images non utilisées — à supprimer plus tard

> **Ne rien supprimer sur la base de ce fichier sans le régénérer d'abord.**
> Une image listée ici peut avoir été réutilisée depuis.

Généré le 16/08/2026. Voir `PERF-02` dans [TODO.md](TODO.md).

## Résumé

| Indicateur | Valeur |
| --- | --- |
| Images dans `assets/img/` | 115 |
| Référencées | 51 |
| **Non référencées** | **64** |
| Poids récupérable | **3.9 Mo** |
| Poids de `assets/img/` après | 3.9 Mo |

## Méthode

Une image est considérée utilisée si son chemin (`assets/img/…` ou `img/…`) apparaît
dans un `.html`, `.css`, `.js`, `.xml` ou `.txt` du dépôt. Cela couvre les `src`,
les `url()` CSS et les URL absolues des balises Open Graph.

Vérifié par ailleurs : le site ne construit **aucun** chemin d'image dynamiquement.
Le seul mécanisme de ce type, `data-background` dans `main.js`, est du code mort
(voir `PERF-05`) et plus aucun attribut `data-background` n'existe dans le HTML.

## Liste par dossier

### `assets/img/alumni/` — 1 fichier(s), 53 Ko

```
assets/img/alumni/01.jpg                                 53 Ko
```

### `assets/img/blog/` — 10 fichier(s), 377 Ko

```
assets/img/blog/01.jpg                                   54 Ko
assets/img/blog/02.jpg                                  118 Ko
assets/img/blog/03.jpg                                   83 Ko
assets/img/blog/bs-1.jpg                                  5 Ko
assets/img/blog/bs-2.jpg                                  4 Ko
assets/img/blog/bs-3.jpg                                  4 Ko
assets/img/blog/com-1.jpg                                 7 Ko
assets/img/blog/com-2.jpg                                 7 Ko
assets/img/blog/com-3.jpg                                 6 Ko
assets/img/blog/single.jpg                               89 Ko
```

### `assets/img/campus-life/` — 1 fichier(s), 52 Ko

```
assets/img/campus-life/01.jpg                            52 Ko
```

### `assets/img/campus-tour/` — 1 fichier(s), 76 Ko

```
assets/img/campus-tour/01.jpg                            76 Ko
```

### `assets/img/club/` — 2 fichier(s), 159 Ko

```
assets/img/club/06.jpg                                   79 Ko
assets/img/club/single.jpg                               80 Ko
```

### `assets/img/course/` — 8 fichier(s), 384 Ko

```
assets/img/course/01.jpg                                 46 Ko
assets/img/course/02.jpg                                 59 Ko
assets/img/course/03.jpg                                 45 Ko
assets/img/course/04.jpg                                 42 Ko
assets/img/course/05.jpg                                 50 Ko
assets/img/course/06.jpg                                 42 Ko
assets/img/course/single.jpg                             91 Ko
assets/img/course/teacher.jpg                             9 Ko
```

### `assets/img/department/` — 2 fichier(s), 178 Ko

```
assets/img/department/02.jpg                             72 Ko
assets/img/department/single.jpg                        107 Ko
```

### `assets/img/event/` — 7 fichier(s), 403 Ko

```
assets/img/event/02.jpg                                  57 Ko
assets/img/event/03.jpg                                  64 Ko
assets/img/event/04.jpg                                  57 Ko
assets/img/event/05.jpg                                  70 Ko
assets/img/event/06.jpg                                  66 Ko
assets/img/event/author.jpg                               8 Ko
assets/img/event/single.jpg                              81 Ko
```

### `assets/img/icon/` — 11 fichier(s), 47 Ko

```
assets/img/icon/acting.svg                                7 Ko
assets/img/icon/course-material.svg                       2 Ko
assets/img/icon/course.svg                                7 Ko
assets/img/icon/global-education.svg                      2 Ko
assets/img/icon/graduation.svg                            2 Ko
assets/img/icon/human.svg                                 4 Ko
assets/img/icon/information.svg                           5 Ko
assets/img/icon/money.svg                                 4 Ko
assets/img/icon/online-course.svg                         3 Ko
assets/img/icon/scholarship-2.svg                         4 Ko
assets/img/icon/scholarship.svg                           7 Ko
```

### `assets/img/portfolio/` — 7 fichier(s), 483 Ko

```
assets/img/portfolio/01.jpg                              70 Ko
assets/img/portfolio/02.jpg                              62 Ko
assets/img/portfolio/03.jpg                              56 Ko
assets/img/portfolio/04.jpg                              59 Ko
assets/img/portfolio/05.jpg                              71 Ko
assets/img/portfolio/06.jpg                              71 Ko
assets/img/portfolio/single.jpg                          94 Ko
```

### `assets/img/research/` — 7 fichier(s), 518 Ko

```
assets/img/research/01.jpg                               87 Ko
assets/img/research/02.jpg                               57 Ko
assets/img/research/03.jpg                               80 Ko
assets/img/research/04.jpg                               66 Ko
assets/img/research/05.jpg                               75 Ko
assets/img/research/06.jpg                               56 Ko
assets/img/research/single.jpg                           96 Ko
```

### `assets/img/scholarship/` — 1 fichier(s), 226 Ko

```
assets/img/scholarship/01.jpg                           226 Ko
```

### `assets/img/slider/` — 1 fichier(s), 351 Ko

```
assets/img/slider/slider-3.jpg                          351 Ko
```

### `assets/img/team/` — 4 fichier(s), 329 Ko

```
assets/img/team/05.jpg                                   72 Ko
assets/img/team/06.jpg                                   92 Ko
assets/img/team/07.jpg                                  102 Ko
assets/img/team/08.jpg                                   63 Ko
```

### `assets/img/video/` — 1 fichier(s), 364 Ko

```
assets/img/video/01.jpg                                 364 Ko
```

## Dossiers qui deviendraient vides

```
assets/img/alumni
assets/img/campus-life
assets/img/campus-tour
assets/img/club
assets/img/course
assets/img/portfolio
assets/img/research
assets/img/scholarship
assets/img/video
```
