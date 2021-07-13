# React Youtube

Youtube API를 이용한 React 클론 코딩 강의를 듣고 세부 기능을 더 구현했습니다.
반응형 웹 페이지입니다.

💻  


 ## 🛠 Skill & Tool
 **`HTML5`**  **`CSS3`**  **`Javascript`**  **`React.js`**  **`npm`** **`fontawesome`**


## 💡 기능
### Youtube API를 사용해 받아온 비디오 데이터로 기본 화면 구현 👓
 - Video API에서 받아와 가공한 비디오 데이터로 Channel API를 새로 호출하여 받은 channel 정보 및 조회수, 게시일 등 표시
 - 비디오 데이터로 받아온 토큰을 API로 보내 다음 페이지로 보여주는 무한 스크롤링 페이지네이션 구현
 
### 비디오 Search 기능 구현 🔍
 
### 비디오 클릭 시 비디오 디테일 화면으로 라우터 이동 📜
 - 비디오 ID를 이용해 비디오 디테일의 라우터 URL 생성
 - API에서 받아온 비디오 데이터를 가공하여 channel 정보 및 조회수, 좋아요 수 등 표시
 - useParams()로 넘겨 받은 비디오 ID로 Comments API를 호출하여 해당 컨텐츠에 관련된 댓글 정보를 받아서 표시
 
## 📖 프로젝트를 하며 배운 것
    
 - **react-router-dom의 hook 사용**  
  **useParams()**  : path의 parameter의 정보를 얻을 수 있다. useParams()를 사용하기 위해서 Route의 path에 동적 라우팅 설정을 해주어야 한다. 
  기존에는 match props를 이용하여 match.params.videoId의 형식으로 접근 해야 했지만 useParams를 이용하면 간단하게 접근 가능하다.
   ```
   // Router.jsx
   <Route path="/video/:videoId" render={()=> <SelectedVideo youtube={youtube} />} />
   
   // SelectedVideo.jsx
   const { videoId } = useParams();
   const getSelectedVideo = async () => {
      youtube.getVideoList(videoId).then(video => { ... }
   }
   ```
   **useHistory()**  : Route 태그의 부모 요소인 BrowserRouter, Switch에 의해 Route 태그의 컴포넌트의 defaultProps에는 history 객체가 들어가게 되고, 
   이 객체를 이용하여 리액트 어플리케이션 내에서 라우팅이 가능하다. history 객체를 사용하기 위해서 withRouter로 컴포넌트를 감싸주어야 하는데, 
   react-router-dom의 useHistory라는 hook이 일반적인 history 객체와 똑같은 객체를 가지므로 history 객체 사용에 더 용이하다.    
       
       
   **useLocation()**  : 현재 페이지에 대한 정보를 알려준다. pathname과 search 등의 객체가 출력된다. 
   웹 url이 localhost:3000/search?query=유퀴즈 라고 가정하면 pathname은 /search가, search는 ?query=유퀴즈 가 출력된다.    
   이 프로젝트에서는 검색어를 url로 push 하여 useLocation을 이용해 search 객체로 그 url의 쿼리스트링을 받아와 
   검색어만 추출하여 API로 보내 검색한 내용의 비디오 데이터를 호출한다.
   ```
   // Search.jsx
   const history = useHistory();
   const onSearch = (value) => {
      history.push(`/search?query=${value}`);
   };
   ```
   ```
   // SearchVideoList.jsx
   const { search } = useLocation();
   const onSearch = (query, searchNextPageToken) => {
      youtube.search(query, searchNextPageToken).then(result => { ... }
   }
    useEffect(() => {
      const query = search.split("=")[1];
      onSearch(query);
    }, [search]);
   ```
    
 