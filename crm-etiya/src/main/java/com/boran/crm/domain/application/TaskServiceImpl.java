package com.boran.crm.domain.application;

import com.boran.crm.domain.entity.Task;
import com.boran.crm.domain.entity.TaskStatus;
import com.boran.crm.domain.entity.User;
import com.boran.crm.domain.repository.TaskRepository;
import com.boran.crm.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {
    
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Override
    public Task createTask(Task task) {
        // Yeni task'ın başlangıç durumunu ayarla
        if (task.getStatus() == null) {
            task.setStatus(TaskStatus.PENDING);
        }
        
        // Oluşturulma tarihini set et
        task.setCreatedAt(LocalDateTime.now());
        
        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(Long id, Task updatedTask) {
        return taskRepository.findById(id)
                .map(task -> {
                    // Güncellenebilir alanları kontrol et ve güncelle
                    if (updatedTask.getTitle() != null) {
                        task.setTitle(updatedTask.getTitle());
                    }
                    if (updatedTask.getDescription() != null) {
                        task.setDescription(updatedTask.getDescription());
                    }
                    if (updatedTask.getDueDate() != null) {
                        task.setDueDate(updatedTask.getDueDate());
                    }
                    if (updatedTask.getPriority() != null) {
                        task.setPriority(updatedTask.getPriority());
                    }
                    if (updatedTask.getStatus() != null) {
                        task.setStatus(updatedTask.getStatus());
                    }
                    
                    return taskRepository.save(task);
                })
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public Optional<Task> findById(Long id) {
        return taskRepository.findById(id);
    }

    @Override
    public Page<Task> findAll(Pageable pageable) {
        return taskRepository.findAll(pageable);
    }

    @Override
    public Task assignTask(Long taskId, Long userId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));
                
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        task.setAssignedTo(user);
        
        // Eğer task PENDING durumundaysa IN_PROGRESS'e çek
        if (task.getStatus() == TaskStatus.PENDING) {
            task.setStatus(TaskStatus.IN_PROGRESS);
        }
        
        return taskRepository.save(task);
    }

    @Override
    public Task updateTaskStatus(Long taskId, TaskStatus status) {
        return taskRepository.findById(taskId)
                .map(task -> {
                    task.setStatus(status);
                    
                    // Eğer task tamamlandıysa, tamamlanma tarihini set et
                    if (status == TaskStatus.COMPLETED) {
                        task.setCompletedAt(LocalDateTime.now());
                    }
                    
                    return taskRepository.save(task);
                })
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    @Override
    public List<Task> findTasksByCustomerId(Long customerId) {
        return taskRepository.findByCustomerId(customerId);
    }

    @Override
    public List<Task> findTasksByAssignedUserId(Long userId) {
        return taskRepository.findByAssignedToId(userId);
    }

    @Override
    public List<Task> findOverdueTasks() {
        return taskRepository.findOverdueTasks(TaskStatus.COMPLETED, LocalDateTime.now());
    }

    @Override
    public List<Task> findTasksByStatus(TaskStatus status) {
        return taskRepository.findByStatus(status);
    }

    @Override
    public List<Task> findTasksByDueDateBetween(LocalDateTime start, LocalDateTime end) {
        return taskRepository.findByDueDateBetween(start, end);
    }

    @Override
    public long countTasksByStatus(TaskStatus status) {
        return taskRepository.countByStatus(status);
    }

    @Override
    public List<Task> findRecentTasks(int limit) {
        return taskRepository.findAllByOrderByCreatedAtDesc(org.springframework.data.domain.PageRequest.of(0, limit));
    }

    @Override
    public List<Task> findUpcomingDeadlines(int days) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime future = now.plusDays(days);
        return taskRepository.findByDueDateBetweenAndStatusNot(now, future, TaskStatus.COMPLETED);
    }
}