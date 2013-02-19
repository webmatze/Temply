module( "Replace and fill template tags" );

test("should fill tp-model tags with data", function() {
  $("#qunit-fixture").append($("<span tp-model=\"name\"></span>"));
  var temply = new Temply({name: "Test"});
  temply.run();
  equal($("#qunit-fixture").html(), "<span tp-model=\"name\">Test</span>", "tp-model filled with data");
});

test("should replace {{name}} template tags", function() {
  $("#qunit-fixture").html("{{name}}");
  var temply = new Temply({name: "World"});
  temply.run();
  equal($("#qunit-fixture").html(), "<span tp-model=\"name\">World</span>", "tag replaced");
});

test("should repeat tp-repeat tags", function() {
  $("#qunit-fixture").append($("<div tp-repeat=\"entries\" tp-model=\"entry\">{{entry.name}}</div>"));
  var temply = new Temply({entries: [{name:"Hello"},{name:"World"}]});
  temply.run();
  equal($("#qunit-fixture").html(), "<div><span tp-model=\"entry.name\">Hello</span></div><div><span tp-model=\"entry.name\">World</span></div>", "tag repeated");
});
