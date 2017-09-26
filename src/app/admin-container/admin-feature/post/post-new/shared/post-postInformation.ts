export class PostInformation {
    view: number;
    love: number;
    share: number;
    constructor(info:{
        view?: number,
        love?: number,
        share?: number
    }={}) {
        this.view = info.view || 0;
        this.love = info.love || 0;
        this.share = info.share || 0;
    }

}