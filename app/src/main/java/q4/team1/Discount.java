package q4.team1;

import java.util.ArrayList;

/**
 * The {@code Discount} abstract class provides a framework for calculating
 * various types of discounts on a shopping cart.
 * <p>
 * Subclasses of {@code Discount} should implement the {@link #calculateDiscount()}
 * method to define specific discount calculation strategies.
 */
public abstract class Discount {

    /** The total cost of items in the cart before applying any discount. */
    private double cartTotal;

    /** List of items in the cart. */
    private ArrayList<CartItem> items;

    /**
     * Constructs a {@code Discount} instance with the specified cart total and list of items.
     *
     * @param cartTotal The total cost of items in the cart before applying any discount.
     * @param items The list of items in the cart.
     */
    public Discount(double cartTotal, ArrayList<CartItem> items) {
        this.cartTotal = cartTotal;
        this.items = items;
    }

    /**
     * Calculates the discount amount based on a specific strategy defined in subclasses.
     *
     * @return The calculated discount amount.
     */
    public abstract double calculateDiscount();
}

