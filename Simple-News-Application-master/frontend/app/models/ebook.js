"use strict";
class Ebook {
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
    isAuthorValid() {
        var err = [];
        var stat = true;
        if (!this.author) {
            err.push("Author name is required");
            stat = false;
            return { stat, err };
        }
        if (this.author.length < 4) {
            err.push("Author name Length cannot be less than 4 ");
            stat = false;
        }
        if (this.author.length > 50) {
            err.push("Author name Length cannot be more than 50");
            stat = false;
        }
        var myRe = /\d/;
        var myArray = myRe.exec(this.author);
        if (myArray) {
            err.push("Author name Cannot contain numbers");
            stat = false;
        }
        return { stat, err };
    }
    isEbookValid() {
        var err = [];
        var stat = true;
        if (!this.ebook) {
            err.push("File is required");
            stat = false;
            return { stat, err };
        }
        return { stat, err };
    }
    isPublisherValid() {
        var err = [];
        var stat = true;
        if (this.publisher) {
            if (this.publisher.length < 4) {
                err.push("Publisher Length cannot be less than 4 ");
                stat = false;
            }
            if (this.publisher.length > 300) {
                err.push("Publisher Length cannot be more than 300");
                stat = false;
            }
        }
        return { stat, err };
    }
    isValid() {
        return this.isTitleValid().stat &&
            this.isAuthorValid().stat &&
            this.isPublisherValid().stat;
    }
}
exports.Ebook = Ebook;
//# sourceMappingURL=ebook.js.map