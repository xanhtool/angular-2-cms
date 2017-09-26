import { PostMark } from './../post-mark';
import { PostInformation } from './post-postInformation';
import { PostOption } from './post-option';

export class Post {
    uid: string;
    authorUid: string;
    title: string;
    subtitle:string;
    content: string;
    postOption: PostOption;
    postInformation: PostInformation;
    postMark: PostMark;
    constructor (post:{
        $key: string;
        uid: string;
        authorUid: string;
        title: string;
        subtitle:string;
        content: string;
        postMark: PostMark;
        postOption: PostOption;
        postInformation: PostInformation;
    }) {
        this.uid = post.$key || post.uid || '';
        this.authorUid = post.authorUid || '';
        this.title = post.title || '';
        this.subtitle = post.subtitle || '';
        this.content = post.content || '';
        this.postOption = new PostOption(post.postOption) || new PostOption();
        this.postInformation = new PostInformation(post.postInformation) || new PostInformation();
        this.postMark = new PostMark(post.postMark) || new PostMark();
    }

    
}