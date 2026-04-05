#!/bin/bash

# Create output directory
mkdir -p converted_images

# Initialize counter
count=1

# Enable case-insensitive matching
shopt -s nocaseglob

for file in *.{jpg,jpeg,png,heic}; do
    # Skip if no matching files found or if it's a directory
    [[ -e "$file" ]] || continue
    [[ -d "$file" ]] && continue

    echo "Compressing $file to $count.jpg..."

    # ffmpeg JPG compression:
    # -q:v 2 to 31 (2 is best quality/largest, 31 is worst/smallest)
    # A value of 5-8 is usually the "sweet spot" for web optimization
    ffmpeg -i "$file" -q:v 5 "converted_images/$count.jpg" -loglevel error

    if [ $? -eq 0 ]; then
        echo "✅ Created $count.jpg"
    else
        echo "❌ Failed to process $file"
    fi

    ((count++))
done

echo "---------------------------------------"
echo "Done! Check the 'converted_images' folder."