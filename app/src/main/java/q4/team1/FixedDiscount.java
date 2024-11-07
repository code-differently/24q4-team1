package q4.team1;

import java.util.ArrayList;

import q4.team1.exceptions.NegativeDiscountException;

/**
 * The {@code FixedDiscount} class extends the {@code Discount} class to apply
 * a fixed discount amount on the total price of items in a shopping cart.
 */
public class FixedDiscount extends Discount {

    /** List of items in the cart. */
    private ArrayList<CartItem> items;

    /** The fixed discount amount to be subtracted from the total price. */
    private double discountAmount;

    /**
     * Constructs a {@code FixedDiscount} instance with the specified cart total, items, and discount amount.
     *
     * @param cartTotal The total cost of items in the cart before applying the discount.
     * @param items The list of items in the cart.
     * @param discountAmount The fixed discount amount to subtract from the cart total.
     */
    public FixedDiscount(double cartTotal, ArrayList<CartItem> items, double discountAmount) {
        super(cartTotal, items);
        this.items = items;
        if (discountAmount < 0){
          throw new NegativeDiscountException("Error cannot have a negative discount");
        }
        this.discountAmount = discountAmount;
    }

    /**
     * Calculates the discount by subtracting the fixed discount amount from the total
     * price of all items in the cart.
     *
     * @return The discounted total after applying the fixed discount amount.
     */
    @Override
    public double calculateDiscount() {
        double sum = 0;
        for (CartItem item : items) {
            sum += item.getPrice();
        }
        return sum - discountAmount;
    }
}
