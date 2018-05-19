import { expect } from 'chai';
import { extend, Expect, IsType, Plugin } from 'src/extend';

export interface CustomType {
  customProp: boolean;
}

export interface CustomAssertion {
  customAssert: (foo: string) => string;
}

// eslint-disable-next-line max-len
export const isCustom: IsType<CustomType> = (actual: any): actual is CustomType => ((actual as CustomType).customProp);
export const customExpect: Expect<CustomType, CustomAssertion> = () => ({
  customAssert: (foo: string) => foo
});

export const customPlugin: Plugin<CustomType, CustomAssertion> = () => ({
  isType: isCustom,
  expect: customExpect
});

export interface CustomType2 {
  customProp2: boolean;
}

export interface CustomAssertion2 {
  customAssert2: (foo: number) => number;
}

// eslint-disable-next-line max-len
export const isCustom2: IsType<CustomType2> = (actual: any): actual is CustomType2 => ((actual as CustomType2).customProp2);
export const customExpect2: Expect<CustomType2, CustomAssertion2> = () => ({
  customAssert2: (foo: number) => foo
});

export const customPlugin2: Plugin<CustomType2, CustomAssertion2> = () => ({
  isType: isCustom2,
  expect: customExpect2
});

describe('Extend', function () {
  const overloadedExpect = extend(customPlugin);
  const overloadedExpect2 = extend(customPlugin, customPlugin2);

  it('should return the original expect', function () {
    overloadedExpect({ foo: 'bar' }).to.contain({ foo: 'bar' });
    overloadedExpect2({ foo: 'bar' }).to.contain({ foo: 'bar' });
  });

  it('should return the overloaded expect', function () {
    expect(overloadedExpect({ customProp: true }).customAssert('foobar')).to.equal('foobar');
    expect(overloadedExpect2({ customProp2: true }).customAssert2(42)).to.equal(42);
  });
});
