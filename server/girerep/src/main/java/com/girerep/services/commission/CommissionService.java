package com.girerep.services.commission;

import com.girerep.domain.comission.Commission;
import com.girerep.domain.comission.CommissionRequest;
import com.girerep.domain.comission.CommissionResponse;
import com.girerep.repositories.commission.CommissionRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommissionService {

    private final CommissionRepository commissionRepository;


    public List<CommissionResponse> getLatestFiveCommissions(){
        PageRequest pageable = PageRequest.of(0, 5);

        return commissionRepository.findAll(pageable)
                .map(this::mapToResponse)
                .toList();
    }

    public Page<CommissionResponse> getAllCommissionsPaged(int page) {
        PageRequest pageable = PageRequest.of(page, 20, Sort.by("createdAt").descending());

        return commissionRepository.findAll(pageable)
                .map(this::mapToResponse);
    }

    public Page<CommissionResponse> getByMonthAndYear(int month, int year, int page) {
        PageRequest pageable = PageRequest.of(page, 20);
        return commissionRepository.findByMonthAndYear(month, year, pageable)
                .map(this::mapToResponse);
    }

    public Page<CommissionResponse> search(String query, int page){
        PageRequest pageable = PageRequest.of(page, 20);
        Integer value = parseValueOrNull(query);

        return commissionRepository
                .findBySellerNameContainingIgnoreCaseOrSaleAmountInCents(query, value, pageable)
                .map(this::mapToResponse);
    }

    public CommissionResponse calculateAndSave(CommissionRequest request) {

        int commissionAmount = (request.saleAmountInCents() * request.commissionPercentage()) / 100;

        Commission commission = Commission.builder()
                .sellerName(request.sellerName())
                .saleAmountInCents(request.saleAmountInCents())
                .commissionPercentage(request.commissionPercentage())
                .commissionAmountInCents(commissionAmount)
                .month(request.month())
                .year(request.year())
                .build();

        commissionRepository.save(commission);

        return new CommissionResponse(
                commission.getId(),
                commission.getSellerName(),
                commission.getSaleAmountInCents(),
                commission.getCommissionPercentage(),
                commission.getCommissionAmountInCents(),
                String.format("%02d/%02d", commission.getMonth(), commission.getYear() % 100)
        );
    }

    public CommissionResponse updateCommission(UUID id, CommissionRequest request) {
        Commission existing = commissionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Comissão não encontrada"));

        existing.setSellerName(request.sellerName());
        existing.setSaleAmountInCents(request.saleAmountInCents());
        existing.setCommissionPercentage(request.commissionPercentage());
        existing.setCommissionAmountInCents((request.saleAmountInCents() * request.commissionPercentage()) / 100);
        existing.setMonth(request.month());
        existing.setYear(request.year());

        commissionRepository.save(existing);
        return mapToResponse(existing);
    }

    public void deleteCommission(UUID id) {
        if (!commissionRepository.existsById(id)) {
            throw new EntityNotFoundException("Comissão não encontrada");
        }
        commissionRepository.deleteById(id);
    }

    private Integer parseValueOrNull(String query){
        try{
            return Integer.parseInt(query);
        } catch (NumberFormatException e){
            return null;
        }
    }

    private CommissionResponse mapToResponse(Commission commission) {
        return new CommissionResponse(
                commission.getId(),
                commission.getSellerName(),
                commission.getSaleAmountInCents(),
                commission.getCommissionPercentage(),
                commission.getCommissionAmountInCents(),
                String.format("%02d/%02d", commission.getMonth(), commission.getYear() % 100)
        );
    }


}
