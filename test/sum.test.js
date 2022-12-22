/* eslint-disable no-undef */
function sum(a, b) {
	return a + b;
}

test("Yes!", () => {
	expect(sum(1, 2)).toBe(3);
});
