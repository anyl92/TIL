## RESTful API

API 설계의 중심에 자원(Resource)이 있고 HTTP Method를 통해 자원을 처리하도록 설계한다. REST의 기본 원칙을 성실히 지킨 서비스 디자인은 RESTful하다고 표현할 수 있다.

1. 리소스와 행위를 명시적이고 직관적으로 분리한다.
   - 리소스는 URI, 리소스가 가리키는 것은 명사로 표현
   - 행위는 HTTP Method로 표현. GET, POST, PUT, PATCH, DELETE를 분명한 목적으로 사용
2. Message는 Header와 Body를 명확하게 분리해서 사용한다.
   - Entity에 대한 내용은 Body에 담는다.
   - API 버전 정보, 응답받고자 하는 타입 등은 Header에 담는다.
3. API 버전을 관리한다.
   - API의 signature가 변경될 수 있음에 유의
   - 특정 API를 변경할 때는 하위호환성을 보장해야 한다.
4. 서버와 클라이언트가 같은 방식을 사용해서 요청한다.
   - form-data, json 등 브라우저에서의 통신 방식을 하나로 통일한다.

#### 장점

- Open API 제공 쉬움, HTTP 사용

#### 단점

- 메소드가 4개뿐, 분산환경에는 부적합

