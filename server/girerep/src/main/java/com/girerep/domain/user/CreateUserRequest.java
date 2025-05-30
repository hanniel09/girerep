package com.girerep.domain.user;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateUserRequest(
        @NotBlank @Size(min=3,max=20) String username,
        @NotBlank @Size(min=5)       String password,
        @NotNull Role   role
) {}
