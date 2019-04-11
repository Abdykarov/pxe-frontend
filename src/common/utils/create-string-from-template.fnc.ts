export const createStringFromTemplate = (template, variables)  => {
    return template ? template.replace(
        new RegExp('\{([^\{]+)\}', 'g'),
        (_, varName) => variables[varName],
    ) : '';
};
