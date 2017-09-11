export class Category {
    name: string;
    url: string;
    onNavbar: boolean;
    description: string;
    constructor(setting: {
        name?: string,
        url?: string,
        onNavbar?: boolean,
        description?: string
    } = {}) {
        this.name = setting.name || '';
        this.description = setting.description || '';
        this.url = setting.url || '';
        this.onNavbar = setting.onNavbar || false;
    }
}
