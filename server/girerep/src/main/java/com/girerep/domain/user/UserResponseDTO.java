package com.girerep.domain.user;

import java.util.UUID;

public record UserResponseDTO(UUID id, String username, Role role) {}
