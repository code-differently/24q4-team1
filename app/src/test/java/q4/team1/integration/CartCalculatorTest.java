package q4.team1.integration;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import q4.team1.CartCalculator;
import q4.team1.ShoppingCart;

public class CartCalculatorTest {
  CartCalculator checkout;
  ShoppingCart cart;
  @BeforeEach
  public void setUp(){
    checkout = new CartCalculator();
    cart = new ShoppingCart();
  }

  @Test
  public void testCalculatePriceReturnsExpectedPrice(){

  }
}
