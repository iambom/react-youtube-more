export const infiniteScroll = (nextPageToken, api, query) => {
  let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
  let clientHeight = document.documentElement.clientHeight;

  if(scrollTop + clientHeight === scrollHeight) {
      if(typeof nextPageToken === "undefined") return;
      if(query) {
        api(query, nextPageToken);
      }else{
        console.log('다음 토큰 ',nextPageToken)
        api(nextPageToken);
      }
  }
};

