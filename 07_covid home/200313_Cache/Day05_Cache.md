- Cache?

Cache : 많은 시간이나 연산이 필요한 일에 대한 결과를 저장해 두는 것



Cache Memory : 메인 메모리보다 빠르고 작고 비싼 CPU 칩 안에 포함되는 메모리. 레지스터와 함께 메모리 계층 구조의 전통적인 핵심 계층 중 하나. 프로그램에서 직접 읽거나 쓸 수 없고 하드웨어의 메모리 관리 시스템이 내부적으로 제어함. 데이터 지역성을 활용하여 메인 메모리에 있는 데이터를 캐시 메모리에 불러와 두고, CPU가 필요한 데이터를 캐시에서 먼저 찾도록 하면 시스템 성능을 향상시킬 수 있음.



* Locality

데이터 지역성은 대표적으로 시간 지역성과 공간 지역성으로 나뉜다. 시간 지역성이란 한 번 참조된 데이터는 또 참조될 가능성이 높다는 것이고, 공간 지역성이란 배열 등에 연속적으로 접근할 때 참조된 데이터 근처에 있는 데이터가 잠시 후에 사용될 가능성이 높다는 것이다.



* 구조 / 작동 방식

DRAM의 여러 주소가 캐시 메모리의 한 주소에 대응되는 다대일 방식이다.



* 문제점

연산의 결과가 달라졌을 때의 처리. 갱신이 어려움

-> TTL 캐시의 만료기간을 정해둔다. 만료일이 지나면 삭제하고 다시 생성



