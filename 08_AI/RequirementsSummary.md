## 명세 정리

1 프로젝트 개요

머신러닝 방법들 중 신경망 네트워크(Neural Network), 그 중 인공지능이 다시 주목받게 만든 심층 신경망 네트워크(Deep Neural Network)를 사용하여 이미지 처리와 자연어 처리를 학습한다.

Sub PJT 2 - 이미지 모델로 특성을 뽑아내고 텍스트 모델에 전달하여 이미지를 묘사하는 텍스트를 생성한다.

Sub PJT 1에서 학습한 인공신경망을 확장시켜 이미지 데이터에 적합한 컨볼루션 신경망(Convolutional Neural Networks)과 순서가 있는 데이터에 적합한 순환 신경망(Recurrent Neural Networks)에 대해 학습하고 이 두 신경망을 합쳐 이미지 캡셔닝(Image Captioning) 모델을 구현한다.

이미지에서 물체의 형태를 인지하거나 색깔을 구별하는 등 특성을 뽑아내는 데에는 컨볼루션 신경망이 사용되며 뽑아낸 특성을 바탕으로 문장을 생성하는 역할은 순환 신경망이 담당한다.



2 프로젝트 목표

1) 컨볼루션 인공 신경망에 대한 이해 (이미지)

2) 순환 신경망에 대한 이해 (텍스트)

3) 이미지 캡셔닝 모델에 대한 이해

4) 데이터셋 분할과 성능 최적화에 대한 이해

5) 팀별 서비스 기획, 데이터셋 검색 및 모델 선정



3-1 기본 아키텍쳐

CNN 모델을 통해 이미지 특징 추출 -> RNN 모델로 전달 -> 추가로 토큰화 된 캡션 데이터(벡터)의 일부를 입력받음



3-2 프로젝트 구조

1) 전처리 과정

모델에 적합하게 데이터를 가공하는 것을 전처리 과정이라고 한다.

한 번만 시행해도 되는 전처리 : 캡션 데이터의 토큰화, 전체 데이터셋 분할 등

매번 시행해야 하는 전처리 : 불러온 데이터의 순서를 랜덤하게 섞는 과정, 배치 사이즈에 맞게 분할해 묶는 과정 등

전처리 과정은 사용하는 데이터셋, 모델, 학습 과정 디자인에 따라 추가 및 제외가 가능하니 프로젝트 진행 과정에서 고민해보아야 한다.

- 한 번만 시행해도 되는 부분

캡션들이 저장된 CSV 파일을 토대로 실제 이미지 경로와 이미지에 해당하는 토큰화 된 캡션을 묶고, 전체 데이터를 학습용 데이터 및 테스트용 데이터로 분할해 저장해 놓으면 추후 모델에 입력으로 전달할 때 유용하다. 이 과정에서어떤 단어가 토큰에 해당하는지 매핑 된 정보를 기록해놓은 토크나이저 또한 저장한다. 추가적으로 학습된 모델을 이용해 이미지의 특성을 뽑아 놓는 것도 가능하다.

- 매번 진행해야 하는 부분

학습하는지 또는 테스트를 진행하는지에 따라 다른 데이터셋을 불러오고, 생성된 토크나이저를 불러오는 과정도 여기에 포함된다. 또한 불러온 데이터셋에는 이미지 경로와 토큰화 된 캡션이 있기 때문에 실제 이미지 데이터와 토큰화 된 캡션을 바인딩해 텐서플로우 데이터셋으로 만들게 된다. 이 과정에서 랜덤성을 추가하기 위해 순서를 바꾸거나 뒤집는다던가 하는 Augmentation 을 많이 사용하기 때문에 매번 진행하게 된다. 테스트 시에는 순서 바꾸기와 Augmentation 이 들어가지 않도록 구현한다.



2) 학습 과정

전처리 과정을 통해 전달된 tf.data.Dataset에는 Encoder의 입력이 되는 이미지 데이터 또는 미리 뽑힌 특성 벡터와 토큰화된 캡션이 쌍으로 들어있다. 이것들은 Encoder에 들어가 Decoder의 입력 형식에 맞게 변환되어 나오며, Encoder 내부는 인공신경망을 통해 입력을 출력으로 변환시킨다.

