class CurrentDTO {
  constructor(user) {
    (this.user = user.email), (this.rol = user.rol), (this.cart = user.cart);
  }
}
module.exports = CurrentDTO;
