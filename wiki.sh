# Remove all previous files from ../hkt-toolbelt.wiki, excluding .git
find ../hkt-toolbelt.wiki -mindepth 1 -not -path "*/.git*" -delete

# Run typedoc, emitting wiki markdown into the ../hkt-toolbelt.wiki folder
NODE_OPTIONS=--max-old-space-size=8192 ./node_modules/.bin/typedoc

# Commit and push changes to the wiki
cd ../hkt-toolbelt.wiki
git add .
git commit -m "Update wiki"
git push
