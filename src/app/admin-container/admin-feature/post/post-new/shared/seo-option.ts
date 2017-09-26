export class SeoOption {

    constructor(option:{
        title?: string,
        description?: string,
        keywords?:string,
        author?: string

    } = {}) {
        this.title = option.title || '';
        this.description = option.description || '';
        this.keywords = option.keywords || '';
        this.author = option.author || '';
    }

    title: string;
    description: string;
    keywords: string;
    author: string;
}