# 서론
* https://bestinu.tistory.com/64 링크를 참조한 인텔리제이 컨벤션을 적용한다.
* 아래 내용은 naver checkstyle로 명확히 정의되지 않은 컨벤션에 대해 정리한 내용이다.


# java

타입 | 작성법 | 기타
---|---|---
variable | 카멜케이스 | 명사+명사,전치사 + 명사
method | 파스칼 케이스 | 동사 + 명사
클래스 | 맨 앞이 대문자인 파스칼 케이스 | 명사+명사
상수 | 모두 대문자 | 명사+명사, 전치사 + 명사


* 모든 네임스페이스에 축약어 사용 금지  
    ex) idx -> index

* 가독성이 떨어지더라도 의미가 명확한 이름 사용  
    ex) cnt1 -> firstArrayCount

* import * 과 비슷한 형태의 라이브러리 주입은 금지

# 스프링

* controller, service, repository 의 명명규칙  
    * action + 반환 데이터 이름  

      
  
<br>
<br>

* action

패턴 | 단어 
---|---
CREATE | Insert
READ | select
UPDATE | update
DELETE | delete

* 반환데이터 이름은 backend 서버에 저장되어있는 dto 이름양식을 따른다

* 플래그 형식의 method 작성시엔 위의 명명규칙 대신 is + (행위ed or 명사)로 작성한다

* controller method, service, mapper의 이름은 통일

* controller의 이름과 path는 통일
    * ex) @controller(value = "/board")  
        public class BoardController

* path의 마지막엔 / 삽입 금지

