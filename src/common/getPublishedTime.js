export const getPublishedTime = (publishedAt) => {
    let now = new Date(); 
    let writeDay = new Date(publishedAt);
    let answer = '';
    let publishedTime = '';
    if(now.getFullYear() > writeDay.getFullYear()) {
        answer = now.getFullYear() - writeDay.getFullYear();
        publishedTime = `${answer}년 전`
    }else if(now.getMonth() > writeDay.getMonth()) {
        answer = now.getMonth() - writeDay.getMonth();
        publishedTime = `${answer}개월 전`;
    }else if(now.getDate() > writeDay.getDate()) {
        answer = now.getDate() - writeDay.getDate();
        publishedTime = `${answer}일 전`;
    }else if(now.getDate() === writeDay.getDate()){
        let nowTime = now.getTime();
        let writeTime = writeDay.getTime();
        if(nowTime > writeTime) {
            let sec, min, hour, day;
            sec = parseInt(nowTime - writeTime) / 1000;
            day = parseInt(sec/60/60/24);
            sec = (sec - (day * 60 * 60 * 24));
            hour = parseInt(sec/60/60);
            sec = (sec - (hour*60*60));
            min = parseInt(sec/60);
            sec = parseInt(sec-(min*60));
            if(hour > 0) {
                publishedTime = `${hour}시간 전`;
            }else if(min > 0) {
                publishedTime = `${min}분 전`;
            }else if(sec > 0) {
                publishedTime = `${sec}초 전`;
            }
        }
    }
    return publishedTime;
};