package q4.team1;

import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.ArrayList;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import q4.team1.exceptions.ItemNotFoundException;
import q4.team1.exceptions.NegativeDiscountException;

public class DiscountTest {
    private ArrayList<CartItem> items;

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
        assertThrows(ItemNotFoundException.class, () -> {new TestDiscount(null, 10.0);});
    }

    @Test
    void testDiscount_ValidItems() {
        TestDiscount discount = new TestDiscount(items, 10.0);
        Assertions.assertEquals(10.0, discount.calculateDiscount());
    }

    @Test
    void testDiscount_NegativeDiscount() {
        assertThrows(NegativeDiscountException.class, () -> {new TestDiscount(items, -10.0).calculateDiscount();});
    }
}