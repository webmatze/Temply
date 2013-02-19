/*!
FeedReader.js version 0.01 -- by Mathias Karstädt
A demo script to demonstrate Temply.
More info at: http://mathiaskarstaedt.de
*/
var FeedReader = function(feeds) {
  this.context = {};
  this.context["feeds"] = feeds || [];
  this.feedsElement = document.getElementById("feeds");
  this.storiesElement = document.getElementById("stories").cloneNode(true);
  this.loadFeeds();
}
FeedReader.prototype.loadFeeds = function() {
  this.feedsTemplate = new Temply(this.context, this.feedsElement);
  this.feedsTemplate.run();
  var feedElements = this.feedsElement.querySelectorAll("li a");
  for (var i = 0; i < feedElements.length; i++) {
    var element = feedElements[i];
    element.addEventListener("click", this.handleFeedClick.bind(this));
  };
}
FeedReader.prototype.handleFeedClick = function(element) {
  var link = element.target;
  var feed = this.context.feeds.filter((function(e, i, a) {
    return (e.name == this.name);
  }).bind({name: link.innerHTML}));
  this.loadStories(feed[0].url);
  return false;
}
FeedReader.prototype.loadStories = function(feed) {
  var feed = new google.feeds.Feed(feed);
  feed.load((function(result) {
    var storiesElementClone = this.storiesElement.cloneNode(true);
    this.storiesTemplate = new Temply(result.feed, storiesElementClone);
    var storiesElement = document.getElementById("stories");
    storiesElement.parentNode.replaceChild(storiesElementClone, storiesElement);
  }).bind(this));
}
