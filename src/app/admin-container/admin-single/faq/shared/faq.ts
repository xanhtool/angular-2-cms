export class Faq {
    question: string = '';
    answer: string = '';
    constructor(setting : {
        question?: string,
        answer?: string
    } = {}) {
        this.question = ''  || setting.question;
        this.answer = '' || setting.answer;
    }

}