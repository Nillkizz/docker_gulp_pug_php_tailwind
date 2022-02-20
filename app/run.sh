SCRIPT=$1

if [ $(expr length "$(cat ./package.json | jq ".scripts" | jq "keys" | grep "\"$SCRIPT\",")") -eq 0 ]
then
  echo "\033[1;31m" "Script \"$SCRIPT\" not found in package.json"
  exit
fi

yarn install

if [ $IS_PROD -eq 1 ]
then
  echo "\033[1;33m" "Is prod"
  IS_DEV=false
else
  echo "\033[1;33m" "Is dev"
  IS_DEV=true
fi
sed -i "s/\(const isDev = \)\(true\|false\)/\1$IS_DEV/" config.js


echo "\033[1;32m" "Runned" "\033[0;32m" "\"$SCRIPT\""
sh -c "npm run $SCRIPT"