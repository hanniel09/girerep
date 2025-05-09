package com.girerep.domain.client;

import java.util.Optional;

public record ClientUpdateDTO(
        Optional<String> name,
        Optional<String> buyer_name,
        Optional<String> fantasy_name,
        Optional<String> corporate_reason,
        Optional<String> email,
        Optional<String> phone,
        Optional<String> address,
        Optional<String> postal_code
) {}

