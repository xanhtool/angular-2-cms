export class PostMark {
    isPublished: boolean;
    isFeatured: boolean;
    isHome: boolean;
    publishType: string;
    featureType: string;
    constructor(setting:{
        isPublished?: boolean,
        isFeatured?: boolean,
        isHome?: boolean,
        publishType?: string,
        featureType?: string,
    }={}){
        this.isPublished = setting.isPublished || false;
        this.isFeatured = setting.isFeatured || false;
        this.isHome = setting.isHome || false;
        this.publishType = setting.publishType || null;
        this.featureType = setting.featureType || null;
    }
}