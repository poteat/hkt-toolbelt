#!/bin/bash

template=$1
files=$2
exclude=$3

for file in $files
do
  if [[ ! "$file" =~ .*"$exclude"$ ]]; then
    echo "Processing $file"
    ./prompt.sh $template $file
  fi
done
