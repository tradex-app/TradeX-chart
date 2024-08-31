#!/bin/bash

delete_folder() {
  local folder="$1"
  if [ -d "$folder" ]; then
    rm -rf "$folder"
    echo "Deleted: $folder"
  else
    echo "Folder not found: $folder"
  fi
}

folders_to_delete=(".next" "node_modules")

for folder in "${folders_to_delete[@]}"; do
  delete_folder "$folder"
done
