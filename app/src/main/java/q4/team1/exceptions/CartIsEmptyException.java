package q4.team1.exceptions;

public class CartIsEmptyException extends IllegalArgumentException {
    public CartIsEmptyException(String message){
        super(message);
    }
    public CartIsEmptyException(){
        super();
    }
}