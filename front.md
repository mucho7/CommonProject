## FE file structure

```
Main
    ├─SideBar
    │      ├─index.js
    │      ├─SideBar.js
    │      ├─ ...
    │      └─ ...
    ├─SesisonList
    │      ├─index.js
          ├─SessionList.js
          ├─SessionListItem.js
          ├─ ...
          └─ ...
Session
    ├─IdeView
    ├─Chat
    ├─ToolBar
    └─...

- 페이지 / 기능 단위로 폴더 생성, 하나의 파일에 하나의 컴포넌트
- 컴포넌트는 index.js에서 export
```

## 코딩 컨벤션

- 컴포넌트 파일명: PascalCase
- 비 컴포넌트 파일명: camelCase
- 속성명, 변수명, 함수명: camelCase
- unit test 파일명은 테스트 대상 파일명과 일치
  - ex. Login.js / Login.test.js
- CSS 파일명은 컴포넌트 이름과 동일하게, 인라인 CSS X
  - (추후 CSS를 Sass 등으로 변경해보고자 함)
