"use strict";
class News {
    constructor() { }
    isTitleValid() {
        var err = [];
        var stat = true;
        if (!this.title) {
            err.push("Title is required");
            stat = false;
            return { stat, err };
        }
        if (this.title.length < 4) {
            err.push("Title Length cannot be less than 4 ");
            stat = false;
        }
        if (this.title.length > 300) {
            err.push("Title Length cannot be more than 300");
            stat = false;
        }
        return { stat, err };
    }
    isContentValid() {
        var err = [];
        var stat = true;
        if (!this.content) {
            err.push("Content is required");
            stat = false;
            return { stat, err };
        }
        if (this.content.length < 4) {
            err.push("Content Length cannot be less than 4 ");
            stat = false;
        }
        return { stat, err };
    }
    isThumbnailValid() {
        var err = [];
        var stat = true;
        if (!this.thumbnail) {
            err.push("Thumbnail is required");
            stat = false;
            return { stat, err };
        }
        if (this.thumbnail.length < 4) {
            err.push("Thumbnail Length cannot be less than 4 ");
            stat = false;
        }
        return { stat, err };
    }
    isCategoryValid() {
        var err = [];
        var stat = true;
        if (!this.category) {
            err.push("Category is required");
            stat = false;
            return { stat, err };
        }
        return { stat, err };
    }
    isValid() {
        return this.isTitleValid() && this.isContentValid() &&
            this.isThumbnailValid() && this.isCategoryValid();
    }
}
exports.News = News;
//# sourceMappingURL=news.js.map