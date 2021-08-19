"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = exports.getStoriesFile = exports.getStoriesDir = exports.getStories = exports.getStoryManifest = exports.getManifestFilePath = exports.defaultConfig = exports.storiesDirName = void 0;
var path_1 = __importDefault(require("path"));
exports.storiesDirName = '__generated__/stories';
exports.defaultConfig = {
    projectRoot: process.cwd(),
    watchRoot: process.cwd(),
};
function getManifestFilePath(projectRoot) {
    var manifestFilePath = path_1.default.resolve(projectRoot, exports.storiesDirName, 'storyManifest.json');
    return manifestFilePath;
}
exports.getManifestFilePath = getManifestFilePath;
function getStoryManifest(projectRoot) {
    var manifestFilePath = getManifestFilePath(projectRoot);
    var storyManifest = require(manifestFilePath);
    return storyManifest;
}
exports.getStoryManifest = getStoryManifest;
function getStories(config) {
    var storyManifest = getStoryManifest(config.projectRoot);
    var stories = Object.keys(storyManifest.files).map(function (key) {
        return storyManifest.files[key];
    });
    return stories;
}
exports.getStories = getStories;
function getStoriesDir(config) {
    var storiesDir = path_1.default.resolve(config.projectRoot, exports.storiesDirName);
    return storiesDir;
}
exports.getStoriesDir = getStoriesDir;
function getStoriesFile(config) {
    var storiesDir = getStoriesDir(config);
    var storyFile = path_1.default.resolve(storiesDir, 'stories.js');
    return storyFile;
}
exports.getStoriesFile = getStoriesFile;
function generateId(filePath) {
    // replaces all non-alphabet characters in the filePath
    var id = filePath.replace(/[^a-zA-Z]+/gi, '');
    return id;
}
exports.generateId = generateId;
//# sourceMappingURL=shared.js.map