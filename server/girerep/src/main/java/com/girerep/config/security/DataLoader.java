package com.girerep.config.security;

import com.girerep.domain.user.Role;
import com.girerep.domain.user.User;
import com.girerep.repositories.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataLoader {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    CommandLineRunner initDatabase() {
        return args -> {
            String adminUsername = "hanniel";
            String adminPassword = "hanniel";

            if (userRepository.findByUsername(adminUsername).isEmpty()) {
                User adminUser = new User();
                adminUser.setUsername(adminUsername);
                adminUser.setPassword(passwordEncoder.encode(adminPassword));// Email do admin
                adminUser.setRole(Role.ADMIN);

                userRepository.save(adminUser);
                System.out.println("Usuário admin '" + adminUsername + "' criado com sucesso!");
            } else {
                System.out.println("Usuário admin '" + adminUsername + "' já existe. Ignorando criação.");
            }
        };
    }
}
