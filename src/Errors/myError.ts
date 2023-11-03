export default class myError extends Error{
    type: string;

    constructor(message, type){
        super(message);
        this.name = this.constructor.name;
        this.type = type;
    }
}