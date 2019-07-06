def get_attribute(query, default):
    question = query + '[' + default + ']? '
    answer = input(question)
    if answer == '':
        answer = default
    print('You chose', answer)
    return answer

hair = get_attribute('What hair color', 'brown')
hair_length = get_attribute('What hair length', 'short')
eyes = get_attribute('What eye color', 'blue')
gender = get_attribute('What gender', 'female')
has_glasses = get_attribute('Has glasses', 'no')
has_beard = get_attribute('Has beard', 'no')
