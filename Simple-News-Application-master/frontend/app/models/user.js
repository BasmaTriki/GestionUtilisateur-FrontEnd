"use strict";
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    isNameValid() {
        var err = [];
        var stat = true;
        if (!this.name) {
            err.push("Fullname is required");
            stat = false;
            return { stat, err };
        }
        if (this.name.length < 4) {
            err.push("Name Length cannot be less than 4 ");
            stat = false;
        }
        if (this.name.length > 50) {
            err.push("Name Length cannot be more than 50");
            stat = false;
        }
        var myRe = /\d/;
        var myArray = myRe.exec(this.name);
        if (myArray) {
            err.push("Name Cannot contain numbers");
            stat = false;
        }
        return { stat, err };
    }
    isUsernameValid() {
        var err = [];
        var stat = true;
        if (!this.username) {
            err.push("Username is required");
            stat = false;
            return { stat, err };
        }
        if (this.username.length < 4) {
            err.push("Username Length cannot be less than 4");
            stat = false;
        }
        if (this.username.length > 30) {
            err.push("Username Length cannot be more than 30 ");
            stat = false;
        }
        var myRe = /^[\d\w\_-]*$/;
        var myArray = myRe.exec(this.username);
        if (!myArray) {
            err.push("Username can only contain Letters, numbers, underscore(_) and hyphen(-).");
            stat = false;
        }
        myRe = /^[A-Za-z].*$/;
        myArray = myRe.exec(this.username);
        if (!myArray) {
            err.push("Username can only start with Alphabets. ");
            stat = false;
        }
        return { stat, err };
    }
    isPasswordValid() {
        var err = [];
        var stat = true;
        if (!this.password) {
            err.push("Password is required");
            stat = false;
            return { stat, err };
        }
        if (this.password.length < 5) {
            err.push("Password Length cannot be less than 5");
            stat = false;
        }
        if (this.password.length > 30) {
            err.push("Password Length cannot be more than 30");
            stat = false;
        }
        var myRe = /^[\d\w_.-]*$/;
        var myArray = myRe.exec(this.password);
        if (!myArray) {
            err.push("Password can only contain Letters, numbers, underscore(_) and hyphen(-).");
            stat = false;
        }
        return { stat, err };
    }
    isrPasswordValid() {
        var err = [];
        var stat = true;
        if (!this.rPassword) {
            err.push("Retype password is required");
            stat = false;
            return { stat, err };
        }
        if (this.password != this.rPassword) {
            err.push("Password does not match.");
            stat = false;
        }
        return { stat, err };
    }
    isEmailValid() {
        var err = [];
        var stat = true;
        if (!this.email) {
            err.push("Email is required");
            stat = false;
            return { stat, err };
        }
        var myRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var myArray = myRe.exec(this.email);
        if (!myArray) {
            err.push("The Email Adress is not in valid format.");
            stat = false;
        }
        return { stat, err };
    }
    isPhoneNumberValid() {
        var err = [];
        var stat = true;
        if (this.phone_number) {
            if (this.phone_number.length < 10) {
                err.push("Mobile No Length cannot be less than 10");
                stat = false;
            }
            if (this.phone_number.length > 11) {
                err.push("Mobile No Length cannot be more than 11 ");
                stat = false;
            }
            var myRe = /^[0-9]{10,11}$/;
            if (!myRe.exec(this.phone_number)) {
                err.push("The Phone Number is not in valid format.");
                stat = false;
            }
        }
        return { stat, err };
    }
    isValid() {
        return this.isEmailValid().stat &&
            this.isNameValid().stat &&
            this.isPasswordValid().stat &&
            this.isUsernameValid().stat &&
            this.isrPasswordValid().stat &&
            this.isPhoneNumberValid().stat;
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map