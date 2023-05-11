#!/bin/bash

prompt_file=$1
content_file=$2

# Get list of exported items
exported_items=$(./prompts/meta/get-exports.sh "$content_file")

# For each exported item, resolve the template
for item in $exported_items
do
  # Run resolve-template.sh with two inputs
  resolved_template=$(./prompts/scripts/resolve-template.sh "./prompts/$prompt_file.md" "$content_file" "$item")

  # Copy the resolved template to the clipboard
  echo -n "$resolved_template" | xclip -selection clipboard

  # Generate ChatGPT response
  chatgpt_response=$(echo "$resolved_template" | ./prompts/meta/chat.sh)

  echo "$chatgpt_response"

  # Extract out the first code block contents
  extracted_code=$(echo "$chatgpt_response" | ./prompts/scripts/extract-code-block.sh)

  # Overwrite the original content_file path
  echo "$extracted_code" | ./prompts/meta/write-jsdoc.sh "$content_file" "$item"
done
