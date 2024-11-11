package q4.team1.integration;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;

import q4.team1.CartCalculator;
import q4.team1.CartItem;
import q4.team1.Discount;
import q4.team1.FixedDiscount;
import q4.team1.PercentDiscount;
import q4.team1.ShoppingCart;
import q4.team1.exceptions.NegativeDiscountException;

public class DiscountIntegrationTest {
    CartCalculator cartCalculator;
    ShoppingCart cart;
    CartItem item1;
    CartItem item2;
    CartItem item3;

    private static class TestDiscount extends Discount {
        double discount;
        public TestDiscount(ArrayList<CartItem> items, double discount) {
            super(items);
            this.discount = discount;
        }

        @Override
        public double calculateDiscount() throws NegativeDiscountException {
            if (discount < 0) {
                throw new NegativeDiscountException("Error cannot have a negative discount");
            }
            return discount;
        }
    }

    @BeforeEach
    void setUp(){
        cartCalculator = new CartCalculator();
        cart = new ShoppingCart();

        item1 = new CartItem("banana", 1, 20);
        cart.addCartItem(item1);

        item2 = new CartItem("apple", 1, 10);
        cart.addCartItem(item2);

        item3 = new CartItem("orange", 1, 5);
        cart.addCartItem(item3);
    }

    @Test
    void testPercentDiscount_AppliedToOneItem(){
        ArrayList<CartItem> discountedItems = new ArrayList<CartItem>();
        discountedItems.add(new CartItem("pear", 1, 30));
        PercentDiscount percentDiscount = new PercentDiscount(discountedItems, 0.5);

        double discountPrice = percentDiscount.calculateDiscount();
        double total = cartCalculator.calculatePrice(cart);
        total += discountPrice;

        assertEquals(15.0, discountPrice);
        assertEquals(50.0, total);
    }

    @Test
    void testFixedDiscount_AppliedToOneItem(){
        ArrayList<CartItem> discountedItems = new ArrayList<CartItem>();
        discountedItems.add(new CartItem("pear", 1, 30));
        FixedDiscount fixedDiscount = new FixedDiscount(discountedItems, 10);

        double discountPrice = fixedDiscount.calculateDiscount();
        double total = cartCalculator.calculatePrice(cart);
        total += discountPrice;

        assertEquals(20.0, discountPrice);
        assertEquals(55.0, total);
    }

    @Test
    void testPercentDiscountAndFixedDiscount_AppliedToSameCart() {
        ArrayList<CartItem> percentDiscountedItems = new ArrayList<CartItem>();
        percentDiscountedItems.add(new CartItem("pear", 1, 30));
        PercentDiscount percentDiscount = new PercentDiscount(percentDiscountedItems, 0.5);

        ArrayList<CartItem> fixedDiscountedItems = new ArrayList<CartItem>();
        fixedDiscountedItems.add(new CartItem("lemon", 1, 30));
        FixedDiscount fixedDiscount = new FixedDiscount(fixedDiscountedItems, 10);

        double discountPricePercent = percentDiscount.calculateDiscount();
        double discountPriceFixed = fixedDiscount.calculateDiscount();
        double total = cartCalculator.calculatePrice(cart);
        total += discountPricePercent;
        total += discountPriceFixed;

        assertEquals(15.0, discountPricePercent);
        assertEquals(20.0, discountPriceFixed);
        assertEquals(70.0, total);
    }
}