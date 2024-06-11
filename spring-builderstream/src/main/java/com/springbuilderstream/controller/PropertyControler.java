package com.springbuilderstream.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springbuilderstream.entity.Properties;
import com.springbuilderstream.repository.PropertyRepo;

@RestController
@RequestMapping("task")
@CrossOrigin("*")
public class PropertyControler {

	@Autowired
	PropertyRepo repo;
	
	@PostMapping("/add")
	public ResponseEntity<String> addProperty(@RequestBody Properties data){
		repo.save(data);
		return ResponseEntity.ok("Property Details Added");
	}
	
	@GetMapping("/getData/{email}")
	public List<Properties> getUserByEmail(@PathVariable String email) {
	  List<Properties> propsList = repo.findByEmail(email);
	  return propsList;
	}
	
	@DeleteMapping("/deleteOne/{id}")
	public ResponseEntity<HttpStatus> deleteProperty(@PathVariable int id){
	    Properties property = repo.findById(id)
	            .orElse(null);
	    if (property == null) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
	    }
	    repo.delete(property);
	    return ResponseEntity.noContent().build();
	}

}
