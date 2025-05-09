package com.girerep.services.user;

import com.girerep.domain.user.*;
import com.girerep.exceptions.UsernameExistsException;
import com.girerep.repositories.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;
    private final PasswordEncoder encoder;

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.findByUsername(request.username()).isPresent()) {
            throw new UsernameExistsException("Não foi possível concluir o cadastro. Tente outro username.");
        }


        User user = new User();
        user.setUsername(request.username());
        user.setPassword(encoder.encode(request.password()));

        Role role;
        try {
            role = request.role() != null ? Role.valueOf(request.role()) : Role.USER;
        } catch (IllegalArgumentException e) {
            role = Role.USER;
        }

        user.setRole(role);
        userRepository.save(user);

        return new AuthResponse(jwtService.generateToken(user));
    }

    public AuthResponse login(LoginRequest request) {

        try {
            authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.username(), request.password())
            );
        } catch (Exception e) {
            System.out.println("Erro na autenticação: " + e.getMessage());
            throw e;
        }

        User user = userRepository.findByUsername(request.username()).orElseThrow();
        return new AuthResponse(jwtService.generateToken(user));
    }
}
