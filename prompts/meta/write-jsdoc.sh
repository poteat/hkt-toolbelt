abs_path=$(realpath "$1")
item_name="$2"

(cd prompts/meta && node --no-warnings --loader ts-node/esm write-jsdoc.ts "$abs_path" "$item_name")
