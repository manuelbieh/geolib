import { sexagesimalPattern } from './constants';

const isSexagesimal = (value: any) =>
    sexagesimalPattern.test(value.toString().trim());

export default isSexagesimal;
