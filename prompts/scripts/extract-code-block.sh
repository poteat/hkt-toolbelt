#!/bin/bash

input=$(cat)

# Initialize variables
block_started=false
output=""

# Read the input line by line
while IFS= read -r line; do
  if [[ $block_started == false ]]; then
    # Check for the start of a markdown code block
    if echo "$line" | grep -q '^```'; then
      block_started=true
    fi
  else
    # Check for the end of the markdown code block
    if echo "$line" | grep -q '^```'; then
      break
    fi
    # Extract content inside the code block
    output+="$line"$'\n'
  fi
done <<< "$input"

echo "$output"
