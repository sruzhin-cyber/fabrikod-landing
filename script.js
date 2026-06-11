document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px' });

  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

  const formatNumber = (value) => new Intl.NumberFormat('ru-RU').format(Math.round(value));
  const requests = document.querySelector('#requests');
  const conversion = document.querySelector('#conversion');
  const requestCost = document.querySelector('#request-cost');

  function setRangeFill(input) {
    const percent = ((input.value - input.min) / (input.max - input.min)) * 100;
    input.style.setProperty('--range', `${percent}%`);
  }

  function updateCalculator() {
    const requestCount = Number(requests.value);
    const conversionRate = Number(conversion.value);
    const unitCost = Number(requestCost.value);
    const won = Math.round(requestCount * conversionRate / 100);
    const lost = requestCount - won;
    const monthlyCost = lost * unitCost;

    document.querySelector('#requests-value').textContent = formatNumber(requestCount);
    document.querySelector('#conversion-value').textContent = `${conversionRate}%`;
    document.querySelector('#cost-value').textContent = `${formatNumber(unitCost)} ₽`;
    document.querySelector('#summary-requests').textContent = formatNumber(requestCount);
    document.querySelector('#summary-conversion').textContent = `${conversionRate}%`;
    document.querySelector('#won-orders').textContent = formatNumber(won);
    document.querySelector('#lost-orders').textContent = formatNumber(lost);
    document.querySelector('#summary-cost').textContent = `${formatNumber(unitCost)} ₽`;
    document.querySelector('#monthly-cost').textContent = `${formatNumber(monthlyCost)} ₽`;
    document.querySelector('#yearly-cost').textContent = `${formatNumber(monthlyCost * 12)} ₽`;
    [requests, conversion, requestCost].forEach(setRangeFill);
  }

  [requests, conversion, requestCost].forEach((input) => input.addEventListener('input', updateCalculator));
  updateCalculator();

  document.querySelectorAll('.accordion__item button').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.accordion__item');
      const content = item.querySelector('.accordion__content');
      const isOpen = item.classList.contains('is-open');

      document.querySelectorAll('.accordion__item.is-open').forEach((openItem) => {
        openItem.classList.remove('is-open');
        openItem.querySelector('button').setAttribute('aria-expanded', 'false');
        openItem.querySelector('.accordion__content').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = `${content.scrollHeight}px`;
      }
    });
  });

  document.querySelector('#demo-form').addEventListener('submit', (event) => {
    event.preventDefault();
    event.currentTarget.classList.add('is-success');
  });
});
