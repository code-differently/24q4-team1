package q4.team1.exceptions;

public class NegativeDiscountException extends RuntimeException{

  public NegativeDiscountException(String message){
    super(message);
  }

  public NegativeDiscountException(){
    super();
  }

}
