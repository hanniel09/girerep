package com.girerep.services;

import com.girerep.domain.Client;
import com.girerep.domain.ClientRequestDTO;
import com.girerep.exceptions.NotFoundException;
import com.girerep.repositories.ClientRepository;
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

    public Client createClient(ClientRequestDTO client) {
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

    public Client updateClient(UUID id, ClientRequestDTO client) {
        Client oldClient = findClientById(id);
        oldClient.setName(client.name());
        oldClient.setBuyer_name(client.buyer_name());
        oldClient.setFantasy_name(client.fantasy_name());
        oldClient.setCorporate_reason(client.corporate_reason());
        oldClient.setEmail(client.email());
        oldClient.setPhone(client.phone());
        oldClient.setAddress(client.address());
        oldClient.setPostal_code(client.postal_code());
        return clientRepository.save(oldClient);
    }

    public void deleteClient(UUID id) {
        clientRepository.deleteById(id);
    }
}
