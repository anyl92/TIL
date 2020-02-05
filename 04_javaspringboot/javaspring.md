DTO -> table과 객체를 매핑해줌. 만약 private로 매핑 권장. 접근할 수 있게 get set 설정해줘야함. 생성자(필요에따라 종류별로)도 있어야함

사용자가(react의 route path에서 '/member'로 요청을 보냄) url로 요청함 -> controller에서 API형식을 판단 -> 들어온 url에 해당하는 함수를 실행

Service.~~가 있을것임, service는 껍데기 선언, Impl는 로직 -> try catch로 로직 실행하고 Repo(DAO 데이터에 직접 접근 할수 있음) 에 미리 선언되어있거나 내가 선언한 함수를 실행할 수 있음

controller에서 만들어진 객체 등을 return 할 수 있고 이걸 react router에서 객체에 접근해서 사용할 수 있다



서버사이드렌더링 -> maincontroller에서 index.html로 보내는거 1밖에없음

webconfiguration.java 에서 싱글페이지로 사용하기위해 forward 설정함 -> body에 실린채로감 

restful -> 값만 던져주면 프론트에서 클라이언트사이드렌더링을 하는거 restcontroller로 들어옴

