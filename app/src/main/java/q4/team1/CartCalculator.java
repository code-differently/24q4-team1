package q4.team1;


import java.util.ArrayList;

/**
 * The {@code CartCalculator} class provides functionality for calculating the total price
 * of the items in a shopping cart. It computes the sum of the prices of all {@link CartItem}
 * objects contained in a given {@link ShoppingCart}.
 */

public class CartCalculator {

   /**
     * Calculates the total price of all items in the specified shopping cart.
     *
     * This method iterates through all the {@link CartItem} objects in the cart,
     * summing their individual prices to compute the total price.
     *
     * @param cart The shopping cart containing the items whose total price is to be calculated.
     *             Must not be {@code null}.
     * @return The total price of the items in the cart. If the cart is empty, the method
     *         returns 0.0.
     */
  public double calculatePrice(ShoppingCart cart){
    ArrayList<CartItem> items = cart.getCartItems();
    double sum = 0;

     // Iterate through each cart item and sum their prices
    for (CartItem item: items) {
      sum += item.getPrice();
    }


    return sum;
  }
}
