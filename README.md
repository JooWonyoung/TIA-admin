# TnT 관리자페이지 구현

## 프로젝트 개요

TIA Korea는 세계 1위의 벽돌깨기게임 Swipe Brick Breaker를 기반으로 이외 Bounce Brick Breaker 등 다양한 캐주얼 게임을 보유하고 있는 회사입니다.
TnT란 TIA Korea에서 보유한 게임들을 P2E에 접목한 프로젝트이며, 이 P2E 게임 유저들을 관리하는 관리자페이지를 구현하는 프로젝트에 참여했습니다.

## 사용 기술 스택

React, JavaScript, Redux, Styled-Component, Antd

## 구현사항

### Antd CSS framework를 사용한 페이지 레이아웃

- 어드민페이지 구현에 적합한 Antd 사용
- Datepicker, Input, Table 등 모든 UI Antd로 구현
  <img width="600" src="https://user-images.githubusercontent.com/97422072/192132054-93261e4f-0fa2-4b7b-8004-126bf52087d7.png">

### 검색 결과 Sorting 기능

- Table의 카테고리 클릭 시 서버에 axios GET 요청.
- params에 sorting 기준 카테고리와 정렬순서를 담아 요청.
  <img width="600" src="https://user-images.githubusercontent.com/97422072/192133579-3943b66a-fc75-4b0d-be60-991efde71e37.gif">

### 엑셀 다운로드 기능

- xlsx를 활용한 엑셀 다운로드.
- 날짜 구간이 선택되야만 다운로드가 가능하도록 로직 구현.
  <img width="600" src="https://user-images.githubusercontent.com/97422072/192133733-660cf3e0-81b5-4899-96de-d894a0ab9309.gif">

### 날짜 연동 기능

- antd의 datePicker와 Radio Component 활용.
- 날짜 input의 value 속성을 state값과 연동하여 동적으로 구현.
  <img width="600" src="https://user-images.githubusercontent.com/97422072/192134644-a1b50a26-7e2d-40b1-adcb-9df212334491.gif">

### 페이지네이션 기능

- 총페이지, 현재페이지, 페이지당 유저수의 값을 활용한 동적인 페이지네이션 구현.
  <img width="600" src="https://user-images.githubusercontent.com/97422072/192136459-d56dbbdd-8cc1-4177-85bb-c146bccc3dc8.gif">

### Echarts 그래프에 여러 항목 출력하기

- 서버로부터 받는 데이터를 Echarts API에 맞도록 가공하는 로직 구현.
- 백엔드 개발자와 데이터를 보내는 형식에 관한 소통 및 협업 과정.
  <img width="600" src="https://user-images.githubusercontent.com/97422072/192138869-2e548c49-e89d-4c8f-abc0-5acce06ec51d.gif">

### Redux로 검색값 저장하기

- 유저가 검색창에 입력하는 모든 값을 Store에 저장.
- 다른 페이지에 이동했다가 돌아와도 검색했던 값을 유지하도록 구현.
- 유저리스트, 랭킹리스트, 예약리스트 페이지에 각 독립적인 reducer를 생성.
- 기능중심의 ducks 패턴으로 redux 폴더 관리.
  <img width="600" src="https://user-images.githubusercontent.com/97422072/192138911-5e2f55a4-7dc1-40b2-8d2f-ccd4ba093cfc.gif">

### Redux로 네비게이션 바 상태 관리하기

<img width="600" src="https://user-images.githubusercontent.com/97422072/192138949-0e802a6f-4ca0-406d-a168-736bfedb637d.gif">

### 검색창, 테이블 컴포넌트화 및 재사용

- 반복되는 검색창과, 테이블을 공통 컴포넌트로 활용.

#### 회원관리 페이지

<img width="600" alt="스크린샷 2022-09-25 오후 6 34 14" src="https://user-images.githubusercontent.com/97422072/192137830-1da28072-5895-44fc-b076-b0696a93ad57.png">

#### 사전예약 신청유저 페이지

<img width="600" alt="스크린샷 2022-09-25 오후 6 50 45" src="https://user-images.githubusercontent.com/97422072/192137842-5fd41364-cbca-4891-8978-eb3349a0b2a7.png">

#### 게임 랭킹리스트 페이지

<img width="600" alt="스크린샷 2022-09-25 오후 6 50 53" src="https://user-images.githubusercontent.com/97422072/192137857-c3a1852b-b6ff-4e5b-9da1-3605e135c672.png">

### custom hook 활용

- 서버와 통신하는 로직들을 custom hook을 활용하여 한꺼번에 관리.
- async, await를 활용한 비동기통신 처리.
- 데이터를 요청하는 페이지를 기준으로 swicth 구문을 통해 분기처리.
