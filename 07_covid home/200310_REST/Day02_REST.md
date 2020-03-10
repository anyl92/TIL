작성 코드

```python
import requests
import json

url = 'http://13.125.222.176/quiz/alpha'
headers = {'content-type': 'application/json', 'Accept':'application/json'}
data = {'nickname': '서울4반안유림', 'yourAnswer': '1'}
r = requests.post(url, headers=headers, data=json.dumps(data))
jr = json.loads(r.text)
print(jr['question'])

changetext = jr['nextUrl']
url = f'http://13.125.222.176/quiz/{changetext}'

while True:
    if jr['question'] == "모든 문제를 완료하셨습니다.":
        break

    myanswer = input()
    data = {'nickname': '서울4반안유림', 'yourAnswer': myanswer}

    r = requests.post(url, headers=headers, data=json.dumps(data))
    jr = json.loads(r.text)

    if jr['question'] == '':
        print('오답입니다. 다시 입력해주세요')
        continue

    changetext = jr['nextUrl']
    url = f'http://13.125.222.176/quiz/{changetext}'

    print(jr['question'])
```

