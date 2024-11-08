package q4.team1;

import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.ArrayList;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import q4.team1.exceptions.ItemNotFoundException;

public class DiscountTest {
    private ArrayList<CartItem> items;

    private static class TestDiscount extends Discount {
        public TestDiscount(ArrayList<CartItem> items) {
            super(items);
        }

        @Override
        public double calculateDiscount() {
            return 10.0;
        }
    }

    @BeforeEach
    void setUp() {
        items = new ArrayList<CartItem>();
        items.add(new CartItem("Item1", 1, 20.0));
    }

    @Test
    void testDiscount_NullItems() {
        assertThrows(ItemNotFoundException.class, () -> {new TestDiscount(null);});
    }

    @Test
    void testDiscount_ValidItems() {
        TestDiscount discount = new TestDiscount(items);
        Assertions.assertEquals(10.0, discount.calculateDiscount());
    }
}