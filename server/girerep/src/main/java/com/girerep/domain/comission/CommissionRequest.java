package com.girerep.domain.comission;

public record CommissionRequest(
        String sellerName,
        Integer saleAmountInCents,
        Integer commissionPercentage,
        Integer month,
        Integer year
) {
}
