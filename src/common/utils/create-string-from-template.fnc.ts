export const createStringFromTemplate = (template, variables, pipes = null) => {
    return template
        ? template.replace(new RegExp('{([^{]+)}', 'g'), (_, varName) => {
              const [value, pipeValue] = varName.split('|');
              if (pipeValue && pipes) {
                  return pipes.transform(variables[value], pipeValue);
              }
              return variables[value];
          })
        : '';
};
