class Youtube{
    constructor(key) {
        this.key = key;
        this.getRequestOptions = {
            method: 'GET',
            redirect: 'follow',
        }
    }

    async mostPopular() {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=kr&maxResults=25&part=statistics&key=${this.key}`, this.getRequestOptions);
        const result = await response.json();
        return result.items;
    }

    async search(query) {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&key=${this.key}`, this.getRequestOptions);
        const result = await response.json();
        console.log("검색 ", query ,result)
        return result.items
    }

    async getVideoList(videoIdList) {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&regionCode=kr&maxResults=25&part=statistics&id=${videoIdList}&key=${this.key}`, this.getRequestOptions);
        const result = await response.json();
        return result.items;
    }

}

export default Youtube;