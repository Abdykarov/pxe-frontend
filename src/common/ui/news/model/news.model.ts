export interface INews extends Array<INew> {}

export interface INew {
    date: Date;
    text: string;
}
