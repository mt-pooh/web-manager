import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import TypeSchema from '../schema/TypeSchema.json';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validate = ajv.compile(TypeSchema.properties.TyHotelList);

const testData = [
    { hotelId: '1111111', startDate: '2021-06-20', endDate: '2021-07-10' },
    { hotelId: '2222222', startDate: '2021-05-20', endDate: '2021-06-10' },
    { hotelId: '3333333', startDate: '2021-07-20', endDate: '2021-08-10' },
    { hotelId: '444444', startDate: '2021-08-20', endDate: '2021-09-10' },
];

const valid = validate(testData);

if (!valid) {
    console.log(validate.errors);
}
