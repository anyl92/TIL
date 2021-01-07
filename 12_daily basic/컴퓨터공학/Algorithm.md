## 정렬

### 버블

서로 인접한 두 원소를 비교하여 정렬한다. 시간복잡도는 O(n^2)

```python
while True:
    cnt = 0
    for i in range(N-1):
        if L[i] > L[i+1]:
            L[i], L[i+1] = L[i+1], L[i]
        else:
            cnt += 1
	if cnt == N-1:
        break
```



### 삽입

자료 베열의 모든 요소를 앞에서부터 이미 정렬된 배열 부분과 비교하여, 자신의 위치를 찾아 삽입함으로써 정렬을 완성. 시간복잡도는 O(n^2)

```python
for i in range(1, len(x)):
    j = i - 1
    key = x[i]
    while x[j] > key and j >= 0:
        x[j+1] = x[j]
        j = j - 1
    x[j+1] = key
return x
```



### 선택

사용할 수 있는 메모리가 제한적인 경우에 사용시 성능 상의 이점이 있다. 시간복잡도는 O(n^2)

1. 최소값을 찾는다.
2. 맨 앞에 위치한 값과 교체한다.

```python
length = len(x)
for i in range(length-1):
    indexMin = i
    for j in range(i+1, length):
        if x[indexMin] > x[j]:
            indexMin = j
    x[i], x[indexMin] = x[indexMin], x[i]
return x
```



### 머지

주어진 배열을 크기가 1인 배열로 분할하고 합병하면서 정렬을 진행. 시간복잡도는 O(n log n)

```python
def merge_sort(list):
	if len(list) <= 1:
        return list
    mid = len(list) // 2
    leftList = list[:mid]
    rightList = list[mid:]
    leftList = merge_sort(leftList)
    rightList = merge_sort(rightList)
    return merge(leftList, rightList)
```

```python
def merge(left, right):
    result = []
    while len(left) > 0 or len(right) > 0:
        if len(left) > 0 and len(right) > 0:
            if left[0] <= right[0]:
                result.append(left[0])
                left = left[1:]
            else:
                result.append(right[0])
                right = right[1:]
        elif len(left) > 0:
            result.append(left[0])
            left = left[1:]
        elif len(right) > 0:
            result.append(right[0])
            right = right[1:]
    return result
```



### 퀵

매우 빠른 정렬 속도를 자랑하는 분할 정복 알고리즘 중 하나, 리스트를 비균등하게 분할한다. 피봇을 설정하고 피봇보다 큰 값과 작은 값으로 분할하여 정렬한다. 시간복잡도는 O(n log n)이지만 리스트가 계속해서 불균등하게 나눠지는 최악의 경우 O(n^2)가 될 수도 있다.

```python
def quicksort(x):
    if len(x) <= 1:
        return x

    pivot = x[len(x) // 2]
    less = []
    more = []
    equal = []
    for a in x:
        if a < pivot:
            less.append(a)
        elif a > pivot:
            more.append(a)
        else:
            equal.append(a)

    return quicksort(less) + equal + quicksort(more)
```





### 힙

데이터를 힙 자료구조로 만들어 최댓값 또는 최솟값부터 하나씩 꺼내서 정렬. 가장 큰 값 몇개만을 필요로 할 때 가장 유용하다. 시간복잡도는 O(n log n)

```python
Class Node:
    def init(self, item, left, right):
        self.item = item
        self.left = left
        self.right = right
        ...?
```

1. 가장 마지막 위치에 새로운 요소를 삽입
2. 부모 노드와 값을 비교하여 교환





## 허프만 코딩

문자의 빈도를 이용해 압축하는 방법. 빈도가 높은 문자에 짧은 코드를 부여. 힙.

- 접두부 코드: 문자에 보여된 코드가 다른 이진 코드의 접두부가 되지 않는 코드
- 최적 코드: 인코딩된 메세지의 길이가 가장 짧은 코드



팩토리얼 / 피보나치 / 배수 / 배열뒤집기 / 펠린드롬 / 계산기