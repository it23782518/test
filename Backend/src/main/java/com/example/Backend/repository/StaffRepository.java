package com.example.Backend.repository;

import com.example.Backend.model.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StaffRepository extends JpaRepository<Staff, Long> {


    List<Staff> findByNameContainingIgnoreCaseOrNicContainingIgnoreCase(String search, String search1);

    List<Staff> findByNameContainingIgnoreCaseOrNicContainingIgnoreCaseOrStaffId(String search, String search1, Long id);
}