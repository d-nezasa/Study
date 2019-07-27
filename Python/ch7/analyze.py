""" analyzeモジュールはフレッシュ−キンケイドスコアを使ってテキストを分析し、
    読みやすさを計算する。そして、そのスコアを学年に基づいた分類に変換する。
"""

def count_syllables(words):
    """ 単語リストを取り、リスト内の全単語の音節の総数を返す。
    """
    count = 0

    for word in words:
        word_count = count_syllables_in_word(word)
        count = count + word_count
    
    return count

def count_syllables_in_word(word):
    """ 文字列形式の単語を取り、音節数を返す。なお、この関数は
        ヒューリスティックで、100%正解ではない。
    """

    count = 0

    endings = '.,;:!?'
    last_char = word[-1]
    if last_char in endings:
        processed_word = word[0:-1]
    else:
        processed_word = word

    if len(processed_word) <= 3:
        return 1
    
    if processed_word[-1] in 'eE':
        processed_word = processed_word[0:-1]

    vowels = "aeiouAEIOU"
    prev_char_was_vowel = False

    for char in processed_word:
        if char in vowels:
            if not prev_char_was_vowel:
                count = count + 1
            prev_char_was_vowel = True
        else:
            prev_char_was_vowel = False
    
    if processed_word[-1] in 'yY':
        count = count + 1

    return count

def count_sentence(text):
    """ 終端の句読記号として、ピリオド、セミコロン、疑問符、感嘆符
        を使って文の数を数える
    """ 
    count = 0

    terminals = '.;?!'

    for char in text:
        if char in terminals:
            count = count + 1

    return count

def output_results(score):
    """ フレッシュ−キンケイドスコアを取り、そのスコアに相当する読解レベルを出力する。
    """
    if score >= 90:
        print('Reading level of 5th Grade')
    elif score >= 80:
        print('Reading level of 6th Grade')
    elif score >= 70:
        print('Reading level of 7th Grade')
    elif score >= 60:
        print('Reading level of 8-9th Grade')
    elif score >= 50:
        print('Reading level of 10-12th Grade')
    elif score >= 30:
        print('Reading level of College Student')
    else:
        print('Reading level of Cellege Graduate')

def compute_readability(text):
    """ 任意の長さのテキスト文字列を取り、学年に基づいた読みやすさスコアを出力する。
    """
    total_words = 0
    total_sentences = 0
    total_syllables = 0
    score = 0

    words = text.split()
    total_words = len(words)
    total_sentences = count_sentence(text)
    total_syllables = count_syllables(words)

    score = (206.835
            - 1.015 * (total_words / total_sentences)
            - 84.6 * (total_syllables / total_words))

#    print(total_words, 'words')
#    print(total_sentences, 'sentences')
#    print(total_syllables, 'syllablies')
#    print(score, 'reading ease score')
    output_results(score)

if __name__ == "__main__":
    import ch1text
    print('Chapter1 Text:')
    compute_readability(ch1text.text)
