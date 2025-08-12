package com.boran.crm.domain.entity;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "customers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer extends BaseEntity {
    
    @Column(name = "customer_name", nullable = false)
    private String name;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String phone;
    
    @Column(name = "is_active", nullable = false)
    private boolean isActive = true;
    
    @Column(columnDefinition = "TEXT")
    private String address;
    
    @Column(length = 500)
    private String notes;
    
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @Builder.Default
    @JsonManagedReference
    private List<Task> tasks = new ArrayList<>();
    
    // Helper method to add task
    public void addTask(Task task) {
        tasks.add(task);
        task.setCustomer(this);
    }
    
    // Helper method to remove task
    public void removeTask(Task task) {
        tasks.remove(task);
        task.setCustomer(null);
    }
}