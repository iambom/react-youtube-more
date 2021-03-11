// class Youtube{
//     constructor(httpClient) {
//         this.youtube = httpClient;
//     }

//     async mostPopular() {
//         const response = await this.youtube.get('videos', {
//             params: {
//                 part: 'snippet',
//                 chart: 'mostPopular',
//                 maxResults: 20,
//             }
//         });
//         console.log(response)
//     }
// }

// export default Youtube;