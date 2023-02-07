#!/bin/bash

# Read the stdin into a string variable
input=$(cat)

# Extract the contents of the first markdown code block
output=$(echo "$input" | sed -n '/```/,/```/{/```/d;p;}')

# Output the extracted code block to stdout
echo "$output"
