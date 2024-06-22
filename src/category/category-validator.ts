import { checkSchema } from "express-validator";

export default checkSchema({
    name: {
        exists: {
            errorMessage: "Category name is required",
        },
        isString: {
            errorMessage: "Category name should be of type string",
        },
    },
    priceConfiguration: {
        exists: {
            errorMessage: "priceConfiguration is required",
        },
    },
    "priceConfiguration.*.priceType": {
        exists: {
            errorMessage: ["Price type is required"],
        },
        custom: {
            options: (value: "base" | "additional") => {
                const validKeys = ["base", "additional"];
                if (!validKeys.includes(value)) {
                    throw new Error(
                        `${value} is invalid attribute for priceType field. Possible values are:[${validKeys.join(
                            ", ",
                        )}]`,
                    );
                }

                return true;
            },
        },
    },
    attributes: {
        exists: {
            errorMessage: ["Attributes field is required"],
        },
    },
});
