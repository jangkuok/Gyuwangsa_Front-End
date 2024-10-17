<div align="center">
  <img src="https://github.com/user-attachments/assets/45a607a7-0800-47f7-8860-ed5b91b49b69">
</div>

------

<div align="center">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">

  ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
  <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  
</div>

----
### **🙌 프로젝트 명**

- GYUWANGSA
- 도움 받은 개발자 지인들의 이니셜과 자신의 이니셜을 통해 무신사와 비슷하게 프로젝트 명 설정.
----
### **🙋‍♀️ 프로젝트 소개**

- 무신사와 크림을 참고하여 제작한 전자상거래 사이트.(Back-End)
- [2018년도 단품 쇼핑몰](https://github.com/jangkuok/outer_shopping_project.git)([동영상](https://drive.google.com/drive/folders/1HrA6EeozBnJtGje6JHk7giiH3asLYbvx?usp=drive_link)) 제작 이후 실력 점검 및 프로젝트 확장, 보편적인 언어 경험을 위해 제작.
- [Back-End](https://github.com/jangkuok/Gyuwangsa_Back-End.git) 와 Front-End 분리.
- [기능 관련 영상 ](https://drive.google.com/drive/folders/16WGca8_N_nMLHFN5m-tMiSX9GuglpTeP?usp=drive_link)
- [프로젝트 개발 전](https://github.com/jangkuok/Gyuwangsa.git) Spring으로 로그인 및 로그아웃, JWT 토큰 발급까지 연습 후 진행.
----
### **🗓 개발 기간**

- 24.05.01 ~ 24.07.31
----
### **👨‍👨‍👦‍👦 맴버 구성**

- 김장규
----

### **🛠 프로젝트 확장**

- 한명의 관리자가 단품 상품을 팔고 관리하는 것이 아닌 브랜드가 입점하여 여러가지 상품을 판매하고 관리하는 방식으로 확장.
- session 방식으로 사용자 정보와 권한을 관리하는 것이 아닌 jwt을 통해 토큰을 발급하고 cookie에 저장하여 사용자 정보와 권한을 확인하고 발급 시간이 지나면 재발급을 통해 사용자 정보 관리.
- 사용자의 편리한 회원가입을 위해 카카오 oAuth를 사용.
- 아임포트를 통해 결제와 취소 기능을 추가.
- 확장성과 보안성, 유지보수성을 높이기 위해 코드를 따로 나누어 관리 했으며 Rest API를 사용하여 서버와 클라이언트 통신.
- 개발 툴은 VSCode 사용.(전 프로젝트에서는 Eclipse 사용.)
----

### **✏ 기술 스택 사용 이유**

[ Front-End ]
- React : 컴포넌트 기반 아키텍처로 복잡한 사용자 인터페이스를 효율적으로 개발할 수 있어 선택.
- JavaScript / HTML / CSS : 웹 개발의 기본 기술 스택으로 사용.
- TailwindCSS : 신속한 개발과 일관된 디자인 시스템을 구현하기 위해 선택.

[ Tool ]
- Visual Studio Code : 프론트엔드 코드 작성 및 관리.
- Github : 버전 관리 및 협업을 위해 사용.
- PostMan : RESTful API 테스트에 사용.

----

### **🗂 패키지 구성**

- api : axios 라이브러리를 사용하여 서버와 클라이언트 통신.
- components : 기능별 컴포넌드 제작.
  
   > brand
   > 
   > cart
   > 
   > common
   > 
   > menus
   > 
   > order
   > 
   > pdInfo
   > 
   > user
   > 
- css
- layouts : header / side / main / footer 컴포넌트 제작.
- mainPage : 메인페이지 관련 컴포넌트 제작.
- pages : 해당 기능별 페이지 제작.
  
   > brand
   >
   > cart
   >
   > categories
   > 
   > order
   > 
   > pdInfo
   > 
   > user
   > 
- router : 해당 기능별 router 제작.
- slices : cart 설정 / 로그인 설정.
- util : cookie 설정 / jwt 설정.

----

### **📌 상세 기능**
- 공통 기능
   - 메인/브랜드/상품/목록 페이지 확인
   - 상품 / 브랜드 검색
   - 브랜드/회원 가입(카카오 가입)
   - 아이디 찾기

- 일반 사용자
   - 로그인 / 로그아웃 
   - 마이페이지
   - 회원 정보 수정 / 탈퇴
   - 주문 하기 / 주문 취소
   - 카트 담기
   - 상품 좋아요 / 좋아요 목록 확인

- 브랜드 관리자
   - 로그인 / 로그아웃
   - 브랜드 정보 수정
   - 브랜드 사용자 정보 수정 / 탈퇴
   - 상품 등록 / 수정 / 삭제
   - 주문 상태 확인 및 수정
  
----

### **❓ 참고 자료**

- 인터넷 자료 / 유튜브 / 인프런 강의를 통해 JAVA/SPRING 복기
- 개발자 지인들을 통해 전체적인 프로젝트 조언, 언어 추천, 에러 관련 도움.
- 막히는 에러와 알고리즘은 서치를 통해 해결.
----
### **❗ 느낀점**

- React의 동기화 및 비동기화 처리
   - React 개발 시 동기화와 비동기화 처리 방법에 대해 배웠으며 비동기 요청 시 상태 관리와 데이터 처리를 적절히 처리하는 것이 중요함을 깨달음.
- React의 컴포넌트화의 편리함
   - 기능별로 컴포넌트를 나누어 개발하면서 재사용성과 유지보수성이 크게 향상 되었고  컴포넌트를 분리함으로써 코드의 구조가 명확해지고 기능별 이해와 수정이 용이해졌으며 이를 통해 컴포넌트 기반 개발의 장점을 체감할 수 있음.
- 클라이언트에서 서버로 JSON 형태로 전송
   - 클라이언트에서 객체를 서버로 전송하기 위해 자바스크립트의 값을 JSON.stringify() 메서드를 통해 JSON 타입으로 파싱하고 new Blob()을 이용하여 타입을 JSON으로 지정 후 FormData 전송.
----

### **🏞 상세 이미지**
|메인 페이지|브랜드 페이지|상품 페이지|
|-----------|-----------|-----------|
|![전체화면](https://github.com/user-attachments/assets/a2d34b7f-41c5-4363-a0ae-6e133f70c0bf)|![브랜드](https://github.com/user-attachments/assets/2cff97cb-127d-4f67-bd34-6b80bd5a8a59)|![상품](https://github.com/user-attachments/assets/c3137ac9-07b9-444b-9c2b-64778a9dbafa)|





