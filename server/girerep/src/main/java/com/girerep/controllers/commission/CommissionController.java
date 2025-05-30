package com.girerep.controllers.commission;

import com.girerep.domain.comission.CommissionRequest;
import com.girerep.domain.comission.CommissionResponse;
import com.girerep.services.commission.CommissionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/commissions")
@RequiredArgsConstructor
public class CommissionController {

    private final CommissionService commissionService;

    @PostMapping("/create")
    public ResponseEntity<CommissionResponse> calculateCommission(@RequestBody CommissionRequest request) {
        return ResponseEntity.ok(commissionService.calculateAndSave(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommissionResponse> update(
            @PathVariable UUID id,
            @RequestBody CommissionRequest request
    ) {
        return ResponseEntity.ok(commissionService.updateCommission(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        commissionService.deleteCommission(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/filter")
    public ResponseEntity<Page<CommissionResponse>> filterByMonthAndYear(@RequestParam int month, @RequestParam int year, @RequestParam(defaultValue = "0") int page) {
        Page<CommissionResponse> commissions = commissionService.getByMonthAndYear(month, year, page);

        if(commissions.isEmpty()){
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(commissions);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<CommissionResponse>> search(@RequestParam String query, @RequestParam(defaultValue = "0") int page){
        Page<CommissionResponse> commissions = commissionService.search(query, page);

        if(commissions.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(commissions);
    }

    @GetMapping("/latest")
    public ResponseEntity<List<CommissionResponse>> getLatestFiveCommissions(){
        return ResponseEntity.ok(commissionService.getLatestFiveCommissions());
    }

    @GetMapping()
    public ResponseEntity<Page<CommissionResponse>> getAllCommissionsPaged(@RequestParam(defaultValue = "0") int page){
        Page<CommissionResponse> commissions = commissionService.getAllCommissionsPaged(page);
        return ResponseEntity.ok(commissions);
    }

}
