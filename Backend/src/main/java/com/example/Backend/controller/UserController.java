package com.example.Backend.controller;

import com.example.Backend.model.Address;
import com.example.Backend.model.User;
import com.example.Backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/add-user")
    public User addUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @GetMapping("/all-users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    @DeleteMapping("/delete-user/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
    }

    @GetMapping("/search-user")
    public List<User> searchUser(@RequestParam String search) {
        return userService.searchUser(search);
    }

    @PutMapping("/update-user-name/{id}")
    public User updateUserName(@PathVariable Long id, @RequestParam String name) {
        return userService.updateUserName(id, name);
    }

    @PutMapping("/update-user-Nic/{id}")
    public User updateUserNic(@PathVariable Long id, @RequestParam String nic) {
        return userService.updateUserNic(id, nic);
    }

    @PutMapping("/update-user-email/{id}")
    public User updateUserEmail(@PathVariable Long id, @RequestParam String email) {
        return userService.updateUserEmail(id, email);
    }

    @PutMapping("/update-user-phone/{id}")
    public User updateUserPhoneNumber(@PathVariable Long id, @RequestParam String phoneNumber) {
        return userService.updateUserPhoneNumber(id, phoneNumber);
    }

    @PutMapping("/update-user-fristdealdate/{id}")
    public User updateUserFristDealDate(@PathVariable Long id, @RequestParam("fristDealDate") @DateTimeFormat(pattern = "yyyy-MM-dd")Date fristDealDate) {
        return userService.updateUserFirstDateDeal(id, fristDealDate);
    }

    @PutMapping("/update-user-lastdealdate/{id}")
    public User updateUserLastDealDate(@PathVariable Long id, @RequestParam("lastDealDate") @DateTimeFormat(pattern = "yyyy-MM-dd")Date lastDealDate) {
        return userService.updateUserLastDateDeal(id, lastDealDate);
    }

    @PutMapping("/update-user-address/{id}")
    public User updateUserAddress(@PathVariable Long id, @RequestBody Address address) {
        return userService.updateUserAddress(id, address);
    }
}
