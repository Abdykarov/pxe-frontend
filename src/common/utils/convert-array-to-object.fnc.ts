export const convertArrayToObject = (arr, key) =>
    arr.reduce((acc, cur, i) => {
        if (!!cur[key]) {
            acc[cur[key]] = cur;
        } else if (!!cur.id) {
            acc[cur.id] = cur;
        } else {
            acc[i] = cur;
        }
        return acc;
    }, {});
