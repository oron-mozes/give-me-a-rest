import {
  generateInitialData,
  setFnKeyName,
  createBuilderString,
  createBuilderFunction,
} from "./createBuilderFunction";
import * as fs from "fs";
import * as path from "node:path";
import swaggerData from "../docs/swagger.json";
import $RefParser from "@apidevtools/json-schema-ref-parser";

const builderTemplate = fs.readFileSync(
  path.resolve(__dirname, "generator/builderTemplate.txt"),
  {
    encoding: "utf8",
    flag: "r",
  }
);
describe("create builder", () => {
  it("should create builder initial data", () => {
    expect(
      generateInitialData(["id"], { properties: { id: { type: "string" } } })
    ).toEqual({ id: "" });
    expect(
      generateInitialData(["id", "age"], {
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          age: { type: "number" },
        },
      })
    ).toEqual({ id: "", age: "" });
  });

  it("should return formatted key name", () => {
    expect(setFnKeyName("test")).toEqual("Test");
  });

  it("should return withAnyFn format", () => {
    expect(createBuilderString("Test", "test", "string")).toEqual(
      `withTest(test:string){\ndata.test = test\nreturn this\n}.`
    );
  });

  // it.only("should validate parsedStructure", async () => {
  //   const parse = await $RefParser.dereference(swaggerData);
  //   expect(parse).toEqual("");
  // });
});
