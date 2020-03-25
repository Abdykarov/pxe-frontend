export const convertArrayToObject = (arr, key, conditionFnc = null) =>
    arr.reduce((acc, cur, i) => {
        if (conditionFnc && !conditionFnc(cur)) {
            return acc;
        }

        if (!!cur[key]) {
            acc[cur[key]] = cur;
        } else if (!!cur.id) {
            acc[cur.id] = cur;
        } else {
            acc[i] = cur;
        }
        return acc;
    }, {});
