package com.example.Backend.repository;

import com.example.Backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByNameContainingIgnoreCaseOrNicContainingIgnoreCase(String name, String nic);

    List<User> findByNameContainingIgnoreCaseOrNicContainingIgnoreCaseOrUserId(String search, String search1, Long id);
}