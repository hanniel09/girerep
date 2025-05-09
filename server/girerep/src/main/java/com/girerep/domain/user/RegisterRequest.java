package com.girerep.domain.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "Username é obrigatório")
        @Size(min = 3, max = 20, message = "Username deve ter entre 3 e 20 caracteres")
        String username,

        @NotBlank(message = "Senha é obrigatória")
        @Size(min = 5, message = "Senha deve ter no mínimo 5 caracteres")
        String password,

        String role) {}
