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

test("should check input field and fill data into template tags", function() {
  $("#qunit-fixture").append($("<input type=\"text\" tp-model=\"test\" />"));
  $("#qunit-fixture").append("{{test}}");
  var temply = new Temply({});
  temply.run();
  var input = $('#qunit-fixture input');
  input.val("A");
  keyvent.on(input[0]).up();
  equal($("#qunit-fixture").html(), "<input tp-model=\"test\" type=\"text\"><span tp-model=\"test\">A</span>", "input tag success");
});

test("should replace {{value}} template tags within tag attributes", function() {
  $("#qunit-fixture").append($("<a href=\"{{url}}\">Test</a>"));
  var temply = new Temply({url: "http://google.com"});
  temply.run();
  equal($("#qunit-fixture").html(), "<a href=\"http://google.com\">Test</a>", "attribute success");
});

