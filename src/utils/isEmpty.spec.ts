import { expect } from "chai";
import { describe, it } from "mocha";
import isEmpty from "./isEmpty";

describe("isEmpty function", () => {
  it("should correctly return true", () => {
    expect(isEmpty(null), "null").to.be.true;
    expect(isEmpty([]), "Empty array").to.be.true;
    expect(isEmpty({}), "Empty object").to.be.true;
    expect(isEmpty(""), "Empty string").to.be.true;
    expect(isEmpty(0), "Zero").to.be.true;
  });

  it("should correctly return false", () => {
    expect(isEmpty([1, 2, 3]), "Non empty array").to.be.false;
    expect(isEmpty({ a: 1 }), "Non empty object").to.be.false;
    expect(isEmpty("123"), "Non empty string").to.be.false;
  });
});
