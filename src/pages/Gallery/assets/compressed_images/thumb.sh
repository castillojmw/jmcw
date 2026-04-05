#!/bin/bash

mkdir -p thumbs

for file in [0-9]*.jpg; do
    [[ -e "$file" ]] || continue

    echo "High-res processing: $file..."

    # scale: Uses 1200px as the max dimension
    # flags=lanczos: The highest quality scaling algorithm in ffmpeg
    # unsharp: 3:3:1.0:3:3:0.0 adds a crisp edge without making it look "deep fried"
    ffmpeg -i "$file" \
    -vf "scale='if(gt(iw,ih),1200,-1)':'if(gt(iw,ih),-1,1200)':flags=lanczos,unsharp=3:3:1.0:3:3:0.0" \
    -q:v 3 \
    "thumbs/$file" -loglevel error

    if [ $? -eq 0 ]; then
        echo "✅ Created high-res $file"
    else
        echo "❌ Failed on $file"
    fi
done

echo "Done! Check the results now."