#!/usr/bin/bash

userid=mysql_user
userpasswd=mysql_pass
outputfile=/tmp/get_database_info.txt
outputcsv=/tmp/dblist.csv
tmp_dblist=$(mktemp dblist.tmp_XXXX)
tmp_tablelist=$(mktemp tablelist.tmp_XXXX)

cat /dev/null > $outputfile
cat /dev/null > $outputcsv

trap "rm -f ${tmp_dblist} && rm -f ${tmp_tablelist}" 0 1 2 3 4 5 6 7 8 9 11 15

## get database list

mysql -u${userid} -p${userpasswd} << EOF > $tmp_dblist
show databases;
exit
EOF

## get table list

for i in $( cat $tmp_dblist|grep -v Database |grep -v _schema |grep -v mysql |grep -v sys ); do
      
    mysql -u${userid} -p${userpasswd} << EOF > $tmp_tablelist
show tables from ${i};
exit
EOF

    sed s/^/${i}\./g $tmp_tablelist | grep -v "Tables_in_" >> $outputfile

done

## add count
for i in $( cat $outputfile ) ;do
    echo -n "$i," >> $outputcsv
    mysql -N -u${userid} -p${userpasswd} << EOF >> $outputcsv
select count(*) from $i ;
exit
EOF

done    

exit 0

