package requalificar.projecto;

import static org.junit.Assert.assertTrue;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Base64;

import org.apache.commons.io.FileUtils;
import org.junit.jupiter.api.Test;

public class ImageFileToString64
{
	    private String inputFilePath = "teste.jpg";
	    private String outputFilePath = "test2_copy.jpg";

	    @Test
	    public void fileToBase64StringConversion() throws IOException
	    {
	        // load file from /src/test/resources
	        ClassLoader classLoader = getClass().getClassLoader();
	        
	        File inputFile = new File(classLoader
	          .getResource(inputFilePath)
	          .getFile());

	        byte[] fileContent = FileUtils.readFileToByteArray(inputFile);
	        
	        String encodedString = Base64
	        							.getEncoder()
	        							.encodeToString(fileContent);

	        // create output file
	        File outputFile = new File(inputFile
	          .getParentFile()
	          .getAbsolutePath() + File.pathSeparator + outputFilePath);

	        // decode the string and write to file
	        byte[] decodedBytes = Base64
	        							.getDecoder()
	        							.decode(encodedString);
	       
			Path path = Paths.get(System.getProperty("user.home")+"\\Desktop\\teste.jpg");
			Files.write(path, decodedBytes, StandardOpenOption.CREATE);

			FileUtils.writeByteArrayToFile(outputFile, decodedBytes);

	        assertTrue(FileUtils.contentEquals(inputFile, outputFile));
	}
}
