# Encyclopédie historique d’Haïti

Version de travail (brouillon). Les fiches ne sont pas encore vérifiées sur sources.

## Structure
Tous les fichiers sont à la racine du dépôt :
- `index.html`, `style.css`, `app.js` : le site (grille périodes × thèmes, ambiances animées, fiches pas à pas, français et créole).
- `data-index.json` : périodes, thèmes, émotions, détails à retenir (drapeaux, noms), textes de l’interface, liste des fiches.
- `fiche-*.json` : une fiche par fichier.

## Ajouter une fiche
1. Copier un fichier `fiche-*.json` et le renommer (par exemple `fiche-mon-sujet.json`).
2. Remplir : `id`, `title`, `cell` (période, thème : numéros à partir de 0), `rel` (cases liées), `bref`, `steps`, `unk`, `src`.
3. Ajouter le nom du fichier, sans `fiche-` ni `.json` (ici `mon-sujet`), dans la liste `fiches` de `data-index.json`.
4. Envoyer sur GitHub : la fiche apparaît dans la grille.

Chaque étape d’une fiche suit ce format : `[titre, texte, [statuts], origine]`.
Statuts : 0 Établi, 1 Interprété, 2 Contesté, 3 Peu documenté, 4 À sourcer.

## Règles éditoriales
Voir le modèle de fiche (V1.2) : provenance et indépendance des sources, sources haïtiennes en priorité, aucun fait validé sans contrôle sur source.

## Mise en ligne
Réglages du dépôt, rubrique Pages : déployer depuis la branche `main`, dossier racine.
