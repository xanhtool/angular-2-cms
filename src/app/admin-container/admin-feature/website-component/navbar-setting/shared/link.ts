export class Link {
    content: string;
    url: string;
    constructor(link: {
        content?: string,
        url?: string
    } = {}) {
        this.content = link.content || '';
        this.url = link.url || '';
    }
}