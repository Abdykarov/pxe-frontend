export enum SCROLL_TO {
    HELP,
    HOW_IT_WORKS,
    BEST_PRICES_IN_THE_WORLD,
    FAQ,
    BLOG,
}

export interface IScrollSetting {
    scrollTo: SCROLL_TO;
    fragment: string;
}

export interface IScrollSettings extends Array<IScrollSetting> {}
