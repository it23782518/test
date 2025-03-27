// User.java
package com.example.Backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "nic", unique = true, length = 255)
    private String nic;

    @OneToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @Column(name = "first_date_deal")
    private LocalDate firstDateDeal;

    @Column(name = "last_fate_deal")
    private LocalDate lastDateDeal;

    @Column(name = "email", length = 255)
    private String email;

    @Column(name = "phone_number", length = 255)
    private String phoneNumber;

    // Getters and Setters
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getNic() { return nic; }
    public void setNic(String nic) { this.nic = nic; }
    public Address getAddress() { return address; }
    public void setAddress(Address address) { this.address = address; }
    public LocalDate getFirstDateDeal() { return firstDateDeal; }
    public void setFirstDateDeal(LocalDate firstDateDeal) { this.firstDateDeal = firstDateDeal; }
    public LocalDate getLastDateDeal() { return lastDateDeal; }
    public void setLastDateDeal(LocalDate lastDateDeal) { this.lastDateDeal = lastDateDeal; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
}