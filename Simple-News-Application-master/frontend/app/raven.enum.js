"use strict";
var Config;
(function (Config) {
    Config[Config["ApiUrl"] = "http://localhost:3003/"] = "ApiUrl";
    Config[Config["UploadUrl"] = "http://localhost:3003/uploads"] = "UploadUrl";
})(Config = exports.Config || (exports.Config = {}));
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["Success"] = 200] = "Success";
    StatusCode[StatusCode["Created"] = 201] = "Created";
    StatusCode[StatusCode["Accepted"] = 202] = "Accepted";
    StatusCode[StatusCode["Moved"] = 301] = "Moved";
    StatusCode[StatusCode["BadRequest"] = 400] = "BadRequest";
    StatusCode[StatusCode["Unauthorized"] = 401] = "Unauthorized";
    StatusCode[StatusCode["Forbidden"] = 403] = "Forbidden";
    StatusCode[StatusCode["NotFound"] = 404] = "NotFound";
    StatusCode[StatusCode["Error"] = 500] = "Error";
})(StatusCode = exports.StatusCode || (exports.StatusCode = {}));
var Status;
(function (Status) {
    Status[Status["Disable"] = 0] = "Disable";
    Status[Status["Enable"] = 1] = "Enable";
})(Status = exports.Status || (exports.Status = {}));
var DocumentMimeType;
(function (DocumentMimeType) {
    DocumentMimeType[DocumentMimeType["application/pdf"] = 0] = "application/pdf";
    DocumentMimeType[DocumentMimeType["application/msword"] = 1] = "application/msword";
    DocumentMimeType[DocumentMimeType["application/vnd.ms-excel"] = 2] = "application/vnd.ms-excel";
    DocumentMimeType[DocumentMimeType["application/vnd.ms-powerpoint"] = 3] = "application/vnd.ms-powerpoint";
    DocumentMimeType[DocumentMimeType["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"] = 4] = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    DocumentMimeType[DocumentMimeType["application/vnd.openxmlformats-officedocument.wordprocessingml.document"] = 5] = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
})(DocumentMimeType = exports.DocumentMimeType || (exports.DocumentMimeType = {}));
var MediaMimeType;
(function (MediaMimeType) {
    MediaMimeType[MediaMimeType["image/gif"] = 0] = "image/gif";
    MediaMimeType[MediaMimeType["image/jpeg"] = 1] = "image/jpeg";
    MediaMimeType[MediaMimeType["image/png"] = 2] = "image/png";
    MediaMimeType[MediaMimeType["image/bmp"] = 3] = "image/bmp";
    MediaMimeType[MediaMimeType["image/vnd.microsoft.icon"] = 4] = "image/vnd.microsoft.icon";
})(MediaMimeType = exports.MediaMimeType || (exports.MediaMimeType = {}));
//# sourceMappingURL=raven.enum.js.map