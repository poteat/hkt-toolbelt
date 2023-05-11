#!/bin/bash

prompt_file=$1
content_file=$2
item_name=$3

# Run resolve-template.sh with two inputs
resolved_template=$(./prompts/scripts/resolve-template.sh "./prompts/$prompt_file.md" "$content_file" "$item_name")

echo -n "$resolved_template" | xclip -selection clipboard
