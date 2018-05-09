import { equals, contains, notEquals, notContains } from './assertions';

export interface ScalarAssertion<T> {
  to: {
    equal: (expected: T) => void;
    not: {
      equal: (expected: T) => void;
    }
  }
}

export interface VectorAssertion<T> {
  to: {
    contain: (member: T) => void;
    not: {
      contain: (member: T) => void;
    }
  }
}

// string[keyof string] is number for some reason so that's why
// we have this separate interface instead of just using
// InclusionAssertion<string>.
export interface StringAssertion {
  to: {
    contain: (needle: string) => void;
    not: {
      contain: (needle: string) => void;
    }
  }
}

// This is separate from InclusionAssertion to be able to
// use Partial<>.
export interface ObjectAssertion<T, K> {
  to: {
    contain: (partial: Partial<T>) => void;
    not: {
      contain: (partial: Partial<T>) => void;
    }
  }
}

// eslint-disable-next-line max-len
function typedExpect<T>(array: Array<T> | Set<T>): ScalarAssertion<Array<T> | Set<T>> & VectorAssertion<T>;
function typedExpect(string: string): ScalarAssertion<string> & StringAssertion;
function typedExpect(actual: number): ScalarAssertion<number>;
function typedExpect(actual: boolean): ScalarAssertion<boolean>;
// eslint-disable-next-line max-len
function typedExpect<K, V>(actual: Map<K, V>): ScalarAssertion<Map<K, V>> & VectorAssertion<V>;
// eslint-disable-next-line max-len
function typedExpect<T, K extends keyof T>(object: T): ScalarAssertion<T> & ObjectAssertion<T, K>;

function typedExpect(actual: any): any {
  const equal = equals(actual);
  const contain = contains(actual);
  const notEqual = notEquals(actual);
  const notContain = notContains(actual);

  if (typeof actual === 'number' || typeof actual === 'boolean') {
    return {
      to: {
        equal,
        not: {
          equal: notEqual
        }
      }
    };
  }

  return {
    to: {
      equal,
      contain,
      not: {
        equal: notEqual,
        contain: notContain
      }
    }
  };
}

export default typedExpect;
