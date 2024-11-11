package q4.team1;

import q4.team1.exceptions.ItemHasNegativeException;

/**
 * The {@code CartItem} class represents an item in a shopping cart.
 * It holds information about the item's name, quantity, original price, and
 * total price (calculated as the quantity multiplied by the original price).
 *
 * Each {@code CartItem} object encapsulates the properties of an item in the cart
 * and provides methods to access and modify them. If an invalid negative price is provided
 * during object creation, an {@link ItemHasNegativeException} is thrown.
 */
public class CartItem {

    private String name;
    private int quantity;
    private double price;
    private double orgPrice;

    /**
     * Constructs a new {@code CartItem} with the specified name, quantity, and original price.
     * The total price is calculated as {@code quantity * original price}.
     * If the provided original price is negative, an {@link ItemHasNegativeException} is thrown.
     *
     * @param name The name of the item. Must not be {@code null}.
     * @param quantity The quantity of the item in the cart. Must be a positive integer.
     * @param orgPrice The original price of a single unit of the item. Must be non-negative.
     * @throws ItemHasNegativeException if the provided {@code orgPrice} is negative.
     */
    public CartItem(String name, int quantity, double orgPrice) {
        this.name = name;
        this.quantity = quantity;
        if (orgPrice < 0) {
            throw new ItemHasNegativeException("Error item price cannot be negative");
        }
        this.orgPrice = orgPrice;
        this.price = orgPrice * quantity;
    }

    /**
     * Gets the name of the cart item.
     *
     * @return The name of the item.
     */
    public String getName() {
        return name;
    }

    /**
     * Gets the quantity of the cart item.
     *
     * @return The quantity of the item.
     */
    public int getQuantity() {
        return quantity;
    }

    /**
     * Gets the total price of the cart item, calculated as
     * {@code orgPrice * quantity}.
     *
     * @return The total price of the item.
     */
    public double getPrice() {
        return this.price = this.orgPrice * this.quantity;
    }

    /**
     * Gets the original price of a single unit of the cart item.
     *
     * @return The original price of the item.
     */
    public double getOrgPrice() {
        return this.orgPrice;
    }

    /**
     * Sets the name of the cart item.
     *
     * @param name The new name of the item. Must not be {@code null}.
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Sets the quantity of the cart item and updates the total price accordingly.
     *
     * @param quantity The new quantity of the item. Must be a positive integer.
     */
    public void setQuantity(int quantity) {
        this.quantity = quantity;
        this.price = quantity * orgPrice;
    }

    /**
     * Returns a string representation of the {@code CartItem} object,
     * including the name, total price, and quantity.
     *
     * @return A string describing the item, its price, and quantity.
     */
    @Override
    public String toString() {
        return "name: " + name + " price: $" + price + " quantity: " + quantity;
    }
}
