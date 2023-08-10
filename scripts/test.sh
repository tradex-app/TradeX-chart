#bash
FILE="/home/vivek/lighttpd.tar.gz"
basename "$FILE"
f="$(basename -- $FILE)"
echo "$f"
