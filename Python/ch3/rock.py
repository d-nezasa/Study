# ジャンケンを行う処理
# 

# 前処理
import random

winner = ''

# コンピュータの手を決定
random_choice = random.randint(0, 2)

if random_choice == 0:
    computer_choice = 'rock'
elif random_choice == 1:
    computer_choice = 'paper'
else:
    computer_choice = 'scissors'

# ユーザーの手を入力
user_choice = ''
while (user_choice != 'rock' and
    user_choice != 'paper' and
    user_choice != 'scissors'):
    user_choice = input('rock, paper or scissors? :')

# あいことコンピュータの勝ちを判定。それ以外はユーザーの勝ち。
if computer_choice == user_choice:
    winner = 'Tie'
elif computer_choice == 'paper' and user_choice == 'rock':
    winner = 'Computer'
elif computer_choice == 'rock' and user_choice == 'scissors':
    winner = 'Computer'
elif computer_choice == 'scissors' and user_choice == 'paper':
    winner = 'Computer'
else:
    winner = 'User'

# 結果表示
if winner == 'Tie':
    print('We both chose', computer_choice + ', play agein.')
else:
    print(winner, 'won. The computer chose', computer_choice + '.')
    
      
