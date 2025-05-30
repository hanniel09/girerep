package com.girerep.repositories.commission;

import com.girerep.domain.comission.Commission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CommissionRepository extends JpaRepository<Commission, UUID> {

    Page<Commission> findBySellerNameContainingIgnoreCaseOrSaleAmountInCents(
            String sellerName, Integer saleAmountInCents, Pageable pageable
    );

    Page<Commission> findByMonthAndYear(Integer month, Integer year, Pageable pageable);
}
