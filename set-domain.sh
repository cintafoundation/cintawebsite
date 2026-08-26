#!/bin/sh
# Point the built site at its real domain.
#
#   ./set-domain.sh www.cintafoundation.org
#
# Rewrites DOMAIN_PLACEHOLDER in dist/ (canonical, og:url, og:image, JSON-LD,
# robots.txt, sitemap.xml). Equivalent to rebuilding with:
#   npm run build      (which hardcodes --domain=www.cintafoundation.org)
set -eu

if [ $# -ne 1 ]; then
  echo "usage: $0 <domain>   e.g. $0 www.cintafoundation.org" >&2
  exit 1
fi

DOMAIN=$1
case "$DOMAIN" in
  http*|*/*) echo "give a bare hostname, no scheme or path" >&2; exit 1 ;;
esac

[ -d dist ] || { echo "dist/ not found — run: node build/build.mjs" >&2; exit 1; }

COUNT=$(grep -rl DOMAIN_PLACEHOLDER dist 2>/dev/null | wc -l | tr -d ' ')

if [ "$COUNT" = "0" ]; then
  echo "nothing to do: dist/ has no DOMAIN_PLACEHOLDER left." >&2
  echo "This script only substitutes placeholders — it cannot change a domain" >&2
  echo "that is already baked in. To switch domains, rebuild from source:" >&2
  echo "  npm run build            # uses the domain pinned in package.json" >&2
  echo "  node build/build.mjs --domain=<host>" >&2
  CURRENT=$(grep -ho 'rel="canonical" href="https://[^/"]*' dist/index.html 2>/dev/null | head -1 | sed 's|.*https://||')
  [ -n "$CURRENT" ] && echo "dist/ is currently built for: $CURRENT" >&2
  exit 1
fi
grep -rl DOMAIN_PLACEHOLDER dist | while read -r f; do
  sed -i '' "s/DOMAIN_PLACEHOLDER/$DOMAIN/g" "$f" 2>/dev/null \
    || sed -i "s/DOMAIN_PLACEHOLDER/$DOMAIN/g" "$f"
done

echo "rewrote $COUNT files to https://$DOMAIN"
REMAIN=$(grep -rl DOMAIN_PLACEHOLDER dist 2>/dev/null | wc -l | tr -d ' ')
[ "$REMAIN" = "0" ] && echo "no placeholders left" || { echo "still placeholders in $REMAIN files" >&2; exit 1; }
