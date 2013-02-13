;(function (window, document, undefined) {

  var Temply = function(context) {
    this.context = context;
    this.tokens = new Array();
    this.init();
  }

  Temply.prototype.init = function() {
    document.body.innerHTML = document.body.innerHTML.replace(/{{([^}]*)}}/g, this.replacer.bind(this));
    var inputs = document.querySelectorAll("input[tp-model]");
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("keyup", this.inputChange.bind(this));
    }
  }

  Temply.prototype.inputChange = function(input) {
    var model = input.target.getAttribute("tp-model");
    eval("this.context." + model + " = input.target.value");
    this.updateToken(model);
  }

  Temply.prototype.replacer = function(match, p1, offset, string) {
    if (this.tokens.indexOf(p1) == -1) this.tokens.push(p1);
    return "<span tp-model='" + p1 + "'></span>";
  }

  Temply.prototype.updateToken = function(model) {
    var elements = document.querySelectorAll("*[tp-model='" + model + "']");
    for (var i = 0; i < elements.length; i++) {
      var value = eval("this.context." + model) || "";
      if(elements[i].tagName == "INPUT")
        elements[i].value = value;
      else
        elements[i].textContent = value;
    }
  }

  Temply.prototype.run = function() {
    this.tokens.forEach(function(token) {
      this.updateToken(token);
    }, this);
  }

  window.Temply = Temply;

})(this, this.document);
