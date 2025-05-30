package com.girerep.controllers.user;

import com.girerep.domain.user.CreateUserRequest;
import com.girerep.domain.user.User;
import com.girerep.domain.user.UserResponseDTO;
import com.girerep.repositories.user.UserRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/admin/users")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminUserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @GetMapping
    public Page<UserResponseDTO> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return userRepository.findAll(PageRequest.of(page, size))
                .map(u -> new UserResponseDTO(u.getId(), u.getUsername(), u.getRole()));
    }


    @PostMapping
    public ResponseEntity<UserResponseDTO> create(@Valid @RequestBody CreateUserRequest dto) {
        if (userRepository.existsByUsername(dto.username())) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .build();
        }
        User u = new User();
        u.setUsername(dto.username());
        u.setPassword(passwordEncoder.encode(dto.password()));
        u.setRole(dto.role());
        userRepository.save(u);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new UserResponseDTO(u.getId(), u.getUsername(), u.getRole()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
