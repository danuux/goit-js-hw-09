
const refs = {
  delay: document.querySelector('input[name=delay]'),
  step: document.querySelector('input[name=step]'),
  amount: document.querySelector('input[name=amount]'),
  submitBtn: document.querySelector('button[type=submit]'),
};

refs.submitBtn.addEventListener('click', submitForm);

function submitForm(evt) {
  evt.preventDefault();
  
  const amount = refs.amount.value;
  const step = Number(refs.step.value);
  let delay = Number(refs.delay.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise ((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};