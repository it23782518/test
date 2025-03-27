// StaffService.java
package com.example.Backend.service;

import com.example.Backend.model.Address;
import com.example.Backend.model.Staff;
import com.example.Backend.repository.AddressRepository;
import com.example.Backend.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StaffService {
    @Autowired
    private StaffRepository staffRepository;
    @Autowired
    private AddressRepository addressRepository;

    public Staff addStaff(Staff staff) {
        Address address = staff.getAddress();
        address = addressRepository.save(address);
        staff.setAddress(address);
        return staffRepository.save(staff);
    }

    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public Staff getStaffById(Long id) {
        return staffRepository.findById(id).orElse(null);
    }

    public void deleteStaffById(Long id) {
        staffRepository.deleteById(id);
    }


    /*
    public List<Staff> searchStaffByNameOrNic(String search) {
        return staffRepository.findByNameContainingIgnoreCaseOrNicContainingIgnoreCase(search, search);
    }
    */

    public List<Staff> searchStaff(String search) {
        try {
            Long id = Long.parseLong(search);
            return staffRepository.findByNameContainingIgnoreCaseOrNicContainingIgnoreCaseOrStaffId(search, search, id);
        } catch (NumberFormatException e) {
            return staffRepository.findByNameContainingIgnoreCaseOrNicContainingIgnoreCase(search, search);
        }
    }

    public Staff updateStaffPhoneNumber(Long staffId, String phoneNumber) {
        Optional<Staff> staff = staffRepository.findById(staffId);
        if (staff.isPresent()) {
            Staff st = staff.get();
            st.setPhoneNumber(phoneNumber);
            staffRepository.save(st);
            return st;
        } else {
            return null;
        }
    }

    public Staff updateStaffEmail(Long staffId, String email) {
        Optional<Staff> staff = staffRepository.findById(staffId);
        if (staff.isPresent()) {
            Staff st = staff.get();
            st.setEmail(email);
            staffRepository.save(st);
            return st;
        } else {
            return null;
        }
    }

    public Staff updateStaffPassword(Long staffId, String password) {
        Optional<Staff> staff = staffRepository.findById(staffId);
        if (staff.isPresent()) {
            Staff st = staff.get();
            st.setPassword(password);
            staffRepository.save(st);
            return st;
        } else {
            return null;
        }
    }

    public Staff updateStaffAddress(Long staffId, Address address) {
        Optional<Staff> staff = staffRepository.findById(staffId);
        if (staff.isPresent()) {
            Staff st = staff.get();
            Address oldAddress = st.getAddress();
            oldAddress.setHouseNo(address.getHouseNo());
            oldAddress.setStreet(address.getStreet());
            oldAddress.setCity(address.getCity());
            addressRepository.save(oldAddress);
            return st;
        } else {
            return null;
        }
    }

    public Staff updateStaffRole(Long staffId, String role) {
        Optional<Staff> staff = staffRepository.findById(staffId);
        if (staff.isPresent()) {
            Staff st = staff.get();
            // Capitalize first letter and lowercase the rest to match enum
            String normalizedRole = role.substring(0, 1).toUpperCase() + role.substring(1).toLowerCase();
            st.setRole(Staff.Role.valueOf(normalizedRole));
            staffRepository.save(st);
            return st;
        } else {
            return null;
        }
    }

    public Staff updateStaffName(Long staffId, String name) {
        Optional<Staff> staff = staffRepository.findById(staffId);
        if (staff.isPresent()) {
            Staff st = staff.get();
            st.setName(name);
            staffRepository.save(st);
            return st;
        } else {
            return null;
        }
    }

    public Staff updateStaffNic(Long staffId, String nic) {
        Optional<Staff> staff = staffRepository.findById(staffId);
        if (staff.isPresent()) {
            Staff st = staff.get();
            st.setNic(nic);
            staffRepository.save(st);
            return st;
        } else {
            return null;
        }
    }
}