let counter = 1;
export function v4() {
  return `${counter++}`;
}
v4.reset = function () {
  counter = 1;
};
