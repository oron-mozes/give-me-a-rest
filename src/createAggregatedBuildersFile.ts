#! /usr/bin/env node

import * as fs from "fs";

export const createAggregatedBuildersFile = (data: string) => {
  fs.writeFileSync(`./builders.ts`, data);
};
