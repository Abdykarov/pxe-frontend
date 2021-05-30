export enum SCROLL_TO {
    HELP,
    HOW_IT_WORKS,
    BEST_PRICES_IN_THE_WORLD,
    FAQ,
    BLOG,
}

export const LP_SCROLL = [
    {
        SCROLL_TO: SCROLL_TO.HELP,
        fragment: 's-cim-vam-pomuzeme',
    },
    {
        SCROLL_TO: SCROLL_TO.HOW_IT_WORKS,
        fragment: 'jak-to-funguje',
    },
    {
        SCROLL_TO: SCROLL_TO.BEST_PRICES_IN_THE_WORLD,
        fragment: 'vice-o-cenach',
    },
    {
        SCROLL_TO: SCROLL_TO.FAQ,
        fragment: 'faq',
    },
    {
        SCROLL_TO: SCROLL_TO.BLOG,
        fragment: 'blog',
    },
];
