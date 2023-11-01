import { v4 as uuid } from 'uuid';

export const generateRandomId = () => uuid();

export const createEnum = (obj) =>
  Object.entries(obj).reduce(
    (acc, [key, value], index) => ({
      ...acc,
      [key]: {
        name: key,
        index,
        ...value,
      },
    }),
    {},
  );
