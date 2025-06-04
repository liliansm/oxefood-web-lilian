import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListCliente() {
    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();
    const [loadingEnderecos, setLoadingEnderecos] = useState(false);
    const [openEnderecoModal, setOpenEnderecoModal] = useState(false);
    const [enderecosCliente, setEnderecosCliente] = useState([]);
    const [openExclusaoEnderecoModal, setOpenExclusaoEnderecoModal] = useState(false);
    const [idEnderecoRemover, setIdEnderecoRemover] = useState();
    const [clienteIdAtual, setClienteIdAtual] = useState();

    useEffect(() => {
        carregarLista();
    }, []);

    function carregarLista() {
        axios.get("http://localhost:8080/api/cliente")
            .then((response) => {
                setLista(response.data);
            });
    }

    function formatarData(dataParam) {
        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return '';
        }
        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    function confirmaRemover(id) {
        setOpenModal(true);
        setIdRemover(id);
    }

    async function remover() {
        await axios.delete('http://localhost:8080/api/cliente/' + idRemover)
            .then((response) => {
                console.log('Cliente removido com sucesso.');
                carregarLista();
            })
            .catch((error) => {
                console.log('Erro ao remover um Cliente.');
            });
        setOpenModal(false);
    }

    const visualizarEnderecos = async (clienteId) => {
        setLoadingEnderecos(true);
        setClienteIdAtual(clienteId);
        try {
            const response = await axios.get(`http://localhost:8080/api/cliente/endereco/${clienteId}`);
            setEnderecosCliente(response.data);
            setOpenEnderecoModal(true);
        } catch (error) {
            console.error('Erro ao buscar endereços:', error);
        } finally {
            setLoadingEnderecos(false);
        }
    };

    const confirmarExclusaoEndereco = (idEndereco) => {
        setIdEnderecoRemover(idEndereco);
        setOpenExclusaoEnderecoModal(true);
    };

    const removerEndereco = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/cliente/endereco/${idEnderecoRemover}`);
            const response = await axios.get(`http://localhost:8080/api/cliente/endereco/${clienteIdAtual}`);
            setEnderecosCliente(response.data);
            setOpenExclusaoEnderecoModal(false);
        } catch (error) {
            console.error('Erro ao remover endereço:', error);
        }
    };

    return (
        <div>
            <MenuSistema tela={'cliente'} />
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
                    <h2> Cliente </h2>
                    <Divider />
                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-cliente'
                        />
                        <br /><br /><br />
                        <Table color='orange' sortable celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell>CPF</Table.HeaderCell>
                                    <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                    <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {lista.map(cliente => (
                                    <Table.Row key={cliente.id}>
                                        <Table.Cell>{cliente.nome}</Table.Cell>
                                        <Table.Cell>{cliente.cpf}</Table.Cell>
                                        <Table.Cell>{formatarData(cliente.dataNascimento)}</Table.Cell>
                                        <Table.Cell>{cliente.foneCelular}</Table.Cell>
                                        <Table.Cell>{cliente.foneFixo}</Table.Cell>
                                        <Table.Cell textAlign='center'>
                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste cliente'
                                                icon>
                                                <Link to="/form-cliente" state={{ id: cliente.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                            </Button> &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover este cliente'
                                                icon
                                                onClick={e => confirmaRemover(cliente.id)}>
                                                <Icon name='trash' />
                                            </Button> &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='blue'
                                                title='Cadastrar novo endereço'
                                                icon
                                                as={Link}
                                                to="/form-endereco"
                                                state={{ clienteId: cliente.id }}
                                            >
                                                <Icon name='plus' />
                                            </Button>
                                            &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='teal'
                                                title='Visualizar endereços'
                                                icon
                                                onClick={() => visualizarEnderecos(cliente.id)}
                                            >
                                                <Icon name='eye' />
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>

            <Modal
                basic
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={() => remover()}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>

            <Modal
                onClose={() => setOpenEnderecoModal(false)}
                open={openEnderecoModal}
                size='small'
            >
                <Modal.Header>Endereços do Cliente</Modal.Header>
                <Modal.Content>
                    {enderecosCliente.length > 0 ? (
                        <Table celled>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Rua</Table.HeaderCell>
                                    <Table.HeaderCell>Número</Table.HeaderCell>
                                    <Table.HeaderCell>Bairro</Table.HeaderCell>
                                    <Table.HeaderCell>CEP</Table.HeaderCell>
                                    <Table.HeaderCell>Cidade</Table.HeaderCell>
                                    <Table.HeaderCell>Estado</Table.HeaderCell>
                                    <Table.HeaderCell>Complemento</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {enderecosCliente.map((endereco) => (
                                    <Table.Row key={endereco.id}>
                                        <Table.Cell>{endereco.rua}</Table.Cell>
                                        <Table.Cell>{endereco.numero}</Table.Cell>
                                        <Table.Cell>{endereco.bairro}</Table.Cell>
                                        <Table.Cell>{endereco.cep}</Table.Cell>
                                        <Table.Cell>{endereco.cidade}</Table.Cell>
                                        <Table.Cell>{endereco.estado}</Table.Cell>
                                        <Table.Cell>{endereco.complemento}</Table.Cell>
                                        <Table.Cell textAlign='center'>
                                            <Button
                                                as={Link}
                                                to="/form-endereco"
                                                state={{
                                                    clienteId: clienteIdAtual,
                                                    enderecoId: endereco.id,
                                                    enderecoParaEditar: endereco
                                                }}
                                                inverted
                                                circular
                                                color='green'
                                                title='Editar endereço'
                                                icon
                                            >
                                                <Icon name='edit' />
                                            </Button>
                                            &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Remover endereço'
                                                icon
                                                onClick={() => confirmarExclusaoEndereco(endereco.id)}
                                            >
                                                <Icon name='trash' />
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    ) : (
                        <p>Nenhum endereço cadastrado para este cliente.</p>
                    )}
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => setOpenEnderecoModal(false)}>
                        Fechar
                    </Button>
                </Modal.Actions>
            </Modal>

            <Modal
                basic
                onClose={() => setOpenExclusaoEnderecoModal(false)}
                open={openExclusaoEnderecoModal}
            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}>Tem certeza que deseja remover este endereço?</div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenExclusaoEnderecoModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={removerEndereco}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
}