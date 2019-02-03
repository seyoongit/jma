# 그냥 알파벳 옮기는 사이트

Vue를 공부하기 위해 진행한 프로젝트<br>
<br>

[그냥 알파벳 옮기는 사이트](http://jma.cool)

<br>
로그인을 하고 알파벳을 드래그해서 옮기는 사이트. 로그인의 경우 페이스북만 된다. <br>
<br>
알파벳마다 최근에 그 알파벳을 옮긴 사용자의 이메일이 기록되며 다른사람이 옮기는걸 실시간으로 확인할수도 있다. <br>
<br>
앱의 핵심이 되는 이 '실시간 업데이트' 기능은 파이어베이스의 firestore가 제공한다. <br>
<br>
파이어베이스의 hosting 제품을 사용하여 호스팅된다. <br>
<br>
<br>

### 구조

![jma_structure](https://user-images.githubusercontent.com/47002080/52173044-2be25200-27bf-11e9-97c9-fc39d65b0f6c.png)

앱은 크게 게임보드와 알파벳, 그리고 탑 네비게이션 3가지 컴포넌트로 나뉜다.<br>
<br>

###### Alphabet

게임판에 보이는 알파벳 하나를 나타내는 컴포넌트다. <br>
<br>
원래는 직접 css를 써서 디자인하려했으나 참고할만한 래퍼런스도 없고,  직접 하면 시간도 많이들고 결과물이 시원치 않을거같아서 이것저것 찾아보던중 *font-awesome* 에서 제공하는 폰트를 발견했다. <br>
<br>
무료폰트중에서만 알파벳과 비슷하게 생긴것만 추리다 보니 'J'와 'Z' 가 없어서 대충 비슷하게 생긴걸로 대체했다. <br>
<br>
각 알파벳의 개수는 영어권에서 알파벳이 사용되는 비율에 따라 추가했다. <br>
알파벳의 위치는 고정픽셀을 사용하지 않고 css의 %에 따라 결정된다. <br>
최근에 옮긴 알파벳이 가장 위로 올라가도록 z-index를 매번 드래그를 한 순간의 Date.now() 값으로 업데이트 한다. <br>
<br>
그리고 HTML5에 도입됬다는 드래그앤 드롭을 사용했다. 예전에 처음 자바스크립트를 배울때 책에서 jquery를 사용해여 드래그 앤 드롭을 구현해본적이 있는데 그것에 비하면 확실히 편리했다. <br>
<br>

###### Board

aphabet 컴포넌트들을 담는 게임판 컴포넌트. <br>
<br>
alphabet 컴포넌트와는 이벤트 바인딩을 이용해 소통한다. <br>
리액트에 비해 vue의 양방향 데이터 흐름은 상당히 편리했다. 리액트는 밑에서 위로 데이터를 보내기위해 사실상 redux의 사용이 강제되는데 vue는 그렇지 않다. 앵귤러쪽에 가까운 컨셉인듯 싶다. 사용법도 간단하고 딱히 프레임워크 자체의 복잡성을 증대시키지도 않아보였다. <br>
<br>

###### TopNav

사용자의 로그인을 담당하는 탑 네비게이션 컴포넌트. <br>
<br>
겉으로 보기에는 로그인버튼 하나밖에 없으며 파이어베이스를 사용하여 인증을 하는것이 주 목적인 컴포넌트다. <br>
<br>
사용자가 로그인을 하면 페이스북측에서 쏴주는 사용자의 정보(프로필사진, 이메일)가 TopNav 말고도 Board 에서도 필요 하길래 이것저것 시도해보다 결국 Vuex까지 배워야하나.. 싶었지만 어찌어찌 몽키패치(setTimeout)를 해서 해결했다. <br>
<br>

<br>
<br>

### 스택

###### Vue
클라이언트 프레임워크
[Vue](https://vuejs.org/)

###### vue-material
UI 컴포넌트 라이브러리
[vue-material](https://vuematerial.io/)

###### axios
HTTP 요청 라이브러리
[axios](https://www.npmjs.com/package/axios)

###### Firebase
서버리스 데이터베이스, 사용자 인증, 클라우드함수, 호스팅 플랫폼
[Firebase](https://firebase.google.com/?hl=ko)

<br>
<br>
<br>

### 마치며

![vue-react-angular](https://user-images.githubusercontent.com/47002080/52172631-0fdab280-27b7-11e9-9a36-f3c07704c2f9.jpg)

Vue를 사용하며 받은 인상은 "간결하다" 였다. <br>
<br>
사용자를 많이 배려한게 느껴졌다. Vue의 문서는 한글화가 잘되있다고 들었는데 직접 보니 괜찮았다. <br>
<br>
문서를 읽다보면 Vue의 핵심 철학인 '선언형' 프로그래밍이 뭔지 감을 잡을수 있어서 좋았다. 실제로 Vue를 사용하면서, 변수를 바꿀때마다 '이렇게 해도 반응하나?' 싶은 경우도 전부 렌더링에 반영되는걸 보고 감탄했다. <br>
<br>
자세한건 코드를 뜯어보지 않아서 모르겠지만 아마도 Object.defineProperty로 set 프로퍼티에 뭔가 장치를 해둔거 같다. 예전에 es6 공부할때는 이런게 이런게 왜 필요하지? 궁금했는데 이렇게 쓰이는거구나 하고 느꼈다. <br>
<br>
그리고가장 좋았던 점은 html, javascript, css 파일을 하나로 묶은 싱글 파일 컴포넌트였다. <br>
<br>
[리액트로 만든 블로그](https://github.com/seyoongit/blog) 프로젝트를 할때는 각 컴포넌트의 디렉토리마다 css를 담는 디렉토리를 따로 만들어서 관리했었는데, 이에 비해 상당히 편리했다. <br>
사실 생각해보면 html과 자바스크립트는 한군데에 모았는데 css만 따로 떼놓고 본다는것도 좀 앞뒤가 안맞는듯 하다. 리액트도 이렇게 css까지 포함하게끔 바뀌면 좋을거 같다는 생각을 했다. <br>
<br>
디버깅 환경은 리액트에 비해서는 별로였다. 코드에 뭔가 버그가있으면 에러메세지를 띄우는 경우보다 그냥 아무것도 작동이 안되고 가만히 있는 경우가 많았다. 가끔 에러메세지를 주긴 하는데 내용도 그다지 구체적이지는 않았다. <br>
<br>
무엇보다 '핫 리로드'가 될때도 있고 안될때도 있어서 이건 좀 별로였다. 코드를 수정했는데 계속 버그가 있길래 한참 디버깅했는데 우연히 새로고침을 한번 하니까 그제야 적용되는 경우가 있어서 그 이후 매번 F5를 눌러가며 코딩했다. <br>
<br>
여튼 이렇게 react, vue, angular 하나씩 해보기 계획중 하나인 vue 프로젝트가 끝났다.  
<br>
<br>

![happy](https://user-images.githubusercontent.com/47002080/52172621-c5f1cc80-27b6-11e9-81e8-27887a72cd9c.gif)


 
