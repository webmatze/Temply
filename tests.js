test("should replace {{name}} template tags", function() {
  var fixture = document.getElementById( "qunit-fixture" );
  fixture.innerHTML = "{{name}}";
  var temply = new Temply({name: "World"});
  temply.run();
  equal(document.getElementById("qunit-fixture").innerHTML, "<span tp-model=\"name\">World</span>", "tag replaced");
});
