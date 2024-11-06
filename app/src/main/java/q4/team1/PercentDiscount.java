package q4.team1;

import java.util.ArrayList;

public class PercentDiscount extends Discount {
    private ArrayList<CartItem> items;
    private double discountRate;

    public PercentDiscount(double cartTotal, ArrayList<CartItem> items, double discountRate) {
        super(cartTotal, items);
        this.discountRate = discountRate;
    }

    public double getDiscountRate() {
        return discountRate;
    }

    @Override
    public double calculateDiscount() {
        double sum = 0;
        for (CartItem item: items) {
            sum += item.getPrice();
        }
        return sum * 0.1;
    }
}
