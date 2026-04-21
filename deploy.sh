#!/bin/bash
cd "c:/Users/c.andreotti/OneDrive - Accenture/lead scoring prototipo"
git config user.email "deploy@example.com"
git config user.name "GitHub Copilot"
git add .
git commit -m "Initial commit: RailConnect B2B lead scoring tool"
git branch -M main
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/hfold/lead_scoring_ti.git
git push -u origin main --force
