export default class CurrencyWidget {
  init(parentNode) {
    this.widgetElement = null;
    this.draggedEl = null;
    this.column = parentNode;
    this.addWidget(this.column);
    this.select = this.widgetElement.querySelector('.valute-select');
    this.rubValue = this.widgetElement.querySelector('.RUB');
    this.removeButton = this.widgetElement.querySelector('.remove-widget-button');
    this.dragDot = this.widgetElement.querySelector('.drag-dot');
    this.settings = this.widgetElement.querySelector('.settings');
    this.widgetColor = '#fff';
    this.showCurrency();
    this.addListners();
  }

  addListners() {
    this.select.addEventListener('change', (event) => {
      event.preventDefault();
      this.showCurrency();
    });

    this.removeButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.removeWidget();
    });

    this.settings.addEventListener('click', (event) => {
      event.preventDefault();
      this.changeColor();
    });

    this.dragDot.addEventListener('mousedown', (event) => {
      event.preventDefault();
      if (this.draggedEl === null) {
        this.createDraggedElement(event);
      }
    });

    document.addEventListener('mousemove', (event) => {
      event.preventDefault();
      this.moveDraggedElement(event);
    });

    document.addEventListener('mouseup', (event) => {
      event.preventDefault();
      if (this.draggedEl !== null) {
        this.removeDraggedElement(event);
        this.dropElement(event);
      }
    });
  }

  addWidget() {
    const newEl = CurrencyWidget.getWidgetElement();
    this.widgetElement = newEl;
    this.column.insertAdjacentElement('afterbegin', this.widgetElement);
  }

  removeWidget() {
    this.column.removeChild(this.widgetElement);
  }

  static getWidgetElement() {
    const newEl = document.createElement('div');
    newEl.classList.add('valute-widget-wrapper');
    newEl.insertAdjacentHTML('afterbegin', CurrencyWidget.getElementHTML());
    return newEl;
  }

  static getElementHTML() {
    return `
      <select class="valute-select">
        <option value="AUD">AUD - 1 Австралийский доллар </option>
        <option value="AZN">AZN - 1 Азербайджанский манат </option>
        <option value="GBP">GBP - 1 Фунт стерлингов Соединенного королевства </option>
        <option value="AMD">AMD - 1 Армянских драмов </option>
        <option value="BYN">BYN - 1 Белорусский рубль </option>
        <option value="BGN">BGN - 1 Болгарский лев </option>
        <option value="BRL">BRL - 1 Бразильский реал </option>
        <option value="HUF">HUF - 1 Венгерских форинтов </option>
        <option value="HKD">HKD - 1 Гонконгских долларов </option>
        <option value="DKK">DKK - 1 Датская крона </option>
        <option value="USD">USD - 1 Доллар США </option>
        <option value="EUR">EUR - 1 Евро </option>
        <option value="INR">INR - 1 Индийских рупий </option>
        <option value="KZT">KZT - 1 Казахстанских тенге </option>
        <option value="CAD">CAD - 1 Канадский доллар </option>
        <option value="KGS">KGS - 1 Киргизских сомов </option>
        <option value="CNY">CNY - 1 Китайский юань </option>
        <option value="MDL">MDL - 1 Молдавских леев </option>
        <option value="NOK">NOK - 1 Норвежских крон </option>
        <option value="PLN">PLN - 1 Польский злотый </option>
        <option value="RON">RON - 1 Румынский лей </option>
        <option value="SGD">SGD - 1 Сингапурский доллар </option>
        <option value="TJS">TJS - 1 Таджикских сомони </option>
        <option value="TRY">TRY - 1 Турецкая лира </option>
        <option value="TMT">TMT - 1 Новый туркменский манат </option>
        <option value="UZS">UZS - 1 Узбекских сумов </option>
        <option value="UAH">UAH - 1 Украинских гривен </option>
        <option value="CZK">CZK - 1 Чешских крон </option>
        <option value="SEK">SEK - 1 Шведских крон </option>
        <option value="CHF">CHF - 1 Швейцарский франк </option>
        <option value="ZAR">ZAR - 1 Южноафриканских рэндов </option>
        <option value="KRW">KRW - 1 Вон Республики Корея </option>
        <option value="JPY">JPY - 1 Японских иен</option>
      </select> 
      <div>
        <span>Равен(а)</span>
        <span class="RUB"></span>
        <span>рублей:</span>
      </div>
      <div class="remove-widget-button"></div>
      <div class="drag-dot"></div>
      <div class="settings"></div>
    `;
  }

  async showCurrency() {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const charCode = this.select.selectedOptions[0].value;
    const valuteList = data.Valute;
    const valuteValue = valuteList[charCode].Value;
    const valuteNominal = valuteList[charCode].Nominal;
    this.rubValue.textContent = valuteValue / valuteNominal;
  }

  createDraggedElement(event) {
    this.draggedEl = CurrencyWidget.getWidgetElement();
    this.draggedEl.id = 'dragged';
    this.column.appendChild(this.draggedEl);
    this.positonDraggedElement(event);
  }

  removeDraggedElement() {
    this.column.removeChild(this.draggedEl);
    this.draggedEl = null;
  }

  moveDraggedElement(event) {
    if (this.draggedEl !== null) {
      this.positonDraggedElement(event);
    }
  }

  positonDraggedElement(event) {
    const xPos = event.clientX;
    const yPos = event.clientY;
    this.draggedEl.style.top = `${yPos - 20}px`;
    this.draggedEl.style.left = `${xPos - this.draggedEl.offsetWidth / 2}px`;
  }

  dropElement(event) {
    const xPos = event.clientX;
    const yPos = event.clientY;
    const newColumn = document.elementFromPoint(xPos, yPos).closest('.column');
    this.removeWidget();
    this.init(newColumn);
  }

  changeColor() {
    const colors = ['#fff', '#ec7372', '#27AE60'];
    let index = colors.indexOf(this.widgetColor);
    index += 1;
    if (index === 3) {
      index = 0;
    }
    this.widgetColor = colors[index];
    this.widgetElement.style.backgroundColor = this.widgetColor;
  }
}
