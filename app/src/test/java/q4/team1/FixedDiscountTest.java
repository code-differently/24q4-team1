package q4.team1;

import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import q4.team1.exceptions.NegativeDiscountException;

public class FixedDiscountTest {

  @Test
  public void testDiscountException_AmountIsNegative(){

    assertThrows(NegativeDiscountException.class, () -> {
      new FixedDiscount(0, null, -99);
    });

  }
}
