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

export const correctFocus = (type) => {
  if (type === 'update') {
    document.querySelectorAll('label').forEach((label) => {
      label.classList.add('focused');
    });
  } else {
    document.querySelectorAll('label')[2].classList.add('focused');
  }
};
