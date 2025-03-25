import { checkSchema } from 'express-validator';
export default checkSchema({
    name: {
        exists: {
            errorMessage: 'category is required',
        },
        isString: {
            errorMessage: 'category name should be a string',
        },
    },
    priceConfiguration: {
        exists: {
            errorMessage: 'price configuration is required',
        },
    },
    'priceConfiguration.*.priceType': {
        exists: {
            errorMessage: 'price type is required',
        },
        custom: {
            options: (value: string) => {
                const validKeys = ['base', 'additional'];
                if (!validKeys.includes(value)) {
                    throw new Error(
                        `${value} is invalid attribute for priceType field. Possible values are: [${validKeys.join(', ')}]`,
                    );
                }

                return true;
            },
        },
    },
    attributes: {
        exists: {
            errorMessage: 'Attributes field is required',
        },
    },
});
