package com.etiya.crm.domain.repositories;

import com.etiya.crm.domain.entities.Task;
import com.etiya.crm.domain.entities.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByCustomerId(Long customerId);
    List<Task> findByAssignedUserId(Long userId);
    List<Task> findByStatus(TaskStatus status);
    List<Task> findByCustomerIdAndStatus(Long customerId, TaskStatus status);
}