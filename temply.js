/*!
Temply.js version 0.01 -- by Mathias Karstädt
More info at: http://mathiaskarstaedt.de
*/
;(function (window, document, undefined) {

  var Temply = function(context) {
    this.context = context;
    this.tokens = new Array();
    this.init();
  }

  Temply.prototype.init = function() {
    this.replaceTags(document.body);
    this.initRepeats();
    this.initModels();
    var inputs = document.querySelectorAll("input[tp-model]");
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("keyup", this.inputChange.bind(this));
    }
  }

  Temply.prototype.inputChange = function(input) {
    var model = input.target.getAttribute("tp-model");
    eval("this.context." + model + " = input.target.value");
    this.updateToken(document, model, this.context);
  }

  Temply.prototype.replaceTags = function(element) {
    element.innerHTML = element.innerHTML.replace(/{{([^}]*)}}/g, function(match, p1, offset, string) {
      return "<span tp-model='" + p1 + "'></span>";
    });
    return element;
  }

  Temply.prototype.initRepeats = function() {
    var elements = document.querySelectorAll("*[tp-repeat]");
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      var template = this.replaceTags(el.cloneNode(true));
      template.removeAttribute("tp-repeat");
      template.removeAttribute("tp-model");
      var repeat = el.getAttribute("tp-repeat");
      var model = el.getAttribute("tp-model");
      var result = document.createDocumentFragment();
      for (var j = 0; j < this.context[repeat].length; j++) {
        var entry = this.context[repeat][j];
        var context = {}
        context[model] = entry;
        var node = template.cloneNode(true);
        for(var key in entry) {
          this.updateToken(node, model + "." + key, context);
        }
        result.appendChild(node);
      };
      el.parentNode.replaceChild(result, el);
    };
  }

  Temply.prototype.initModels = function() {
    var elements = document.querySelectorAll("*[tp-model]");
    for(var i = 0; i < elements.length; i++) {
      var el = elements[i];
      var model = el.getAttribute("tp-model");
      if (this.tokens.indexOf(model) == -1) this.tokens.push(model);
    }
  }

  Temply.prototype.updateToken = function(element, model, context) {
    var elements = element.querySelectorAll("*[tp-model='" + model + "']");
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if (!element.hasAttribute("tp-repeat")) {
        try {
          var value = eval("context." + model) || "";
          if(element.tagName == "INPUT")
            element.value = value;
          else
            element.textContent = value;
        } catch(e) {};
      }
    }
  }

  Temply.prototype.run = function() {
    this.tokens.forEach(function(token) {
      this.updateToken(document, token, this.context);
    }, this);
  }

  window.Temply = Temply;

})(this, this.document);