Encoder의 결과값은 Decoder로 전달되며 이와 동시에 <start> 토큰의 인덱스가 Decoder로 전달된다. 그럼 Decoder는 순차적으로 이미지를 묘사하는 문장의 단어들을 생성한다. 이 때 토큰의 가지 수만큼의 길이를 가지는 벡터로 나온다. 이 결과값을 정답 캡션과 비교해 손실을 계산하고 이 손실을 기반으로 모델의 변수들을 학습하여 최적화가 진행되게 한다.



3) 테스트 과정

모델이 학습되고 나면 체크포인트 매니저를 이용해 학습된 Encoder와 Decoder의 변수들을 불러와 테스트 이미지에 대한 예측 캡션을 생성할 수 있다. 이미지의 캡션이 생성되는 과정까지는 학습과 동일하지만 결과 문장을 사람이 해석할 수 있게 바꿔주는 과정이 추가로 진행된다.





## RNN 기능/과제 목록

Req 2. 텍스트 데이터 전처리

2-1, 2-2,

Req 3. Dataset 생성 함수 구현

3-1, 

Req 5. 텍스트 모델(Decoder) 구현

5-1, 5-2, 5-3, 

Req 6, 7, 8은 합치고 마무리 과정? 둘 다 나눠서 해야 되는건가?





## 명세 3. 필수 지식 학습

1) 토큰화

자연어 처리에서 크롤링 등으로 얻어낸 코퍼스 데이터가 필요에 맞게 전처리되지 않은 상태라면, 해당 데이터를 용도에 맞게 토큰화 & 정제 & 정규화하는 일을 해야 한다.

- 토큰화에 대한 설명

주어진 코퍼스에서 토큰이라 불리는 단위로 나누는 작업을 토큰화라고 한다. 토큰의 단위는 상황에 따라 다르지만, 보통 의미있는 단위로 토큰을 정의한다.

1. 단어 토큰화

   토큰의 기준을 단어로 하는 경우. 단어 단위 외에도 단어구, 의미를 갖는 문자열로 간주되기도 함. 

   **ex) 구두점(. , ? ; ! 등의 기호)과 같은 문자를 제외시켜보자**

   ```
   입력: Time is an illusion. Lunchtime double so!
   출력: "Time", "is", "an", "illustion", "Lunchtime", "double", "so"
   구두점을 지운 뒤에 띄어쓰기 기준으로 잘라낸 가장 기초적인 예제
   ```

   보통 토큰화 작업은 단순히 구두점이나 특수문자를 전부 제거하는 정제(cleaning) 작업을 수행하는 것만으로 해결되지 않는다. 구두점이나 특수문자를 전부 제거하면 토큰이 의미를 잃어버리는 경우가 발생하기도 한다. 심지어 띄어쓰기 단위로 자르면 사실상 단어 토큰이 구분되는 영어와 달리, 한국어는 띄어쓰기만으로는 단어 토큰을 구분하기 어렵다.

2. 토큰화 중 생기는 선택의 순간

   토큰화를 하다보면, 예상하지 못한 경우가 있어서 토큰화의 기준을 생각해봐야 하는 경우가 발생한다. 물론, 이러한 선택은 해당 데이터를 가지고 어떤 용도로 사용할 것인지에 따라, 그 용도에 영향이 없는 기준으로 정하면 된다. 

   **ex) Don't와 Jone's**

   ```python
   # NLTK - word_tokenize
   from nltk.tokenize import word_tokenize  
   print(word_tokenize("Don't"))
   
   ['Do', "n't"]
   ```

   ```python
   # NLTK - wordPunctTokenizer
   from nltk.tokenize import WordPunctTokenizer  
   print(WordPunctTokenizer().tokenize("Don't"))
   
   ['Don', "'", 't']
   ```

   ```python
   # Keras - text_to_word_sequence
   from tensorflow.keras.preprocessing.text import text_to_word_sequence
   print(text_to_word_sequence("Don't"))
   
   ["don't"]
   ```

