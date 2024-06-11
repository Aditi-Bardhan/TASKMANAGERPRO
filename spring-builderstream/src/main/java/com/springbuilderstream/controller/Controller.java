package com.springbuilderstream.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springbuilderstream.entity.User;
import com.springbuilderstream.repository.UserRepo;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping
@CrossOrigin("*")
public class Controller {

	@Autowired
	UserRepo rep;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody User user, HttpSession session) {
        User storedUser = rep.findByEmail(user.getEmail());
        if (storedUser != null && user.getPassword().equals(storedUser.getPassword())) {
            session.setAttribute("email", storedUser.getEmail());
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
	
	@PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        User storedUser = rep.findByEmail(user.getEmail());
        if (storedUser != null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } else {
            rep.save(user);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
    }
	
	  @GetMapping("/getData/{email}")
	  public User getUserByEmail(@PathVariable String email) {
	    User user = rep.findByEmail(email);
	    return user;
	  }
	  
	  @PutMapping("/changePass")
	    public ResponseEntity<String> changePassword(@RequestBody User passwordChangeRequest) {
	        User user = rep.findByEmail(passwordChangeRequest.getEmail());
	        if (user == null) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User not found");
	        }
	        user.setPassword(passwordChangeRequest.getPassword());
	        rep.save(user);
	        return ResponseEntity.status(HttpStatus.OK).body("Password changed successfully");
	    }
	 
//	  @PutMapping("/uploadImage/{email}")
//	  public String uploadImage(@PathVariable("email") String email, @RequestParam("image") MultipartFile image) {
//	      User optionalUser = rep.findByEmail(email);
//	      if (optionalUser == null) {
//	          return "User not found";
//	      }
//	      int userId = optionalUser.getId();
//
//	      try {
//	          UserPicture userPicture = new UserPicture();
//	          userPicture.setId(userId);
//	          userPicture.setPicture(image.getBytes());
//
//	          // Set the relationship
//	          optionalUser.setUserPicture(userPicture);
//	          userPicture.setUser(optionalUser);
//
//	          rep.save(optionalUser);
//	          userPictureRepository.save(userPicture);
//	          
//	          return "Picture uploaded successfully";
//	      } catch (IOException e) {
//	          return "Error occurred while reading the image data";
//	      }
//	  }

//	      User user=optionalUser;

//	      try {
//	          if (!image.isEmpty()) {
//	              // Generate a unique filename for the image
//	              String filename = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
//	              
//	              // Define the directory path where the image will be stored
//	              String directoryPath = "C:\\Users\\rashm\\OneDrive\\Desktop\\Projects\\Pro8\\spring-builderstream\\src\\main\\resources\\Profile-Images";
//	              
//	              // Create the directory if it doesn't exist
//	              File directory = new File(directoryPath);
//	              if (!directory.exists()) {
//	                  directory.mkdirs();
//	              }
//	              
//	              // Save the image file to the specified directory
//	              String imagePath = directoryPath + filename;
//	              File imageFile = new File(imagePath);
//	              image.transferTo(imageFile);
//	              
//	              // Set the image path in the user entity
//	              user.setPicture(imagePath);
//	              
//	              // Save the user entity with the updated image path
//	              rep.save(user);
//	          }
//	      } catch (IOException e) {
//	          return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image");
//	      }
//
//	      return ResponseEntity.ok("Image uploaded successfully");
//	  }

}
