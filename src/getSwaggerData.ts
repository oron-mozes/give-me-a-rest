#! /usr/bin/env node

import * as fs from "fs";

export const getSwaggerData = (path: string) =>
  JSON.parse(
    fs.readFileSync(path, {
      encoding: "utf8",
      flag: "r",
    })
  );
