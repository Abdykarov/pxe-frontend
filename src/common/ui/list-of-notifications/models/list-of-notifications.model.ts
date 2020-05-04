export interface IListOfNotifications {
    maxShowNotifications?: number;
    headerText: string;
    notifications: string[];
    emptyNotifications?: string;
}

export enum TypeOfList {
    NUMBER,
    CHECKLIST,
}
