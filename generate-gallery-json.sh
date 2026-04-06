#!/bin/bash

# Generate gallery JSON from webp filenames
# Usage: ./generate-gallery-json.sh [output_file]

OUTPUT_FILE="${1:-gallery-images.json}"
BASE_DIR="src/assets"

generate_label() {
  local filename="$1"
  local is_prod="${2:-true}"

  # Remove extension
  local name="${filename%.webp}"

  # Split by "-"
  IFS='-' read -ra parts <<< "$name"

  # In prod mode, drop the last part (duplicate counter/hash)
  if [ "$is_prod" = true ]; then
    parts=("${parts[@]:0:${#parts[@]}-1}")
  fi

  # Join with "-"
  local clean_name
  clean_name=$(IFS='-'; echo "${parts[*]}")

  # Replace "- " with " ", then " , " with ", "
  local with_spaces="${clean_name//-/ }"
  with_spaces="${with_spaces//  / }"
  with_spaces="${with_spaces// , /, }"

  # Capitalize first letter
  local first_char="${with_spaces:0:1}"
  local rest="${with_spaces:1}"
  echo "${first_char^^}${rest}"
}

# Function to process a directory
process_dir() {
  local dir="$1"
  local full_dir="src/assets/$dir"

  if [ -d "$full_dir" ]; then
    for filepath in "$full_dir"/*.webp; do
      if [ -f "$filepath" ]; then
        local filename=$(basename "$filepath")
        local label=$(generate_label "$filename" true)
        local src="@/assets/${dir}/${filename}"
        printf '  {\n    "label": "%s",\n    "src": "%s"\n  }' "$label" "$src"
        echo ","
      fi
    done
  fi
}

# Start JSON array
echo "[" > "$OUTPUT_FILE"

# Process BRASSERIE_WEBP first, then NORMAL_WEBP
process_dir "BRASSERIE_WEBP" >> "$OUTPUT_FILE"
process_dir "NORMAL_WEBP" >> "$OUTPUT_FILE"

# Remove trailing comma and close array
# Read entire file, remove last comma before closing bracket
content=$(cat "$OUTPUT_FILE")
# Remove trailing comma on last item
content="${content%,}"
echo "${content}" > "$OUTPUT_FILE"
echo "]" >> "$OUTPUT_FILE"

echo "Written to $OUTPUT_FILE"
