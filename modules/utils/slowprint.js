function _splitWordsAndElements(txt) {
    let s = txt.split(" ");
    let result = [];
    let flag = false;
    let e = "";

    for (let i = 0; i < s.length; i++) {
        let word = s[i];
        if (word.includes('<') && !flag) {
            if(word == "<br>"){
                result.push(word);
            }else{
                flag = true;
                e += word + " ";
            }

        } else if (flag) {

            e += word + " ";
            if (word.includes("</")){
                flag = false;
                result.push(e);
                e = "";
            }
        } else {
            result.push(word);
        }
    }

    return result;
}

export function printLetterByLetter(target, text, speed) {
    var i = 0;
    var interval = setInterval(function () {
        target.innerHTML += text.charAt(i);
        i++;
        if (i > text.length) {
            clearInterval(interval);
        }
    }, speed);
    return interval;
}

export function printWordByWord(target, text, speed) {
    var split = _splitWordsAndElements(text);
    var i = 0;
    var interval = setInterval(function () {
        target.innerHTML += split[i] + " ";
        i++;
        if (i > split.length - 1) {
            clearInterval(interval);
        }
    }, speed);

    return interval;
}