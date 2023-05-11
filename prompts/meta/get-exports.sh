abs_path=$(realpath "$@")

(cd prompts/meta && node --no-warnings --loader ts-node/esm get-exports.ts "$abs_path")
