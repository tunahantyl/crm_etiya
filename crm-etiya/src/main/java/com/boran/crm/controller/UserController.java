package com.boran.crm.controller;

import com.boran.crm.domain.application.UserService;
import com.boran.crm.domain.entity.User;
import com.boran.crm.domain.web.AuthResponse;
import com.boran.crm.domain.web.LoginRequest;
import com.boran.crm.domain.web.RegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin
public class UserController {

    private final UserService userService;

    // Authentication endpoints
    @PostMapping("/auth/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.register(request));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(userService.login(request));
    }

    // User management endpoints
    @GetMapping("/users/me")
    public ResponseEntity<User> getCurrentUser(Principal principal) {
        return ResponseEntity.ok(userService.getCurrentUser(principal.getName()));
    }

    @PutMapping("/users/me")
    public ResponseEntity<User> updateCurrentUser(
            Principal principal,
            @RequestBody User updatedUser
    ) {
        return ResponseEntity.ok(userService.updateUser(principal.getName(), updatedUser));
    }

    // Admin only endpoints
    @GetMapping("/users/{email}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return userService.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/users/{email}/deactivate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deactivateUser(@PathVariable String email) {
        userService.deactivateUser(email);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/users/{email}/activate")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> activateUser(@PathVariable String email) {
        userService.activateUser(email);
        return ResponseEntity.ok().build();
    }
}