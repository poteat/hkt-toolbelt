#!/bin/bash

prompt_file=$1
content_file=$2

# Run resolve-template.sh with two inputs
resolved_template=$(./prompts/scripts/resolve-template.sh "./prompts/$prompt_file.md" "$content_file")

# Copy the resolved template to the clipboard
echo -n "$resolved_template" | xclip -selection clipboard

# Generate ChatGPT response
chatgpt_response=$(echo "$resolved_template" | ./prompts/chatgpt/index.sh)

echo "$chatgpt_response"

# Extract out the first code block contents
extracted_code=$(echo "$chatgpt_response" | ./prompts/scripts/extract-code-block.sh)

# Overwrite the original content_file path
echo "$extracted_code" > "$content_file"
