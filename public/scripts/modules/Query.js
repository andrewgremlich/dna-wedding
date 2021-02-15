function Query(selector) {
  this.element = undefined;

  this.query(selector);
}

Query.prototype.query = function (selector) {
  this.element = document.querySelector(selector);
};

export default Query;
