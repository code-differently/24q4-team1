package q4.team1.integration;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import q4.team1.CartCalculator;
import q4.team1.CartItem;
import q4.team1.ShoppingCart;

public class CartCalculatorTest {
  CartCalculator checkout;
  ShoppingCart cart;
  CartItem item;
  @BeforeEach
  public void setUp(){
    checkout = new CartCalculator();
    cart = new ShoppingCart();
    item = new CartItem("banana", 1, 20);
  }

  @Test
  public void testCalculatePriceReturns0(){
    assertEquals(0.0, checkout.calculatePrice(cart));
  }

  @Test
  public void testCalculatePriceReturnsNonNegative(){
    cart.addCartItem(item);

    assertEquals(20, checkout.calculatePrice(cart));
  }

  @Test
  public void testCalculatePriceReturnsPriceTimesQuantity(){
    // name: apple, quantity: 55, price: 5
    CartItem item2 = new CartItem("apple", 55, 5);
    cart.addCartItem(item2);

    assertEquals(275, checkout.calculatePrice(cart));
  }

}
