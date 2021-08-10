if [ $# != 2 ]; then
    echo  "Usage: Vts  [ts|html]  dir"
    exit 1
fi

if [ ! -d $2 ]; then
    echo  "$2: dirpath not exist"
    exit 1

fi

if [ $1 = "ts" ]; then
  list=`find  $2 -type f \( -name \*.ts  \)   | grep  -v "spec" `

elif  [ $1 = "html" ]; then
  list=`find  $2 -type f \( -name \*.html  \)  `
fi

if [ -z $list ]; then
  echo list empty
  exit 1

fi

echo $list

nvim -p $list

