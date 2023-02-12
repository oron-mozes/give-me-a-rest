#! /usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createBuilderFunction = exports.createBuilderString = exports.setFnKeyName = exports.generateInitialData = void 0;
var json_schema_to_typescript_1 = require("json-schema-to-typescript");
var node_path_1 = __importDefault(require("node:path"));
var json_schema_ref_parser_1 = __importDefault(require("@apidevtools/json-schema-ref-parser"));
var fs = __importStar(require("fs"));
var withFnTemplate = fs.readFileSync(node_path_1["default"].resolve(__dirname, "generator/withFnTemplate.txt"), {
    encoding: "utf8",
    flag: "r"
});
function getTypeDefaultValue(type) {
    return "";
}
function generateInitialData(requiredFields, parsedData) {
    var initialData = {};
    if (!Array.isArray(requiredFields)) {
        return initialData;
    }
    for (var _i = 0, requiredFields_1 = requiredFields; _i < requiredFields_1.length; _i++) {
        var mustHave = requiredFields_1[_i];
        initialData[mustHave] = getTypeDefaultValue(parsedData.properties[mustHave].type);
    }
    return initialData;
}
exports.generateInitialData = generateInitialData;
function setFnKeyName(key) {
    return "".concat(key.substring(0, 1).toUpperCase()).concat(key.substring(1));
}
exports.setFnKeyName = setFnKeyName;
function createBuilderString(fnName, key, type) {
    return withFnTemplate
        .replace(/#key#/g, key)
        .replace("#fnName#", fnName)
        .replace("#type#", type);
}
exports.createBuilderString = createBuilderString;
var createBuilderFunction = function (schemaKeName, template, swaggerData) { return __awaiter(void 0, void 0, void 0, function () {
    var handlers, parsedData, data, builderInterface, initialData, key, fnName;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                handlers = [];
                return [4 /*yield*/, json_schema_ref_parser_1["default"].dereference(swaggerData)];
            case 1:
                parsedData = _c.sent();
                data = parsedData.components.schemas[schemaKeName];
                return [4 /*yield*/, (0, json_schema_to_typescript_1.compile)(
                    //@ts-ignore
                    parsedData.components.schemas, schemaKeName)];
            case 2:
                builderInterface = _c.sent();
                initialData = generateInitialData(data.required, data);
                for (key in data.properties) {
                    fnName = setFnKeyName(key);
                    handlers.push(createBuilderString(fnName, key, 
                    //@ts-ignore
                    (_b = (_a = data.properties[key]) === null || _a === void 0 ? void 0 : _a.type) !== null && _b !== void 0 ? _b : "unknown"));
                }
                template = template
                    .replace("#handlers#", handlers.join(""))
                    .replace("#name#", schemaKeName)
                    .replace("#interface#", schemaKeName)
                    .replace("#builderInterface#", builderInterface)
                    .replace("#defaultData#", JSON.stringify(initialData));
                console.log("???", template);
                return [2 /*return*/, template];
        }
    });
}); };
exports.createBuilderFunction = createBuilderFunction;
