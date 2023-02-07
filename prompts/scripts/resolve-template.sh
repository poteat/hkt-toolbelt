#!/bin/bash

prompt_template="$1"
content_file="$2"

# Read contents of prompt_template
prompt_template=$(<"$prompt_template")

# Read contents of content_file
content=$(<"$content_file")

# Replace <FILE_CONTENTS> with contents of content_file
result="${prompt_template//'<FILE_CONTENTS>'/$'\n'$content}"

# Print result to stdout
echo "$result"

# Copy result to clipboard
echo "$result" | pbcopy
