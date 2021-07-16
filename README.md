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
  
 - **fetch() 로 네트워크 통신**    
   fetch() 함수는 첫 번째 인자로 요청 보낼 URL, 두 번째 인자로 option 객체를 받고, Promise 타입의 객체를 반환한다. 반환된 객체는 API 호출이 성공 했을 경우, 응답(respone) 객체를 resolve 하고, 실패한 경우, 예외(error) 객체를 reject 한다.
    ```
      fecth(url, options)
       .then(response => console.log(`response : ${response}`))
       .catch(error => console.log(`error : ${error}`))
   ```
   options 객체에는 HTTP 방식(method), HTTP 요청 헤더(headers), HTTP 요청 전문(body) 등을 설정해 줄 수 있다. 응답(response) 객체로부터는 HTTP 응답 상태(status), HTTP 응답 헤더(headers), HTTP 응답 전문(body) 등을 읽어올 수 있다.     
    fetch() 함수는 디폴트로 GET 방식으로 작동하고 GET 방식은 요청 전문(body)는 받지 않기 때문에 option 인자를 보내지 않아도 된다.     
     ```
        fecth(url)
        .then(response => console.log(response))
     ```
    대부분의 REST API들은 JSON 형태의 데이터를 응답하기 때문에, 응답(response)객체는 json() 메서드를 제공한다.    
    단순히 특정 API에 저장된 데이터를 보여주는 웹페이지나 어플리케이션에서는 GET 방식의 HTTP 통신으로 충분하다. 그러나 fetch()는 예전 버전의 브라우저에서는 작동하지 않는 단점이 있다!!    
    
    ```// youtube.js
    class Youtube{
        constructor(key) {
            this.key = key;
            this.getRequestOptions = {
                method: 'GET',
                redirect: 'follow',
            }
        }

      async mostPopular() {
        const response = await fecth(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=kr&maxResults=24&part=statistics&key=${this.key}`, this.getRequestOptions);
        const result = await response.json();
        return result.items;	
      }
    }
    ```
     
 