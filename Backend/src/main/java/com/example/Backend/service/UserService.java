package com.example.Backend.service;

import com.example.Backend.model.Address;
import com.example.Backend.model.User;
import com.example.Backend.repository.AddressRepository;
import com.example.Backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AddressRepository addressRepository;

    public User addUser(User user) {
        Address address = user.getAddress();
        address = addressRepository.save(address);
        user.setAddress(address);
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    public List<User> searchUser(String search) {
        try {
            Long id = Long.parseLong(search);
            return userRepository.findByNameContainingIgnoreCaseOrNicContainingIgnoreCaseOrUserId(search, search, id);
        } catch (NumberFormatException e) {
            return userRepository.findByNameContainingIgnoreCaseOrNicContainingIgnoreCase(search, search);
        }
    }

    public User updateUserName(Long id, String name) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setName(name);
            return userRepository.save(user);
        } else {
            return null;
        }
    }

    public User updateUserNic(Long id, String nic) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setNic(nic);
            return userRepository.save(user);
        } else {
            return null;
        }
    }

    public User updateUserEmail(Long id, String email) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setEmail(email);
            return userRepository.save(user);
        } else {
            return null;
        }
    }

    public User updateUserPhoneNumber(Long id, String phoneNumber) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setPhoneNumber(phoneNumber);
            return userRepository.save(user);
        } else {
            return null;
        }
    }

    public User updateUserFirstDateDeal(Long id, Date date) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setFirstDateDeal(new java.sql.Date(date.getTime()).toLocalDate());
            return userRepository.save(user);
        } else {
            return null;
        }
    }

    public User updateUserLastDateDeal(Long id, Date date) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setLastDateDeal(new java.sql.Date(date.getTime()).toLocalDate());
            return userRepository.save(user);
        } else {
            return null;
        }
    }

    public User updateUserAddress(Long id, Address address) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            Address oldAddress = user.getAddress();
            oldAddress.setHouseNo(address.getHouseNo());
            oldAddress.setStreet(address.getStreet());
            oldAddress.setCity(address.getCity());
            addressRepository.save(oldAddress);
            return user;
        } else {
            return null;
        }
    }

}
