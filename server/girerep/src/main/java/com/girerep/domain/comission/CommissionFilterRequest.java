package com.girerep.domain.comission;

public record CommissionFilterRequest(
        String sellerName,
        Integer saleAmountInCents
) {}
