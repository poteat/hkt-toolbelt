#!/bin/bash

prompt_file=$1
content_file=$2

# Run resolve-template.sh with two inputs
resolved_template=$(./prompts/scripts/resolve-template.sh "./prompts/$prompt_file.md" "$content_file")

# Generate ChatGPT response
chatgpt_response=$(echo "$resolved_template" | ./prompts/chatgpt/index.sh)

# Extract out the first code block contents
extracted_code=$(echo "$chatgpt_response" | ./prompts/scripts/extract-code-block.sh)

# Output to standard out
echo "$extracted_code"
