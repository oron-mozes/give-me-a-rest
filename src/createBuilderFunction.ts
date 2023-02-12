#! /usr/bin/env node
import { compile } from "json-schema-to-typescript";
import path from "node:path";
import $RefParser from "@apidevtools/json-schema-ref-parser";
import * as fs from "fs";

const withFnTemplate = fs.readFileSync(
  path.resolve(__dirname, "generator/withFnTemplate.txt"),
  {
    encoding: "utf8",
    flag: "r",
  }
);
function getTypeDefaultValue(type: string) {
  return "";
}

export function generateInitialData(
  requiredFields: string[],
  parsedData: Record<string, any>
) {
  const initialData: Record<string, any> = {};
  if (!Array.isArray(requiredFields)) {
    return initialData;
  }

  for (const mustHave of requiredFields) {
    initialData[mustHave] = getTypeDefaultValue(
      parsedData.properties[mustHave].type
    );
  }

  return initialData;
}

export function setFnKeyName(key: string): string {
  return `${key.substring(0, 1).toUpperCase()}${key.substring(1)}`;
}

export function createBuilderString(
  fnName: string,
  key: string,
  type: "string"
): string {
  return withFnTemplate
    .replace(/#key#/g, key)
    .replace("#fnName#", fnName)
    .replace("#type#", type);
}

export const createBuilderFunction = async (
  schemaKeName: string,
  template: string,
  swaggerData: Record<string, any>
) => {
  const handlers = [];

  const parsedData = await $RefParser.dereference(swaggerData);
  //@ts-ignore
  const data = parsedData.components.schemas[schemaKeName];

  const builderInterface = await compile(
    //@ts-ignore
    parsedData.components.schemas,
    schemaKeName
  );
  const initialData = generateInitialData(data.required, data);

  for (const key in data.properties) {
    const fnName = setFnKeyName(key);

    handlers.push(
      createBuilderString(
        fnName,
        key,
        //@ts-ignore
        data.properties[key]?.type ?? "unknown"
      )
    );
  }

  template = template
    .replace("#handlers#", handlers.join(""))
    .replace("#name#", schemaKeName)
    .replace("#interface#", schemaKeName)
    .replace("#builderInterface#", builderInterface)
    .replace("#defaultData#", JSON.stringify(initialData));
  console.log("???", template);
  return template;
};