3. 토큰화에서 고려해야할 사항

   1) 구두점이나 특수 문자를 단순 제외해서는 안 됨

   2) 줄임말과 단어 내에 띄어쓰기가 있는 경우

4. 문장 토큰화

   보통 갖고있는 코퍼스가 정제되지 않은 상태라면, 코퍼스는 문장 단위로 구분되어있지 않을 가능성이 높다. 이를 사용하고자 하는 용도에 맞게 하기 위해서는 문장 토큰화가 필요할 수 있다.

   ? . ! 기준으로 잘라내면 되지 않을까? ㅇㅇ안됭

   **ex1) IP 192.168.56.31 서버에 들어가서 로그 파일 저장해서 ukairia777@gmail.com로 결과 좀 보내줘. 그러고나서 점심 먹으러 가자.**

   **ex2) Since I'm actively looking for Ph.D. students, I get the same question a dozen times every year.**

   이런 경우 때문에, 사용하는 코퍼스가 어떤 국적의 언어인지 또는 해당 코퍼스 내에서 특수문자들이 어떻게 사용되고 있는지에 따라서 직접 규칙들을 정의해보아야한다. 그렇지만 갖고있는 코퍼스 데이터에 오타나, 문장의 구성이 엉망이라면 정해놓은 규칙이 소용이 없을 수도 있다.

   ```python
   # NLTK - sent_tokenize
   from nltk.tokenize import sent_tokenize
   text="His barber kept his word. But keeping such a huge secret to himself was driving him crazy. Finally, the barber went up a mountain and almost to the edge of a cliff. He dug a hole in the midst of some reeds. He looked about, to mae sure no one was near."
   print(sent_tokenize(text))
   
   ['His barber kept his word.', 'But keeping such a huge secret to himself was driving him crazy.', 'Finally, the barber went up a mountain and almost to the edge of a cliff.', 'He dug a hole in the midst of some reeds.', 'He looked about, to mae sure no one was near.']
   # 잘 분류해냄! 그렇다면 온점을 중간에 넣으면?
   
   text="I am actively looking for Ph.D. students. and you are a Ph.D student."
   print(sent_tokenize(text))
   
   ['I am actively looking for Ph.D. students.', 'and you are a Ph.D student.']
   # 단순 온점을 구분자로 하여 문장을 구분하지 않기 때문에, 성공적으로 Ph.D를 인식해냄
   ```

   한국어는 어떻게? KSS

   ```python
   # pip install kss (윈도우 지원X, 리눅스 or 구글 Colab 사용)
   import kss
   text='딥 러닝 자연어 처리가 재미있기는 합니다. 그런데 문제는 영어보다 한국어로 할 때 너무 어려워요. 농담아니에요. 이제 해보면 알걸요?'
   print(kss.split_sentences(text))
   
   ['딥 러닝 자연어 처리가 재미있기는 합니다.', '그런데 문제는 영어보다 한국어로 할 때 너무 어려워요.', '농담아니에요.', '이제 해보면 알걸요?']
   # 중간에 온점 들어간 예제는 이 글에는 없네염
   ```

5. 이진 분류기

   문장 토큰화에서의 예외 사항을 발생시키는 온점의 처리를 위해서 입력에 따라 두 개의 클래스로 분류하는 이진 분류기(binary classifier)를 사용하기도 한다.

   1) 온점(.)이 단어의 일부분일 경우. 즉, 온점이 약어(abbreivation)로 쓰이는 경우

   2) 온점(.)이 정말로 문장의 구분자(boundary)일 경우

   이진 분류기는 임의로 정한 여러가지 규칙을 코딩한 함수이거나, 머신러닝을 통해 구현함.

   어떤 온점이 주로 약어로 쓰이는 지 알아야 어떤 클래스에 속하는 지 결정할 수 있다. 그렇기 때문에 약어 사전이 유용하게 쓰인다.

   오픈 소스는 NLTK, OpenNLP, 스탠포드 CoreNLP, splitta, LingPipe 등

