#!/usr/bin/env bash
set -e

# ============================================
# REACT DEPLOY TO GITHUB PAGES (ukhona branch)
# Run from inside my-app/
# ============================================

read -p "GitHub username: " GH_USER
read -p "Repository name: " GH_REPO
read -s -p "GitHub Personal Access Token: " GH_TOKEN
echo

# ---- build the react app ----
echo ">> Building React app..."
npm run build

# ---- go into the dist output ----
cd dist

# ---- init a fresh git repo in dist ----
git init
git checkout -B ukhona

# ---- commit the built files ----
git add -A
git commit -m "deploy react app"

# ---- push to ukhona branch (force) ----
git remote add origin "https://$GH_USER:$GH_TOKEN@github.com/$GH_USER/$GH_REPO.git"
git push -f origin ukhona

cd ..

echo
echo "======================================"
echo "LIVE (may take ~30s):"
echo "https://$GH_USER.github.io/$GH_REPO/"
echo "======================================"