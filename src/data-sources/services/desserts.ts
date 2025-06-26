import * as fs from 'fs/promises';
import { Dessert } from '../../common/models/dessert';
import { readFileSync } from 'fs';
import { join } from 'path';

export const getDesserts = async (): Promise<Dessert[]> => {
  try {
    const desserts = JSON.parse(readFileSync(join(__dirname, "..", "data", "desserts.json"), "utf-8"))

    return desserts;
  } catch (err) {
    console.error(`Failed to read or parse desserts file: ${err}`);
    throw err;
  }
};
