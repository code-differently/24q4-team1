# 24q4-team1
Project repo for team 1


## What problem were you attempting to solve?
- Organizing/managing items, quantities, pricing
- Seamless checkout integration
- Total Calculations

## How does your design address the solution?
- Items are easily displayed, accessed, and removed
  - ArrayLists make access efficient
- Item quantity is tracked and prevents negative instances
  - Quantities can be updated dynamically
- Abstract Discount class w/ flexible subclasses
  - Allows for discount combos
  - Cart total can be updated dynamically
- Straightforward checkout integration
  - Discounts are applied and total is calculated
  - Cart total can be passed externally
- Separation of concerns and error handling
  - common errors are handled w/ each step
  - Ongoing maintenance is simplified

## How did you address each of the SOLID principles? [All files](app/src/main/java/q4/team1)
- Single Responsibility Principle
  - Each of our classes has a single and clear responsibility
- Open/Closed Principle
  - We have an abstract class called discount that is extendable without many modifications to itself
  [Discount File](app/src/main/java/q4/team1/Discount.java)
  - We also have a cart item class that could be extended to create specific items and it would not cause any issues
  [CartItem file](app/src/main/java/q4/team1/CartItem.java)
- Liskov Substitution Principle
  - Our classes that use the abstract class of discount correctly implement its methods within expectation
  [Discount File](app/src/main/java/q4/team1/Discount.java)
- Interface Segregation Principle
  - Our discount class provides the methods needed and no more, allowing for flexibility
  [Discount Class](app/src/main/java/q4/team1/Discount.java)
- Dependency Inversion Principle
  - All our classes follow the principle by not enabling one class to be too dependant on the other

## How would you improve on your solution?
- Support different payment methods
  - credit
  - debit
  - paypal
- Have a tax collection system
  - Include tax calculation based on consumers location
- Out of stock handling
  - Include a check with inventory to ensure that items in the cart are in stock



