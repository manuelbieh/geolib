import { sexagesimalPattern } from './constants';

const isSexagesimal = (value: any) =>
    value !== undefined &&
    value !== null &&
    sexagesimalPattern.test(value.toString().trim());

export default isSexagesimal;
