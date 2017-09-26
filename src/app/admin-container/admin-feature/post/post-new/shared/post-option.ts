import { SeoOption } from './seo-option';

export class Image {
  url: string;
  name: string;
}

export class PostOption {
    image: Image;
    date: Date;
    slug: string;
    tags: {};
    author: string;
    categoryFeature: string;
    category: string;
    seo: SeoOption;

    constructor(option: {
      image?: Image,
      date?: Date,
      slug?: string,
      category?: string,
      tags?: {},
      categoryFeature?: string,
      author?: string,
      seo?: SeoOption
    } = {}) {
      this.image = option.image || { name: '',url: ''};
      this.date =  option.date || new Date();
      this.slug =  option.slug || '';
      this.category = option.category || '';
      this.tags = option.tags || {0:''};
      this.categoryFeature = option.categoryFeature || null;
      if(option.author) this.author =  option.author || '';
      this.seo = option.seo || new SeoOption();
    }
    
}