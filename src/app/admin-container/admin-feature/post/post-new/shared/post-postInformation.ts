export class PostInformation {
    comment: number;
    love: number;
    share: number;
    constructor(info:{
        comment?: number,
        love?: number,
        share?: number
    }={}) {
        this.comment = info.comment || 0;
        this.love = info.love || 0;
        this.share = info.share || 0;
    }

}