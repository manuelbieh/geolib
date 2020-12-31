import { sexagesimalPattern } from './constants';

const isSexagesimal = (value: any): value is number | string =>
    sexagesimalPattern.test(value.toString().trim());

export default isSexagesimal;
