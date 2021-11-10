export const omitTypeName = (data: any) => {
    const omitTypename = (key, value) =>
        key === '__typename' ? undefined : value;
    console.log('5');
    return JSON.parse(JSON.stringify(data), omitTypename);
};
