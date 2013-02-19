module( "Replace and fill template tags" );

test("should fill tp-model tags with data", function() {
  var fixture = document.getElementById( "qunit-fixture" );
  var span = document.createElement("span");
  span.setAttribute("tp-model", "name");
  fixture.appendChild(span);
  var temply = new Temply({name: "Test"});
  temply.run();
  equal(document.getElementById("qunit-fixture").innerHTML, "<span tp-model=\"name\">Test</span>", "tp-model filled with data");
});

test("should replace {{name}} template tags", function() {
  var fixture = document.getElementById( "qunit-fixture" );
  fixture.innerHTML = "{{name}}";
  var temply = new Temply({name: "World"});
  temply.run();
  equal(document.getElementById("qunit-fixture").innerHTML, "<span tp-model=\"name\">World</span>", "tag replaced");
});
