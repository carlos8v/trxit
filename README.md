# Projeto
Conta digital

## MVP

### Requisitos

- [x] Criar uma conta
- [x] Logar em uma conta
- [x] Ver o saldo por carteira
- [x] Ver extrato
- [ ] Transferir dinheiro para outra conta

## Serviços

- `auth` lida com a autenticação de todo o app utilizando JWT e Cookie;
- `account` lida com as contas digitais;
- `transfer` lida com a transferência de valores de uma conta para outra;
- `proxy` lida com a orquestração dos serviços;
- `common` todas as funcionalidades comuns do app, disponibilizado como um pacote.
