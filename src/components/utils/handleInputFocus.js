export function inputFocus(e) {
  const { target } = e;
  target.parentElement.querySelector('label').classList.add('focused');
}

export function inputBlur(e) {
  const { target } = e;
  if (target.value === '') {
    target.parentElement.querySelector('label').classList.remove('focused');
  }
}
