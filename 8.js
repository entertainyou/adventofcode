'use strict';

// FIXME: this sure is ugly...
function parse(content) {
    const co = content.slice(1, content.length - 1);
    let i = 0;
    let result = [];
    while (i <= co.length - 1) {
	let c = co[i];
	i++;
	if (c !== '\\') {
	    result.push(c[i]);
	} else {
	    let c2 = co[i];
	    i ++;
	    if (c2 === '"') {
		result.push('"');
	    } else if (c2 === '\\') {
		result.push('\\');
	    } else if (c2 === 'x') {
		let c3 = co[i];
		i ++;
		let c4 = co[i];
		i ++;
		let code = 16 * c3.charCodeAt(0) + c4.charCodeAt(0);
		result.push(String.fromCharCode(code));
	    }
	}
    }
    return result.length;
}

import R from 'ramda';
import fs from 'fs';

const content = fs.readFileSync('8.input').toString();

const result = R.pipe(
    R.split('\n'),
    R.map(it => it.length - parse(it)),
    R.sum
)(content);

console.log(result);

