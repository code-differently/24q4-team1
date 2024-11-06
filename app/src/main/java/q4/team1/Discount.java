package q4.team1;

import java.util.ArrayList;

public abstract class Discount {
    private double cartTotal;
    private ArrayList<CartItem> items;

    public Discount(double cartTotal, ArrayList<CartItem> items) {
    this.cartTotal = cartTotal;
    this.items = items;
    }

    public abstract double calculateDiscount();
}
