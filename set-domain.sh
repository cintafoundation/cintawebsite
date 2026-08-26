#!/bin/sh
# Point the built site at its real domain.
#
#   ./set-domain.sh cintafoundation.org
#
# Rewrites DOMAIN_PLACEHOLDER in dist/ (canonical, og:url, og:image, JSON-LD,
# robots.txt, sitemap.xml). Equivalent to rebuilding with:
#   node build/build.mjs --domain=cintafoundation.org
set -eu

if [ $# -ne 1 ]; then
  echo "usage: $0 <domain>   e.g. $0 cintafoundation.org" >&2
  exit 1
fi

DOMAIN=$1
case "$DOMAIN" in
  http*|*/*) echo "give a bare hostname, no scheme or path" >&2; exit 1 ;;
esac

[ -d dist ] || { echo "dist/ not found — run: node build/build.mjs" >&2; exit 1; }

COUNT=$(grep -rl DOMAIN_PLACEHOLDER dist | wc -l | tr -d ' ')
grep -rl DOMAIN_PLACEHOLDER dist | while read -r f; do
  sed -i '' "s/DOMAIN_PLACEHOLDER/$DOMAIN/g" "$f" 2>/dev/null \
    || sed -i "s/DOMAIN_PLACEHOLDER/$DOMAIN/g" "$f"
done

echo "rewrote $COUNT files to https://$DOMAIN"
REMAIN=$(grep -rl DOMAIN_PLACEHOLDER dist 2>/dev/null | wc -l | tr -d ' ')
[ "$REMAIN" = "0" ] && echo "no placeholders left" || { echo "still placeholders in $REMAIN files" >&2; exit 1; }
