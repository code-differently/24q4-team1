package q4.team1;

import java.util.ArrayList;

/**
 * The {@code PercentDiscount} class extends the {@code Discount} class to provide
 * a discount based on a fixed percentage applied to the total price of items in a cart.
 */
public class PercentDiscount extends Discount {

    /** List of items in the cart. */
    private ArrayList<CartItem> items;

    /** Discount rate applied to the cart's total. */
    private double discountRate;

    /**
     * Constructs a {@code PercentDiscount} with the specified cart total, items, and discount rate.
     *
     * @param cartTotal The total cost of items in the cart before applying the discount.
     * @param items The list of items in the cart.
     * @param discountRate The rate at which the discount is applied (e.g., 0.10 for 10% off).
     */
    public PercentDiscount(double cartTotal, ArrayList<CartItem> items, double discountRate) {
        super(cartTotal, items);
        this.items = items;
        this.discountRate = discountRate;
    }

    /**
     * Returns the discount rate applied to the cart.
     *
     * @return The discount rate as a decimal (e.g., 0.10 for 10%).
     */
    public double getDiscountRate() {
        return discountRate;
    }

    /**
     * Calculates the discount based on the total price of items and the specified discount rate.
     *
     * @return The discount amount calculated as the sum of item prices multiplied by the discount rate.
     */
    @Override
    public double calculateDiscount() {
        double sum = 0;
        for (CartItem item : items) {
            sum += item.getPrice();
        }
        return sum * discountRate;
    }
}

