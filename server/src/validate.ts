import Ajv, { Schema } from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validateJson = (data: string | object, schema: Schema) => {
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (!valid) {
        console.log(validate.errors);
        return validate.errors;
    }
    return undefined;
};

export default validateJson;
