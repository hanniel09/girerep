package com.girerep.domain.comission;

import java.util.UUID;

public record CommissionResponse(
        UUID id,
        String sellerName,
        Integer saleAmountInCents,
        Integer commissionPercentage,
        Integer commissionAmountInCents,
        String monthYear
) {
}
