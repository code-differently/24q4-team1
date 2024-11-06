package q4.team1;


import java.util.ArrayList;

public class CartCalculator {

  public double calculatePrice(ShoppingCart cart){
    ArrayList<CartItem> items = cart.getCartItems();
    double sum = 0;

    for (CartItem item: items) {
      sum += item.getPrice(); // the price property could store the discounted price
    }


    return sum;
  }
 
}

