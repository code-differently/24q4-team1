package q4.team1;

public class CartItem {

  private String name;
  private int quantity;
  private double price;
  private double orgPrice;


  public CartItem(String name, int quantity, double orgPrice){
    this.name = name;
    this.quantity = quantity;
    this.orgPrice = orgPrice;
    this.price = orgPrice;
  }
  public String getName(){
    return name;
  }
  public int getQuantity(){
    return quantity;
  }
  public double getPrice(){
    return price;
  }
  public double getOrgPrice(){
    return orgPrice;
  }
  public String setName(){
    return name;
  }
  public int setQuantity(){
    return quantity;
  }
  public double setPrice(){
    return price;
  }
  @Override
  public String toString ()
    return "name: " + name + " price: $" + price + " " + "quantity: " + quantity;
  }