6. 한국어에서의 토큰화의 어려움

   1) 한국어는 형태소라는 개념을 이해해야 한다. 영어에서의 단어 토큰화와 유사한 형태를 얻으려면 어절이 아닌 형태소 토큰화가 필요하다.

   2) 한국어는 띄어쓰기가 영어보다 덜 지켜진다. 이유는 잘 띄어쓰지 않아도 글을 쉽게 이해할 수 있는 언어이기 때문에, 언어적 특성의 차이.

7. 품사 태깅

   **ex) 'fly' 동사:날다 / 명사:파리**

   단어 토큰화 과정에서 각 단어가 어떤 품사로 쓰였는지를 구분하는 작업

8. NLTK와 KoNLPy를 이용한 영어, 한국어 토큰화 실습

   ```python
   # NLTK - 위 예제에서 토큰화된 결과
   ['I', 'am', 'actively', 'looking', 'for', 'Ph.D.', 'students', '.', 'and', 'you', 'are', 'a', 'Ph.D.', 'student', '.']
   
   from nltk.tag import pos_tag
   x=word_tokenize(text)
   pos_tag(x)
   
   # 품사 태깅 결과
   [('I', 'PRP'), ('am', 'VBP'), ('actively', 'RB'), ('looking', 'VBG'), ('for', 'IN'), ('Ph.D.', 'NNP'), ('students', 'NNS'), ('.', '.'), ('and', 'CC'), ('you', 'PRP'), ('are', 'VBP'), ('a', 'DT'), ('Ph.D.', 'NNP'), ('student', 'NN'), ('.', '.')]
   ```

    한국어 형태소 토큰화

   ```python
   # KoNLPy - Okt 조사를 기본적으로 분리하고 있음
   from konlpy.tag import Okt  
   okt=Okt()  
   print(okt.morphs("열심히 코딩한 당신, 연휴에는 여행을 가봐요"))
   
   # 형태소 추출
   ['열심히', '코딩', '한', '당신', ',', '연휴', '에는', '여행', '을', '가봐요']
   
   print(okt.pos("열심히 코딩한 당신, 연휴에는 여행을 가봐요"))
   
   # 품사 태깅
   [('열심히','Adverb'), ('코딩', 'Noun'), ('한', 'Josa'), ('당신', 'Noun'), (',', 'Punctuation'), ('연휴', 'Noun'), ('에는', 'Josa'), ('여행', 'Noun'), ('을', 'Josa'), ('가봐요', 'Verb')]
   
   print(okt.nouns("열심히 코딩한 당신, 연휴에는 여행을 가봐요"))
   
   # 명사 추출
   ['코딩', '당신', '연휴', '여행']
   ```

   ```python
   # KoNLPy - Kkma
   from konlpy.tag import Kkma  
   kkma=Kkma()  
   print(kkma.morphs("열심히 코딩한 당신, 연휴에는 여행을 가봐요"))
   
   # 형태소 추출
   ['열심히', '코딩', '하', 'ㄴ', '당신', ',', '연휴', '에', '는', '여행', '을', '가보', '아요']
   
   print(kkma.pos("열심히 코딩한 당신, 연휴에는 여행을 가봐요"))
   
   # 품사 태깅
   [('열심히','MAG'), ('코딩', 'NNG'), ('하', 'XSV'), ('ㄴ', 'ETD'), ('당신', 'NP'), (',', 'SP'), ('연휴', 'NNG'), ('에', 'JKM'), ('는', 'JX'), ('여행', 'NNG'), ('을', 'JKO'), ('가보', 'VV'), ('아요', 'EFN')]
   
   print(kkma.nouns("열심히 코딩한 당신, 연휴에는 여행을 가봐요"))
   
   # 명사 추출
   ['코딩', '당신', '연휴', '여행']
   ```

   형태소 분석기 중 Mecab은 속도가 빠르다고 한다. 사용하고자 하는 필요 용도에 따라 골라 사용하면 되겠다.
   
9. [한국어 형태소 분석기 비교](./한국어 형태소 분석기 비교.md)





