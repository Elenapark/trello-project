# <img width="96" alt="스크린샷 2024-08-05 오후 9 55 55" src="https://github.com/user-attachments/assets/b5f53890-4c54-498c-94d0-d6aaed9d43c5">


### 프로젝트 소개
- **Taskify** - 일정관리 플랫폼 Trello 클론 프로젝트

### 프로젝트 구현 목적
- NextJS (v14) 및 Server Action 기능 학습을 위한 용도의 클론 프로젝트

### 개발 기간
- 24.05.28 - 24.07.04

### 사용 기술 스택
- NextJS (v14)
- Typescript
- Shadcn-ui, Tailwindcss
- Zustand
- Zod
- Prisma ORM, MySql
- Stripe

### 주요 기능

#### Taskify 랜딩 페이지
<img width="250" alt="스크린샷 2024-08-05 오후 9 59 48" src="https://github.com/user-attachments/assets/90666b55-42f0-4794-8718-c7b69da91e3b">

#### Clerk 라이브러리를 이용한 OAuth / 일반 로그인,회원가입 기능
<img width="250" alt="스크린샷 2024-08-05 오후 10 00 53" src="https://github.com/user-attachments/assets/461f2868-840a-4333-a129-c557a8fde27c">

#### dashboard 탭
<img width="250" alt="스크린샷 2024-08-05 오후 10 02 08" src="https://github.com/user-attachments/assets/94a61d14-6615-4b6f-bbaa-cae11ac5f123">

  - 신규 보드 생성 기능
  - unsplash api를 이용한 보드 배경이미지 설정
  - 무제한 보드 생성을 위한 stripe 결제 기능 연결
  
#### activity 탭
<img width="250" alt="스크린샷 2024-08-05 오후 10 03 36" src="https://github.com/user-attachments/assets/53d4efa4-944b-4b62-aece-3f312cfa2262">

  - 유저의 보드, 보드 내 리스트 및 카드 생성, 수정 및 삭제 등 유저 액션을 시간 정보와 함께 로깅 처리

#### Setting 탭
<img width="250" alt="스크린샷 2024-08-05 오후 10 04 16" src="https://github.com/user-attachments/assets/39b7865b-8845-42ba-b241-a02266f6f97c">

  - 계정 관리

#### Billing 탭
<img width="250" alt="스크린샷 2024-08-05 오후 10 04 45" src="https://github.com/user-attachments/assets/1e426a6f-cc44-4ec2-8106-a50056e72883">

  - Pro 기능 업데이트 모달 적용

#### board 내 기능
<img width="250" alt="스크린샷 2024-08-05 오후 10 10 30" src="https://github.com/user-attachments/assets/3091f161-a899-4bec-9b76-772b24974e9c">
<img width="250" alt="스크린샷 2024-08-05 오후 10 10 55" src="https://github.com/user-attachments/assets/11bc22ba-423a-40bb-9a7b-464853106891">

  - 보드리스트 및 카드 생성, 수정 및 삭제 
  - 카드 drag & drop 기능
  - 카드 copy 기능



### 프로젝트 실행 방법
```js
yarn install
yarn dev
```

### 배포 URL
- https://trello-project-rust.vercel.app/
