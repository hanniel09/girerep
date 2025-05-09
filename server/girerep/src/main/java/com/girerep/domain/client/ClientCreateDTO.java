package com.girerep.domain.client;

public record ClientCreateDTO(
        String name,
        String buyer_name,
        String fantasy_name,
        String corporate_reason,
        String email,
        String phone,
        String address,
        String postal_code
) {
}

