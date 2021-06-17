/**
 * @see https://stackoverflow.com/a/18234317/860205
 * @param {string} str 
 * @param {object} data 
 * @returns 
 */
export function formatString(str, data) {

        var t = typeof data;
        var key;
        var args = ("string" === t || "number" === t) ?
            Array.prototype.slice.call(data)
            : data;

        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }

    return str;
};


//console.log(formatString('hallo {0} {1}', ['a', 'b']));
//console.log(formatString('hallo {a} {b}', {'a': 'x', 'b': 'y'}));