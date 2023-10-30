#!/bin/bash

# Kopiowanie skompilowanych plików css z folderu ./src do wyjściowego dist/.top

source_dir="src"
destination_dir="dist/.top"

for dir in $source_dir/*; do
  src_folder="$dir"
  dest_folder="$destination_dir/$(basename "$dir")/css"
  mkdir -p "$dest_folder"
  cp -r "$src_folder/scss/css" "$dest_folder"
done

# Kopiowanie zawartości folderu ogólnego do folderów z zawartością do przeglądarek

cd "$destination_dir"

cp -r * "../chrome/"
cp -r * "../mozilla/"

cd ..

echo "Done!"
