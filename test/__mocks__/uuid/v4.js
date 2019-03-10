let counter = 1;
export default function mockUuid() {
  return `${counter++}`;
}
mockUuid.reset = function () {
  counter = 1;
};
