#!/bin/bash

# Deploy script for website
# (deployment technique taken from
#  https://github.com/philipwalton/solved-by-flexbox)

# Exit if any subcommand fails.
set -e

# Create a tempory directory and
# checkout the existing gh-pages branch.
rm -rf _tmp
mkdir _tmp
cd _tmp
git init
git remote add origin https://github.com/saadatm/navees.git
git pull origin gh-pages

# Delete all the existing files and add
# the new ones from the build directory.
rm -rf ./*
cp -r ../build/* ./
git add -A

# Commit and push the changes to
# the gh-pages branch.
git commit -m "Deploy website"
git branch -m gh-pages
git push origin gh-pages

# Clean up.
cd ..
rm -rf _tmp
