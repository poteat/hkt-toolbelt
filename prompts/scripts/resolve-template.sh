#!/bin/bash

prompt_template="$1"
content_file="$2"
item_name="$3"

# Spec file is optional and of the form <content_file>.spec.ts
new_extension=".spec.ts"
spec_file="${content_file%.*}$new_extension"

# Read contents of prompt_template
prompt_template=$(<"$prompt_template")

# Read contents of content_file
content=$(<"$content_file")

# Read contents of spec_file
spec=$(<"$spec_file")

# Replace <FILE_CONTENTS> with contents of content_file
result="${prompt_template//'<FILE_CONTENTS>'/$'\n'$content}"

# Replace <UNIT_TEST_CONTENTS> with contents of spec_file.
result="${result//'<UNIT_TEST_CONTENTS>'/$'\n'$spec}"

# Replace <ITEM_NAME> with item_name
result="${result//'<ITEM_NAME>'/$item_name}"

# Print result to stdout
echo "$result"
