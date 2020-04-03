from konlpy.tag import Okt
from tensorflow.keras.preprocessing.text import Tokenizer

okt = Okt()
text = '단어가 잘 나누어 지나 단어는 단어다 잘 나뉘냐 확인 화긴 확인해 봅시다ㅎㅎ'
words = okt.morphs(text)

# 토큰화 된 단어에 정수 인덱싱
tokenizer = Tokenizer()
tokenizer.fit_on_texts(words)
indexing = tokenizer.word_index

# 정수 인코딩
sequences = tokenizer.texts_to_sequences(words)

result = sum(sequences, [])
result.insert(0, 0)
result.append(-1)

while len(result) <= 30:
    result.append(-2)

print(result)