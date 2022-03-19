package requalificar.projecto.dto;

public class SimpleResponse 
{  
	private boolean statusOk;
    private String message;

    public SimpleResponse()
    {
        statusOk = false;
        message = "An error has occurred.";
    }

    public boolean isStatus() 
    {
        return statusOk;
    }

    public void setStatus(boolean status)
    {
        this.statusOk = status;
    }

    public String getMessage() 
    {
        return message;
    }

    public void setMessage(String message)
    {
        this.message = message;
    }

    public void setAsError()
    {
        statusOk = false;
        message = "An error has occurred.";
    }

    public void setAsSuccess(String message)
    {
        statusOk = true;
        this.message = message;
    }

    public void setAsError(String message)
    {
        statusOk = false;
        this.message = message;
    }
}