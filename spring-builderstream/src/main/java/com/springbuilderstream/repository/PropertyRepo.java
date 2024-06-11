package com.springbuilderstream.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.springbuilderstream.entity.Properties;

@Repository
public interface PropertyRepo extends JpaRepository<Properties,Integer>{
	List<Properties> findByEmail(String email);
}
