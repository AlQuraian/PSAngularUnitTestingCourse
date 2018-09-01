import { StrengthPipe } from "./strength.pipe";

describe('StringthPipe', () => {
  it('should display weak if strength is 5', () => {
    const pipe = new StrengthPipe();

    expect(pipe.transform(5)).toEqual('5 (weak)');
  })
})
