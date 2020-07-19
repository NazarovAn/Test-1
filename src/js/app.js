import CurrencyWidget from './currencyWidget';

const addButtonList = document.querySelectorAll('.placeholder-button');
addButtonList.forEach((item) => {
  item.addEventListener('click', (el) => {
    el.preventDefault();
    const newCurrencyWidget = new CurrencyWidget();
    newCurrencyWidget.init(el.target.closest('.column'));
  });
});
