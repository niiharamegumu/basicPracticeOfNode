// module.exports.add = function(val1,val2){
//     return val1 + val2;
// }

// module.exports.sub = function(val1, val2){
//     return val1 - val2;
// }

module.exports = class Hoge {
    constructor(content){
        this.content = content;
    }
    say(){
        console.log(this.content);
    }
}
