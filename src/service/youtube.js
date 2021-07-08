class Youtube{
    constructor(key) {
        this.key = key;
        this.getRequestOptions = {
            method: 'GET',
            redirect: 'follow',
        }
    }

    async mostPopular(nextPageToken) {
        let pageToken = (typeof nextPageToken === "undefined") ? "" : `&pageToken=${nextPageToken}`;

        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=kr&maxResults=24&part=statistics&key=${this.key}${pageToken}`, this.getRequestOptions);
        const result = await response.json();
        return result;
    }

    async getChannelList(channelIdList) {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIdList}&part=statistics&key=${this.key}`, this.getRequestOptions);
        const result = await response.json();
        return result.items;
    }

    async search(query, nextPageToken) {
        let pageToken = (typeof nextPageToken === "undefined") ? "" : `&pageToken=${nextPageToken}`

        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&q=${query}&type=video&key=${this.key}${pageToken}`, this.getRequestOptions);
        const result = await response.json();
        console.log("검색 ", result, result.nextPageToken)
        // return result.items, result.nextPageToken;
        return result
    }

    async getVideoList(videoIdList) {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&maxResults=24&part=statistics&id=${videoIdList}&key=${this.key}`, this.getRequestOptions);
        const result = await response.json();
        return result.items;
    }

    async getCommentList(videoId) {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&textFormat=plainText&maxResults=12&videoId=${videoId}&key=${this.key}`, this.getRequestOptions);
        const result = await response.json();
        return result.items;
    }

}

export default Youtube;