import type { Task } from "./Task.js"

export class Column extends Object {
    public id : number = 0;
    public header : string = '';
    public items : Task[] = [];

    constructor(id : number, header : string, items : Task[]) {
        super();
        this.id = id;
        this.header = header;
        this.items = items;
    }
}