2) 정수 인코딩

컴퓨터는 텍스트보다 숫자를 더 잘 처리할 수 있다. 이를 위해 자연어 처리에서 텍스트를 숫자로 바꾸는 여러가지 기법들이 있다. 이 기법들을 적용시키기 위한 첫 단계로 단어를 고유한 정수에 맵핑시키는 전처리 작업이 필요할 때가 있다. 예를 들어 500개의 단어가 있다면 단어에 고유한 인덱스를 부여하는 데 랜덤으로 부여하거나, 빈도수로 정렬 후 높은 단어부터 부여한다.

1. 정수 인코딩

   왜 이런 과정이 필요한 지는 원-핫 인코딩, 워드 임베딩 챕터에서 알아보자고 한다. 아래 원-핫 인코딩 파트에 정리해 두겠다.

   1) Python - dictionary 사용하기

   ```python
   "A barber is a person. a barber is good person. a barber is huge person. he Knew A Secret! The Secret He Kept is huge secret. ..."
   
   # 문장 토큰화 -> 단어 토큰화 후 모든 단어를 소문자화하고 불용어를 제거한다.
   [['barber', 'person'], ['barber', 'good', 'person'], ['barber', 'huge', 'person'], ['knew', 'secret'], ['secret', 'kept', 'huge', 'secret'] ... ]
   
   # 단어의 중복을 제거하고 빈도수를 기록한다. 빈도수가 높은 순서대로 정렬한다.
   [('barber', 8), ('secret', 6), ('huge', 5), ('kept', 4), ('person', 3),  ...]
   
   # 높은 빈도수를 가진 단어일수록 낮은 정수 인덱스를 부여한다. 빈도수가 낮은 단어(1)를 제외시킨다. 빈도수가 낮은 단어는 자연어 처리에서 의미를 가지지 않을 가능성이 높기 때문이다. 빈도수가 높은 상위 5개 단어만 사용해볼 것이다. 
   {'barber': 1, 'secret': 2, 'huge': 3, 'kept': 4, 'person': 5}
   ```

   이제 단어 토큰화가 된 상태로 sentences에 있는 단어를 정수로 바꿀 것이다. 예를 들어 첫 번째 문장인 ['barber', 'person']은 [1, 5]로 인코딩한다. 그런데 두 번째 문장인 ['barber', 'good', 'person']에는 빈도수가 낮아 dict에 존재하지 않는 단어인 'good'이 있다. 이처럼 단어 집합에 존재하지 않는 단어들을 Out-Of-Vocabulary(OOV)라고 한다. OOV를 키값으로 dict에 인코딩하겠다.

   ```python
   # 최종적으로 문장을 정수 인코딩했을 때 다음과 같다. OOV 값이 6이 된다.
   [[1, 5], [1, 6, 5], [1, 3, 5], [6, 2], [2, 4, 3, 2], [3, 2], [1, 4, 6], [1, 4, 6], [1, 4, 2], [6, 6, 3, 2, 6, 1, 6], [1, 6, 3, 6]]
   ```

   좀 더 쉽게 하기 위해서 Counter, FreqDist, enumerate 또는 케라스 토크나이저를 사용하는 것을 권장한다.

   2) Python - collections.Counter 사용하기

   ```python
   # 단어 토큰화 된 결과를 1차원 배열로 펼친다.
   words = ['barber', 'person', 'barber', 'good', 'person', 'barber', 'huge', 'person', 'knew', 'secret', ...]
   
   # 중복을 제거하고 단어의 빈도수를 기록
   vocab = Counter(words)
   print(vocab)
   
   Counter({'barber': 8, 'secret': 6, 'huge': 5, 'kept': 4, 'person': 3, 'word': 2, ...})
   
   # 빈도수 상위 5개만 저장
   vocab = vocab.most_common(5)
   print(vocab)
   
   [('barber', 8), ('secret', 6), ('huge', 5), ('kept', 4), ('person', 3)]
   
   # 정수 인덱스 부여하기
   ```

   3) NLTK - FreqDist 사용하기

   Python의 Counter()과 같은 방법으로 사용할 수 있다. 

   np.hstack - numpy의 배열 연결 함수: 행의 수가 같은 배열을 옆으로 연결하여 열의 수가 더 많은 배열로 만든다.

