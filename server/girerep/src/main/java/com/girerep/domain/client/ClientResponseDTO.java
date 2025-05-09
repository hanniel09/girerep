package com.girerep.domain.client;

import java.util.UUID;

public record ClientResponseDTO(
    UUID id,
    String name,
    String buyer_name,
    String fantasy_name,
    String corporate_reason,
    String email,
    String phone,
    String address,
    String postal_code
) {}
