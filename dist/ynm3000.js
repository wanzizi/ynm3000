//使用职责链
define("password", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function ruleLength(password, score) {
        if (password.length >= 6 && password.length <= 8) {
            score = score + 10;
        }
        else if (password.length >= 9 && password.length <= 18) {
            score = score + 25;
        }
        else {
            score = score - 100;
        }
        return score;
    }
    function ruleLetter(password, score) {
        if (/.*[A-Za-z]+.*/.test(password)) {
            if (/.*[A-Z]+.*/.test(password) && /.*[a-z]+.*/.test(password)) {
                score += 20;
            }
            else {
                score += 10;
            }
        }
        return score;
    }
    function ruleNumber(password, score) {
        var num = password.replace(/\D/g, '').length;
        if (num >= 1 && num < 3) {
            score += 10;
        }
        else if (num >= 3) {
            score += 20;
        }
        return score;
    }
    function ruleSymbol(password, score) {
        var num = password.replace(/[0-9]/g, '').replace(/[A-Za-z]/g, '').length;
        if (num == 1) {
            score += 10;
        }
        else if (num > 1) {
            score += 25;
        }
        return score;
    }
    function ruleAward(password, score) {
        var hasNum = password.replace(/\D/g, '').length > 0;
        var hasLetter = /.*[A-Za-z]+.*/.test(password);
        var hasSymbol = password.replace(/[0-9]/g, '').replace(/[A-Za-z]/g, '').length;
        var hasCase = /.*[A-Z]+.*/.test(password) && /.*[a-z]+.*/.test(password);
        if (hasNum && hasLetter && hasSymbol && hasCase) {
            score += 5;
        }
        else if (hasNum && hasLetter && hasSymbol) {
            score += 3;
        }
        else if (hasNum && hasLetter) {
            score += 2;
        }
        // if (/^[0-9a-zA-Z]*$/.test(password)) {
        //     score += 2
        // } 
        return score;
    }
    function rulePunishment(password, score) {
        //如果相同 就-50
        //数字连续
        var name = password; //需要验证的字符串
        var lcontinuity = 0; //用于连续个数的统计
        var isSame = 0;
        for (var i = 1; i < name.length; i++) {
            if (((name[i].charCodeAt()) - (name[i - 1].charCodeAt()) == 1) || ((name[i].charCodeAt()) - (name[i - 1].charCodeAt()) == -1)) { //1正序连贯；-1倒序连贯
                lcontinuity += 1; //存在连贯：计数+1
            }
            ;
            if (((name[i].charCodeAt()) - (name[i - 1].charCodeAt()) == 0)) { //1正序连贯；-1倒序连贯
                isSame += 1; //存在连贯：计数+1
            }
            ;
        }
        if (lcontinuity > (name.length - 2)) {
            score = score - 50;
        }
        else if (isSame === (name.length - 1)) {
            score = score - 50;
        }
        //如果有连续就-50
        return score;
    }
    var Level;
    (function (Level) {
        Level[Level["error"] = 0] = "error";
        Level[Level["weak"] = 1] = "weak";
        Level[Level["normal"] = 2] = "normal";
        Level[Level["high"] = 3] = "high";
    })(Level || (Level = {}));
    function vail(password) {
        var score = 0, level = ""; //
        score = ruleLength(password, score);
        score = ruleLetter(password, score);
        score = ruleNumber(password, score);
        score = ruleSymbol(password, score);
        score = ruleAward(password, score);
        score = rulePunishment(password, score);
        //职责链
        if (score < 0) {
            level = Level[Level.error];
        }
        else if (score < 60) {
            level = Level[Level.weak];
        }
        else if (score < 80) {
            level = Level[Level.normal];
        }
        else {
            level = Level[Level.high];
        }
        console.log(score, level);
        //数值判断
        return { score: score, level: level };
    }
    vail("1111111111111");
    exports.default = vail;
});
define("index", ["require", "exports", "password"], function (require, exports, password_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = { vail: password_1.default };
});
//# sourceMappingURL=ynm3000.js.map