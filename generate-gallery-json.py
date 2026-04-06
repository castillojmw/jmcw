#!/usr/bin/env python3
import json
import os
import sys

def generate_label(filename, is_prod=True):
    # Remove extension
    name = filename.replace('.webp', '')

    # Split by "-"
    parts = name.split('-')

    # In prod mode, drop the last part ONLY if it's a pure number (duplicate counter)
    if is_prod and len(parts) > 1 and parts[-1].isdigit():
        parts = parts[:-1]

    # Join with "-"
    clean_name = '-'.join(parts)

    # Replace "- " with " ", then " , " with ", "
    with_spaces = clean_name.replace('-', ' ')
    with_spaces = with_spaces.replace('  ', ' ')
    with_spaces = with_spaces.replace(' , ', ', ')

    # Capitalize first letter
    return with_spaces[0].upper() + with_spaces[1:] if with_spaces else ''

def process_dir(dir_name):
    items = []
    full_dir = f'src/assets/{dir_name}'

    if os.path.isdir(full_dir):
        for filepath in sorted(os.listdir(full_dir)):
            if filepath.endswith('.webp'):
                label = generate_label(filepath, True)
                src = f'@/assets/{dir_name}/{filepath}'
                category = 'brasserie' if dir_name == 'BRASSERIE_WEBP' else 'normal'
                items.append({'label': label, 'src': src, 'category': category})

    return items

def main():
    output_file = sys.argv[1] if len(sys.argv) > 1 else 'gallery-images.json'

    items = []
    items.extend(process_dir('BRASSERIE_WEBP'))
    items.extend(process_dir('NORMAL_WEBP'))

    with open(output_file, 'w') as f:
        json.dump(items, f, indent=2)

    print(f'Written {len(items)} images to {output_file}')

if __name__ == '__main__':
    main()
