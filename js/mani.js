class Slider {
  constructor(rangeElement, valueElement, options) {
    this.rangeElement = rangeElement;
    this.valueElement = valueElement;
    this.options = options;

    // Attach a listener to "change" event
    this.rangeElement.addEventListener("input", this.updateSlider.bind(this));
  }

  // Initialize the slider
  init() {
    this.rangeElement.setAttribute("min", options.min);
    this.rangeElement.setAttribute("max", options.max);
    this.rangeElement.value = options.cur;

    this.updateSlider();
  }

  // Format the money
  asMoney(value) {
    return value;
  }

  generateBackground(rangeElement) {
    if (this.rangeElement.value === this.options.min) {
      return;
    }

    let percentage =
      ((this.rangeElement.value - this.options.min) /
        (this.options.max - this.options.min)) *
      100;
    return (
      "background: linear-gradient(to right, hsl(174, 77%, 80%), hsl(174, 86%, 45%) " +
      percentage +
      "%, hsl(223, 50%, 87%) " +
      percentage +
      "%, hsl(224, 65%, 95%) 100%)"
    );
  }

  updateSlider(newValue) {
    let x = Number(this.asMoney(this.rangeElement.value));
    let string = document.querySelector(
      ".range .range__value .spanTime"
    ).innerHTML;
    string != " / month" ? (x = x * 10) : {};
    this.valueElement.innerHTML = "$" + x + ".00";
    this.rangeElement.style = this.generateBackground(this.rangeElement.value);
  }
}

let rangeElement = document.querySelector('.range [type="range"]');
let valueElement = document.querySelector(".range .range__value .spanValue");

let options = {
  min: 8,
  max: 24,
  cur: 16,
};

if (rangeElement) {
  let slider = new Slider(rangeElement, valueElement, options);

  slider.init();
}

getNumer = (string) => {
  let number = string.replace(/[^0-9]/g, "");
  return number;
};

onchangeSelector = () => {
  let num = getNumer(
    document.querySelector(".range .range__value .spanValue").innerHTML
  );
  num /= 100;
  let string = document.querySelector(
    ".range .range__value .spanTime"
  ).innerHTML;
  if (string == " / month") {
    document.querySelector(".range .range__value .spanTime").innerHTML =
      " / year";
    document.querySelector(".range .range__value .spanValue").innerHTML =
      "$" + num * 10 + ".00";
  } else {
    document.querySelector(".range .range__value .spanTime").innerHTML =
      " / month";
    document.querySelector(".range .range__value .spanValue").innerHTML =
      "$" + num / 10 + ".00";
  }
};
