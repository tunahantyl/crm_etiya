package com.boran.crm.config;

import com.boran.crm.domain.entity.*;
import com.boran.crm.domain.repository.CustomerRepository;
import com.boran.crm.domain.repository.TaskRepository;
import com.boran.crm.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final TaskRepository taskRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Sadece boşsa seed et
        if (userRepository.count() == 0 && customerRepository.count() == 0 && taskRepository.count() == 0) {
            // Users
            User admin = User.builder()
                    .fullName("Admin User")
                    .email("admin@example.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ADMIN)
                    .isActive(true)
                    .build();

            User manager = User.builder()
                    .fullName("Manager User")
                    .email("manager@example.com")
                    .password(passwordEncoder.encode("manager123"))
                    .role(Role.MANAGER)
                    .isActive(true)
                    .build();

            User user = User.builder()
                    .fullName("Normal User")
                    .email("user@example.com")
                    .password(passwordEncoder.encode("user123"))
                    .role(Role.USER)
                    .isActive(true)
                    .build();

            userRepository.saveAll(List.of(admin, manager, user));

            // Customers
            Customer c1 = Customer.builder()
                    .name("Ahmet Yılmaz")
                    .email("ahmet@example.com")
                    .phone("5550101")
                    .address("İstanbul")
                    .notes("VIP müşteri")
                    .isActive(true)
                    .build();

            Customer c2 = Customer.builder()
                    .name("Ayşe Demir")
                    .email("ayse@example.com")
                    .phone("5550102")
                    .address("Ankara")
                    .isActive(true)
                    .build();

            Customer c3 = Customer.builder()
                    .name("Mehmet Kaya")
                    .email("mehmet@example.com")
                    .phone("5550103")
                    .address("İzmir")
                    .isActive(false)
                    .build();

            customerRepository.saveAll(List.of(c1, c2, c3));

            // Tasks
            Task t1 = Task.builder()
                    .title("Müşteri Görüşmesi")
                    .description("Yeni teklif hakkında görüşme")
                    .status(TaskStatus.PENDING)
                    .dueDate(LocalDateTime.now().plusDays(3))
                    .priority(2)
                    .customer(c1)
                    .assignedTo(manager)
                    .estimatedHours(3.0f)
                    .build();

            Task t2 = Task.builder()
                    .title("Sözleşme Hazırlama")
                    .description("Yeni dönem sözleşmesi hazırlanacak")
                    .status(TaskStatus.IN_PROGRESS)
                    .dueDate(LocalDateTime.now().plusDays(7))
                    .priority(1)
                    .customer(c2)
                    .assignedTo(admin)
                    .estimatedHours(5.0f)
                    .build();

            Task t3 = Task.builder()
                    .title("Teknik Destek")
                    .description("Sistem entegrasyonu desteği")
                    .status(TaskStatus.COMPLETED)
                    .dueDate(LocalDateTime.now().minusDays(2))
                    .completedAt(LocalDateTime.now().minusDays(1))
                    .priority(3)
                    .customer(c3)
                    .assignedTo(user)
                    .estimatedHours(2.0f)
                    .actualHours(2.5f)
                    .build();

            taskRepository.saveAll(List.of(t1, t2, t3));
        }
    }
}
