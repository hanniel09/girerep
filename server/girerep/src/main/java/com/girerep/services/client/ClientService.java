package com.girerep.services.client;

import com.girerep.domain.client.Client;
import com.girerep.domain.client.ClientCreateDTO;
import com.girerep.domain.client.ClientResponseDTO;
import com.girerep.domain.client.ClientUpdateDTO;
import com.girerep.exceptions.NotFoundException;
import com.girerep.repositories.client.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<Client> findAllClients() {
        return clientRepository.findAll();
    }

    public Client findClientById(UUID id) {
        return clientRepository.findById(id).orElseThrow(
                () -> new NotFoundException("Client com id: " + id + " não foi encontrado ou não existe")
        );
    }

    public List<ClientResponseDTO> searchClients(String query) {
        return clientRepository.findByQuery(query)
                .stream()
                .map(client -> new ClientResponseDTO(
                        client.getId(),
                        client.getName(),
                        client.getBuyer_name(),
                        client.getFantasy_name(),
                        client.getCorporate_reason(),
                        client.getEmail(),
                        client.getPhone(),
                        client.getAddress(),
                        client.getPostal_code()
                ))
                .toList();
    }

    public Client createClient(ClientCreateDTO client) {
        Client newClient = new Client();
        newClient.setName(client.name());
        newClient.setBuyer_name(client.buyer_name());
        newClient.setFantasy_name(client.fantasy_name());
        newClient.setCorporate_reason(client.corporate_reason());
        newClient.setEmail(client.email());
        newClient.setPhone(client.phone());
        newClient.setAddress(client.address());
        newClient.setPostal_code(client.postal_code());
        return clientRepository.save(newClient);
    }

    public Client updateClient(UUID id, ClientUpdateDTO client) {
        Client oldClient = findClientById(id);

        client.name().ifPresent(oldClient::setName);
        client.buyer_name().ifPresent(oldClient::setBuyer_name);
        client.fantasy_name().ifPresent(oldClient::setFantasy_name);
        client.corporate_reason().ifPresent(oldClient::setCorporate_reason);
        client.email().ifPresent(oldClient::setEmail);
        client.phone().ifPresent(oldClient::setPhone);
        client.address().ifPresent(oldClient::setAddress);
        client.postal_code().ifPresent(oldClient::setPostal_code);

        return clientRepository.save(oldClient);
    }

    public void deleteClient(UUID id) {
        clientRepository.deleteById(id);
    }
}
