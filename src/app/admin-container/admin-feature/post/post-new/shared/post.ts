import { PostMark } from './../post-mark';
import { PostInformation } from './post-postInformation';
import { PostOption } from './post-option';

export class Post {
    authorUid: string;
    title: string;
    subtitle:string;
    content: string;
    postOption: PostOption;
    postInformation: PostInformation;
    postMark: PostMark;
    constructor (post:{
        authorUid: string;
        title: string;
        subtitle:string;
        content: string;
        postMark: PostMark;
        postOption: PostOption;
        postInformation: PostInformation;
    }) {
        this.authorUid = post.authorUid || '';
        this.title = post.title || '';
        this.subtitle = post.subtitle || '';
        this.content = post.content || '';
        this.postOption = post.postOption || new PostOption();
        this.postInformation = post.postInformation || new PostInformation();
        this.postMark = post.postMark || new PostMark();
    }

    
}