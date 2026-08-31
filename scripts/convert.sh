#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: ./convert.sh <path_to_markdown_file.md>"
  exit 1
fi

# Get the directory of this script
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Run the node script
node "$DIR/convert.js" "$1"