2. 케라스의 텍스트 전처리

   ```python
   from tensorflow.keras.preprocessing.text import Tokenizer
   
   tokenizer = Tokenizer()
   
   # 코퍼스를 입력으로 하면 빈도수를 기준으로 단어 집합을 생성한다.
   tokenizer.fit_on_texts(sentences)
   
   # 단어 인덱스가 어떻게 부여되었는지 확인
   print(tokenizer.word_index)
   
   # 단어 사용 횟수를 카운트하여 확인
   print(tokenizer.word_counts)
   
   # 정해진 인덱스로 변환
   print(tokenizer.texts_to_sequences(sentences))
   
   # 빈도수가 높은 상위 5개 단어 사용
   vocab_size = 5
   tokenizer = Tokenizer(num_words = vocab_size + 1)
   # num_words는 숫자를 0부터 카운트하기 때문에 +1을 해주어야 함, 이유는 자연어 처리에서 패딩이라는 작업 때문
   tokenizer.fit_on_texts(sentences)
   
   print(tokenizer.word_index)
   print(tokenizer.word_counts)
   # 이렇게 해도 상위 5개 말고 전체를 보여준다. 실제 적용은 아래와 같이 texts_to_sequences를 사용해야 한다.
   print(tokenizer.texts_to_sequences(sentences))
   ```

   케라스 토크나이저는 기본적으로 단어를 정수로 바꾸는 과정에서 OOV를 제거해버린다. 보존하고 싶다면 oov_token을 사용해야 한다.

   ```python
   vocab_size = 5
   tokenizer = Tokenizer(num_words = vocab_size + 2, oov_token = 'OOV')
   # 숫자 0과 OOV를 고려해서 단어 집합의 크기는 +2를 해주어야 함.
   tokenizer.fit_on_texts(sentences)
   # oov_token 사용 시 OOV의 인덱스는 1이다.
   ```

