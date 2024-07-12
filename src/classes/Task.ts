import type { Performer } from "./Performer"

export class Task extends Object{
    public id : number;
    public title : string;
    public content : string;
    public performer : Performer;

    constructor(id: number, title: string, content: string, performer: Performer){
        super();
        this.id = id;
        this.title = title;
        this.content = content;
        this.performer = performer;
    }
}