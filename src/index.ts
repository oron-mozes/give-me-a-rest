#! /usr/bin/env node

import fs from "fs";
import path from "node:path";

import { getSwaggerData } from "./getSwaggerData";
import { createBuilderFunction } from "./createBuilderFunction";
import { createAggregatedBuildersFile } from "./createAggregatedBuildersFile";

const config: { path: string[] } = JSON.parse(
  fs.readFileSync("./rest.config.json", {
    encoding: "utf8",
  })
);

const { path: swaggerFilesPath } = config;
const builderTemplate = fs.readFileSync(
  path.resolve(__dirname, "generator/builderTemplate.txt"),
  {
    encoding: "utf8",
    flag: "r",
  }
);

if (!swaggerFilesPath) {
  throw "missing file path";
}
const buildersData: string[] = [];
async function generate(path: string) {
  const swaggerData = getSwaggerData(path);
  for (const schemaKey in swaggerData.components.schemas) {
    buildersData.push(
      await createBuilderFunction(schemaKey, builderTemplate, swaggerData)
    );
  }
}
(async () => {
  for (const path of swaggerFilesPath) {
    await generate(path);
  }

  createAggregatedBuildersFile(buildersData.join(" "));
})();
