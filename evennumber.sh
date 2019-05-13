#!/bin/bash -x
# 偶数の和を返す
set -ue

MAX_NUM=${1:?usage: $(basename $0) max_number}
TOTAL_NUM=0
NUM=2
if [ $MAX_NUM -le 1 ];then
    echo "Total:0"
    exit 0
fi

while [ $NUM -le $MAX_NUM ]; do
    TOTAL_NUM=$(( TOTAL_NUM + NUM ))
    NUM=$(( NUM+2 ))
    echo $NUM
done

echo "Total:${TOTAL_NUM}"

exit 0