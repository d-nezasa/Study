def recursive_compute_sum(lists):
    if len(lists) == 0:
        return 0
    else:
        first = lists[0]
        rest = lists[1:]
        sums = first + recursive_compute_sum(rest)
        return sums

marbles = [10, 13, 39, 14, 41, 9, 3]
sums = recursive_compute_sum(marbles)
print('The total is', sums)