3. <추가> 원-핫 인코딩

   문자를 숫자로 바꾸는 기법 중 가장 기본적인 표현 방법이다. 먼저 단어 집합에 대해서 정의해보자. 

   **단어 집합**이란 서로 다른 단어들의 집합이다. 'book'과 'books'와 같은 단어의 변형 형태도 다른 단어로 간주한다. 

   텍스트의 단어 집합을 생성하고 고유한 숫자를 부여하는 정수 인코딩을 진행한다. 숫자로 바뀐 단어들을 벡터로 다루고 싶다.

   1) 원-핫 인코딩이란?

   단어 집합의 크기를 벡터의 차원으로 하고, 표현하고 싶은 단어의 인덱스에 1의 값을 부여하고, 다른 인덱스에는 0을 부여하는 단어의 벡터 표현 방식이다. 이렇게 표현된 벡터를 원-핫 벡터라고 한다.

   **ex) 문장: 나는 자연어 처리를 배운다**

   ```python
   # 토큰화
   token=okt.morphs("나는 자연어 처리를 배운다")
   ['나', '는', '자연어', '처리', '를', '배운다']
   
   # 인덱스 부여
   {'나': 0, '는': 1, '자연어': 2, '처리': 3, '를': 4, '배운다': 5}
   
   # 원-핫 벡터 생성 함수
   def one_hot_encoding(word, word2index):
       one_hot_vector = [0]*(len(word2index))
       index=word2index[word]
       one_hot_vector[index]=1
       return one_hot_vector
   
   one_hot_encoding("자연어",word2index)
   [0, 0, 1, 0, 0, 0]
   ```

   토큰 입력을 받아 해당 토큰에 대한 원-핫 벡터를 생성한다. "자연어"는 단어 집합에서 인덱스가 2이므로, 원-핫 벡터의 2인덱스 값이 1이며, 나머지 값은 0이다.

   2) 케라스를 이용한 원-핫 인코딩

   케라스에서는 to_categorical() 함수로 원-핫 인코딩을 쉽게 수행할 수 있다.

   ```python
   from tensorflow.keras.preprocessing.text import Tokenizer
   from tensorflow.keras.utils import to_categorical
   
   text="나랑 점심 먹으러 갈래 점심 메뉴는 햄버거 갈래 갈래 햄버거 최고야"
   t = Tokenizer()
   t.fit_on_texts([text])
   print(t.word_index) # 각 단어에 대한 인코딩 결과 출력
   
   {'갈래': 1, '점심': 2, '햄버거': 3, '나랑': 4, '먹으러': 5, '메뉴는': 6, '최고야': 7}
   ```

   t에 생성된 단어 집합에 있는 단어들로만 구성된 텍스트가 있다면, 정수 시퀀스로 변환이 가능하다.

   ```python
   sub_text="점심 먹으러 갈래 메뉴는 햄버거 최고야"
   encoded=t.texts_to_sequences([sub_text])[0]
   print(encoded)
   
   [2, 5, 1, 6, 3, 7]
   
   # 원-핫 인코딩
   one_hot = to_categorical(encoded)
   print(one_hot)
   
   [[0. 0. 1. 0. 0. 0. 0. 0.] #인덱스 2의 원-핫 벡터
    [0. 0. 0. 0. 0. 1. 0. 0.] #인덱스 5의 원-핫 벡터
    [0. 1. 0. 0. 0. 0. 0. 0.] #인덱스 1의 원-핫 벡터
    [0. 0. 0. 0. 0. 0. 1. 0.] #인덱스 6의 원-핫 벡터
    [0. 0. 0. 1. 0. 0. 0. 0.] #인덱스 3의 원-핫 벡터
    [0. 0. 0. 0. 0. 0. 0. 1.]] #인덱스 7의 원-핫 벡터
   ```

   3) 원-핫 인코딩의 한계

   - 단어의 개수가 늘어날수록, 벡터를 저장하기 위해 필요한 공간이 계속 늘어난다. 벡터의 차원이 계속 늘어난다고도 표현한다. 원-핫 벡터는 단어 집합의 크기가 곧 벡터의 차원 수가 된다. 이는 저장 공간 측면에서 매우 비효율적인 표현 방법이다.
   - 단어의 유사도를 표현하지 못한다. 늑대, 호랑이, 강아지, 고양이를 원-핫 인코딩해서 각각 [1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]를 부여받는다. 유사도를 표현할 수가 없다. 단어 간 유사성을 알 수 없는 것은 검색 시스템 등에서 심각한 문제이다. 연관 검색어를 보여줄 수 없다. 이러한 단점을 해결하기 위해 단어의 잠재 의미를 반영하여 다차원 공간에 벡터화 하는 기법으로 1. 카운트 기반의 벡터화 방법 LSA,HAL 과 2. 예측 기반 벡터화 방법 NNLM, RNNLM, Word2Vec, FastText 와 3. 카운트와 예측 기반 모두 사용하는 GloVe 라는 방법이 존재한다.
   
   4) 원-핫 해싱
   
   * 단어 집합의 고유 토큰 수가 너무 커서 모두 다루기 어려울 때 사용한다.
   * 단어(key)를 value값으로 해싱하여 고정된 크기의 벡터로 변환
   * 명시적인 단어 인덱스가 필요없기 때문에 메모리 절약이 가능, 전체 데이터를 확인하지 않고 토큰 생성이 가능(바로 데이터 조회 가능)
   * 해시 충돌이 발생할 수 있음



3) 임베딩

4) 순환 신경망 기초

5) LSTM & GRU





## 명세 6. 심화 학습(RNN)

1) Text Summarization - Seq2seq 기법을 기반으로 문서 요약해주는 인공지능 모델 구현

2) Sentiment Analysis - Seq2seq 기법을 기반으로 감정 분석기를 구현

3) 공개 데이터셋 및 Kaggle

4) 오버피팅과 언더피팅 / 가중치 초기화 / 정규화

