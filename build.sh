#!/bin/bash
# Assembles the deployable site into dist/ — just a copy, nothing is compiled.
# Run this before deploying, then deploy (or drag) the dist/ folder.
set -e
cd "$(dirname "$0")"
rm -rf dist && mkdir -p dist
cp index.html work.html about.html contact.html dist/
cp -R assets dist/
for f in robots.txt sitemap.xml _headers _redirects; do [ -f "$f" ] && cp "$f" dist/; done
echo "dist/ ready — $(du -sh dist | cut -f1)"
