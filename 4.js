'use strict';

import wu from 'wu';
import crypto from 'crypto';

function *numbers() {
    let i = 1;
    while (true) {
	yield i;
	i ++;
    }
}

function getMatcher(initial, prefix) {
    return (i) => {
	const md5 = crypto.createHash('md5');
	md5.update(initial);
	md5.update('' + i);
	return md5.digest('hex').startsWith(prefix);
    };
}

const result1 = wu(numbers()).find(getMatcher('bgvyzdsv', '00000'));
console.log(result1);

const result2 = wu(numbers()).find(getMatcher('bgvyzdsv', '000000'));
console.log(result2);
