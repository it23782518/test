package com.example.Backend.controller;

import com.example.Backend.model.Address;
import com.example.Backend.model.Staff;
import com.example.Backend.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/staff")
public class StaffController {
    @Autowired
    private StaffService staffService;

    @PostMapping("/add-staff")
    public Staff addStaff(@RequestBody Staff staff) {
        return staffService.addStaff(staff);
    }

    @GetMapping("/get-staff")
    public List<Staff> getAllStaff() {
        return staffService.getAllStaff();
    }

    @DeleteMapping("/delete-staff/{id}")
    public void deleteStaff(@PathVariable Long id) {
        staffService.deleteStaffById(id);
    }

    @GetMapping("/search-staff")
    public List<Staff> searchStaff(@RequestParam String search) {
        return staffService.searchStaff(search);
    }

    @GetMapping("/get-staff/{id}")
    public Staff getStaffById(@PathVariable Long id) {
        return staffService.getStaffById(id);
    }

    @PutMapping("/update-staff-Role/{id}")
    public Staff updateStaffRole(@PathVariable Long id, @RequestParam String Role) {
        return staffService.updateStaffRole(id, Role);
    }

    @PutMapping("/update-staff-Address/{id}")
    public Staff updateStaffAddress(@PathVariable Long id, @RequestBody Address address) {
        return staffService.updateStaffAddress(id, address);
    }

    @PutMapping("/update-staff-Phone/{id}")
    public Staff updateStaffPhone(@PathVariable Long id, @RequestParam String phone) {
        return staffService.updateStaffPhoneNumber(id, phone);
    }

    @PutMapping("/update-staff-Email/{id}")
    public Staff updateStaffEmail(@PathVariable Long id, @RequestParam String email) {
        return staffService.updateStaffEmail(id, email);
    }

    @PutMapping("/update-staff-Password/{id}")
    public Staff updateStaffPassword(@PathVariable Long id, @RequestParam String password) {
        return staffService.updateStaffPassword(id, password);
    }

    @PutMapping("/update-staff-Name/{id}")
    public Staff updateStaffName(@PathVariable Long id, @RequestParam String name) {
        return staffService.updateStaffName(id, name);
    }

    @PutMapping("/update-staff-Nic/{id}")
    public Staff updateStaffNic(@PathVariable Long id, @RequestParam String nic) {
        return staffService.updateStaffNic(id, nic);
    }
}