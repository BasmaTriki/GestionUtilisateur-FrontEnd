
export enum Config {
	ApiUrl = <any> "http://localhost:3003/",
	UploadUrl = <any> "http://localhost:3003/uploads"
}

export enum StatusCode {
	Success = 200,
	Created = 201,
	Accepted = 202,
	Moved = 301,
	BadRequest = 400,
	Unauthorized = 401,
	Forbidden = 403,
	NotFound = 404,
	Error = 500
}

export enum Status {
	Disable = 0,
	Enable = 1
}

export enum DocumentMimeType {
	"application/pdf",
	"application/msword",
	"application/vnd.ms-excel",
	"application/vnd.ms-powerpoint",
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}

export enum MediaMimeType {
	"image/gif",
	"image/jpeg",
	"image/png",
	"image/bmp",
	"image/vnd.microsoft.icon"
}