echo "nikhom" | sudo chmod -R 777 build
rm build/logo192.png
rm build/logo512.png
rm build/favicon.ico
cp logo192.png build
cp logo512.png build
cp favicon.ico build
mv build pos
scp -r pos nikhom@varaporn.net:~/Documents/Homework4/v3res/client