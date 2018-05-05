import { expect } from 'chai';

export function equal(actual: any) {
  return (expected: any) => {
    expect(actual).to.deep.equal(expected);
  };
}

export function contains(actual: any) {
  return (member: any) => {
    expect(actual).to.contain(member);
  };
}

export function objectContains<T>(actual: T) {
  return (partial: Partial<T>) => {
    expect(actual).to.include(partial);
  };
}
