#! /usr/bin/env node
export declare function generateInitialData(requiredFields: string[], parsedData: Record<string, any>): Record<string, any>;
export declare function setFnKeyName(key: string): string;
export declare function createBuilderString(fnName: string, key: string, type: "string"): string;
export declare const createBuilderFunction: (schemaKeName: string, template: string, swaggerData: Record<string, any>) => Promise<string>;
//# sourceMappingURL=createBuilderFunction.d.ts.map