package requalificar.projecto.utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Base64;

public class ImageFileToString 
{
	    public static String encode(String inputFilePath) throws IOException
	    {
	    	// Onde vai buscar o ficheiro
	    	//Path path = Paths.get("C:\\Users\\ricar\\Documents\\GitHub\\Projecto-Livraria-Requalificar\\backend\\src\\test\\resources\\teste.jpg");
	    	//Path path = Paths.get("C:\\Users\\Java08\\Documents\\GitHub\\Projecto-Livraria-Requalificar\\backend\\src\\main\\resources\\imagens\\teste.jpg");
	    	// Path path = Paths.get(inputFilePath);
	    	Path path = Paths.get(System.getProperty("user.home")+ "\\Documents\\GitHub\\Projecto-Livraria-Requalificar\\backend\\src\\main\\resources\\imagens\\teste.jpg");
	    	

	    	byte[] fileContent = Files.readAllBytes(path); 
	        
	    	// devolve codificacao
	    	String encodedString = Base64.getEncoder().encodeToString(fileContent);
	        return encodedString;
	    }
	    
	    public static String decode(String encodedString) throws IOException
	    {
	    	// Define onde guardar
	    	Path path = Paths.get(System.getProperty("user.home")+ "\\Documents\\GitHub\\Projecto-Livraria-Requalificar\\backend\\src\\main\\resources\\imagens\\teste.jpg");
	    	
	    	//Path path = Paths.get("C:\\Users\\Java08\\Documents\\GitHub\\Projecto-Livraria-Requalificar\\backend\\src\\main\\resources\\imagens\\teste.jpg");
	    	//Path path = Paths.get("C:\\Users\\ricar\\Documents\\GitHub\\Projecto-Livraria-Requalificar\\backend\\src\\test\\resources\\teste.jpg");
	    	
	    	// descodifica
	        byte[] decodedBytes = Base64.getDecoder().decode(encodedString);
    	    
	        // devolve caminho onde escreveu a imagem
	        return Files.write(path, decodedBytes, StandardOpenOption.CREATE).toString();
	        
		}
}
