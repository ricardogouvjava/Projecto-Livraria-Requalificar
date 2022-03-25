package requalificar.projecto;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Base64;

public class ImageFileToString 
{
	    static String encode(String inputFilePath) throws IOException
	    {
	    	// Define where to get
	    	Path path = Paths.get(System.getProperty("user.home")+"\\Desktop\\teste.jpg");
	        // load file from /src/test/resources

	    	byte[] fileContent = Files.readAllBytes(path);
	        
	        String encodedString = Base64.getEncoder().encodeToString(fileContent);
	        return encodedString;

	    }
	    
	    static boolean decode(String encodedString) throws IOException
	    {
	    	// Define where to put
	    	Path path = Paths.get(System.getProperty("user.home")+"\\Desktop\\teste.jpg");
	        // create output file

	    	// decode the string and write to file
	        byte[] decodedBytes = Base64.getDecoder().decode(encodedString);
	       try {
	    	   // create output file
	    	   Files.write(path, decodedBytes, StandardOpenOption.CREATE);
	    	   return true;
	       }
	       catch(IOException e)
	       {
	    	   return false;
	       }

	}
}
