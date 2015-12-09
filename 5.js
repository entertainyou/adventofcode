'use strict';

import R from 'ramda';
import { expect } from 'chai';
import fs from 'fs';

function spec1(input) {
    const vowels = 'aeiou'.split('');
    return R.pipe(
	R.split(''),
	R.filter(R.flip(R.contains)(vowels)),
	R.length
    )(input) >= 3;
};

function spec2(input) {
    return input.match(/(.)\1/) !== null;
};

function spec3(input) {
    const should_not_contain = ['ab', 'cd', 'pq', 'xy'];
    return R.all(
	not_contain => !input.includes(not_contain)
    )(should_not_contain);
};

function spec(input) {
    const specs = [spec1, spec2, spec3];
    //return R.flip(R.all)(specs)(input);
    return specs.every(spec => spec(input));
}

function test() {
    expect(spec1('abcedi')).to.be.true;
    expect(spec1('')).to.be.false;
    expect(spec1('abce')).to.be.false;
    expect(spec1('abcediu')).to.be.true;

    expect(spec2('abc')).to.be.false;
    expect(spec2('abbd')).to.be.true;

    expect(spec3('ac')).to.be.true;
    expect(spec3('ab')).to.be.false;

    expect(spec('ugknbfddgicrmopn')).to.be.true;
    expect(spec('aaa')).to.be.true;
    expect(spec('jchzalrnumimnmhp')).to.be.false;
    expect(spec('haegwjzuvuyypxyu')).to.be.false;
    expect(spec('dvszwmarrgswjxmb')).to.be.false;
};

test();

const content = fs.readFileSync('5.input').toString();

function get_match_count(spec) {
    return result1 = R.pipe(
	R.split('\n'),
	R.filter(spec),
	R.length
    )(content);
}

const result1 = get_match_count(spec);
console.log(result1);

function new_spec1(input) {
    return input.match(/(..).*\1/) !== null;
}

function new_spec2(input) {
    return input.match(/(.).\1/) !== null;
}

function new_spec(input) {
    return [new_spec1, new_spec2].every(spec => spec(input));
}

function new_test() {
    expect(new_spec('qjhvhtzxzqqjkmpb')).to.be.true;
    expect(new_spec('xxyxx')).to.be.true;
    expect(new_spec('uurcxstgmygtbstg')).to.be.false;
    expect(new_spec('ieodomkazucvgmuy')).to.be.false;
}

new_test();
const result2 = get_match_count(new_spec);
console.log(result2);

