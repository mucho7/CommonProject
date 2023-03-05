# 목차
[1. 커밋 규칙](#커밋-규칙)  
[2. 커밋 메세지 양식](#커밋-메세지-양식)  
[3. header](#header)  
[4. type](#type)  
[5. subject](#subject)  
[6. body](#body)


# 커밋 규칙
    1. 커밋은 기능단위로 수행한다
    2. 엮여있는 두가지 기능에 대한 commit이 필요하다면, 팀원과 상의하여 commit 메세지를 작성한다.
    3. 

# 커밋 메세지 양식
    git commit -m "header

    body"


# header

type : subject


# type

 태그 | 설명 
---|---
Feat | 기능에 대한 commit
Fix | 버그 
Design | css, html
Style | 로직 변경이 없는 코드 스타일 변경
Refator | 내부 로직의 변경이 있으나, 엔드포인트의 변경점이 없는 경우
Docs | 문서
Directory | 디렉토리의 내용만 수정

# subject
* 명사형으로 작성
    * ex) VariableVisualization 수정
    * 기능명은 jira에 명시되어있는 이름으로 작성
* 기능에 대한 action은 "수정","추가","삭제"로 통일해서 작성


# body

target  
 -내용

target  
 -내용


* target : method/function 단위로 작성
* 내용 : 최대한 상세히 작성