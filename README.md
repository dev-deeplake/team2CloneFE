# team2CloneFE

team2CloneFE

# 변경사항

1. 리덕스 삭제 -> 리코일로 대체, 이에 따른 폴더 구조 변경 (recoil 폴더 생성, redux 폴더 삭제)
2. axios instance 생성

- instance default 값에 withCredential:true 추가(서버와 cookie 주고 받기 위함)
- instance default 값에 api 요청시 필요한 서버 URL+/api/ baseUrl추가 => 향후 axios 생성 시 상대경로만 지정하면 됨

3. react hook form 설정 중...

# BE에 요청사항

1. 토큰 값 전송 시 유저 정보 받는 API 추가 -> email 값을 받아서 Layout Page 화면에 표시하기 위함
