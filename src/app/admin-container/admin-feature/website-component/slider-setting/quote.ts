export class Quote {
    author: string;
    content: string;
    constructor(quote:{
        author?: string;
        content?: string;
    } = {}) {
        this.author = quote.author || '';
        this.content = quote.content || '';
    }
}