# team2CloneFE

team2CloneFE

# 변경사항

1. 리덕스 삭제 -> 리코일로 대체, 이에 따른 폴더 구조 변경 (recoil 폴더 생성, redux 폴더 삭제)
2. 쿠키 관련 폴더 생성 => setCookie, getCookie 함수 추가하여 어디서든 import받아 사용 가능
3. axios instance 생성

- instance default 값에 withCredential:true 추가(서버와 cookie 주고 받기 위함)
- instance default 값에 api 요청시 필요한 서버 URL+/api/ baseUrl추가 => 향후 axios 생성 시 상대경로만 지정하면 됨

4. react hook form 설정 중...
5. Nav component error 해결

- class => className : Icon component 들 중 대부분이 JSX 문법의 className 이 아닌 class 사용으로 인한 error 발생
- map의 결과물로 나오는 요소들에 고유 key 적용: Nav의 이중 map 중 첫 번째 map의 반환 요소에 고유 식별 key 설정되어 있지 않음에 따른 error 발생

# BE에 요청사항

1. 토큰 값 전송 시 유저 정보 받는 API 추가 -> email 값을 받아서 Layout Page 화면에 표시하기 위함
