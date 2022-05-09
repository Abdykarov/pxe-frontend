// link has to start with "/" to be considered as internal link
export const isRouterLink = (link: string): boolean =>
    /^\/[a-z0-9]+/i.test(link);
