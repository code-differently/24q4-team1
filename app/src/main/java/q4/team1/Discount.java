package q4.team1;

import java.util.ArrayList;

import q4.team1.exceptions.ItemNotFoundException;

/**
 * The {@code Discount} abstract class provides a framework for calculating
 * various types of discounts on a shopping cart.
 * <p>
 * Subclasses of {@code Discount} should implement the {@link #calculateDiscount()}
 * method to define specific discount calculation strategies.
 */
public abstract class Discount {
    /** List of items in the cart. */
    private ArrayList<CartItem> items;

    /**
     * Constructs a {@code Discount} instance with the specified cart total and list of items.
     *
     * @param items The list of items in the cart.
     */
    public Discount(ArrayList<CartItem> items) {
        if (items == null){
            throw new ItemNotFoundException("Error no items to apply discount to");
        }
        this.items = items;
    }

    /**
     * Calculates the discount amount based on a specific strategy defined in subclasses.
     *
     * @return The calculated discount amount.
     */
    public abstract double calculateDiscount();
}
