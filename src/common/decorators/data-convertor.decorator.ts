export function DataConvertor(convertor: (value: any) => any) {
    return (target: object, key: string) => {
        const definition = Object.getOwnPropertyDescriptor(target, key);
        if (definition) {
            Object.defineProperty(target, key, {
                get: definition.get,
                set: (newValue) => {
                    definition.set(convertor(newValue));
                },
                enumerable: true,
                configurable: true,
            });
        } else {
            Object.defineProperty(target, key, {
                get: function () {
                    return this['__' + key];
                },
                set: function (newValue) {
                    this['__' + key] = convertor(newValue);
                },
                enumerable: true,
                configurable: true,
            });
        }
    };
}
