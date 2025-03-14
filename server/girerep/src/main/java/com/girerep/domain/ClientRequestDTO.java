package com.girerep.domain;

public record ClientRequestDTO(
        String name,
        String buyer_name,
        String fantasy_name,
        String corporate_reason,
        String email,
        String phone,
        String address,
        String postal_code
) {}

