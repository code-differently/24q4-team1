package q4.team1.exceptions;

public class ItemNotFoundException extends IllegalArgumentException {
    public ItemNotFoundException(String message){
        super(message);
    }
    public ItemNotFoundException(){
        super();
    }
}