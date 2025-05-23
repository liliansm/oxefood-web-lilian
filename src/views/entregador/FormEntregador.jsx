import axios from "axios";
import InputMask from 'comigo-tech-react-input-mask';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function FormEntregador() {

    const { state } = useLocation();
    const [idEntregador, setIdEntregador] = useState();

    const [ativo, setAtivo] = useState(true);
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [foneCelular, setFoneCelular] = useState('');
    const [foneFixo, setFoneFixo] = useState('');
    const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState('');
    const [valorFrete, setValorFrete] = useState('');
    const [enderecoRua, setEnderecoRua] = useState('');
    const [enderecoNumero, setEnderecoNumero] = useState('');
    const [enderecoBairro, setEnderecoBairro] = useState('');
    const [enderecoCidade, setEnderecoCidade] = useState('');
    const [enderecoCep, setEnderecoCep] = useState('');
    const [enderecoUf, setEnderecoUf] = useState('');
    const [enderecoComplemento, setEnderecoComplemento] = useState('');

    useEffect(() => {
    if (state != null && state.id != null) {
        axios.get("http://localhost:8080/api/entregador/" + state.id)
            .then((response) => {
                setIdEntregador(response.data.id);
                setAtivo(response.data.ativo);
                setNome(response.data.nome);
                setCpf(response.data.cpf);
                setRg(response.data.rg);
                setDataNascimento(formatarData(response.data.dataNascimento));
                setFoneCelular(response.data.foneCelular);
                setFoneFixo(response.data.foneFixo);
                setQtdEntregasRealizadas(response.data.qtdEntregasRealizadas);
                setValorFrete(response.data.valorFrete);
                setEnderecoRua(response.data.enderecoRua);
                setEnderecoNumero(response.data.enderecoNumero);
                setEnderecoBairro(response.data.enderecoBairro);
                setEnderecoCidade(response.data.enderecoCidade);
                setEnderecoCep(response.data.enderecoCep);
                setEnderecoUf(response.data.enderecoUf);
                setEnderecoComplemento(response.data.enderecoComplemento);
            })
            .catch((error) => {
                console.error("Erro ao carregar dados do entregador:", error);
            });
    }
    }, [state])

    function salvar() {
        let entregadorRequest = {
            nome: nome,
            cpf: cpf,
            rg: rg,
            dataNascimento: dataNascimento.split('/').reverse().join('-'),
            foneCelular: foneCelular,
            foneFixo: foneFixo,
            qtdEntregasRealizadas: parseInt(qtdEntregasRealizadas),
            valorFrete: parseFloat(valorFrete.replace(',', '.')),
            enderecoRua: enderecoRua,
            enderecoNumero: enderecoNumero,
            enderecoBairro: enderecoBairro,
            enderecoCidade: enderecoCidade,
            enderecoCep: enderecoCep,
            enderecoUf: enderecoUf,
            enderecoComplemento: enderecoComplemento,
            ativo: ativo
        };

        if (idEntregador != null) { //Alteração:
           axios.put("http://localhost:8080/api/entregador/" + idEntregador, entregadorRequest)
           .then((response) => { console.log('Entregador alterado com sucesso.') })
           .catch((error) => { console.log('Erro ao alter um entregador.') })
       } else { //Cadastro:
           axios.post("http://localhost:8080/api/entregador", entregadorRequest)
           .then((response) => { console.log('Entregador cadastrado com sucesso.') })
           .catch((error) => { console.log('Erro ao incluir o entregador.') })
       }

        axios.post("http://localhost:8080/api/entregador", entregadorRequest)
            .then((response) => {
                console.log('Entregador cadastrado com sucesso.');
            })
            .catch((error) => {
                console.log('Erro ao incluir o entregador:', error);
            });
    }

    return (
        <div>
            <MenuSistema tela={'entregador'} />
            
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
                    { idEntregador === undefined &&
                        <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    { idEntregador != undefined &&
                        <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}
                                />
                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'
                                >
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                        value={cpf}
                                        onChange={e => setCpf(e.target.value)}
                                    /> 
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='RG'
                                >
                                    <InputMask
                                        mask="9999999999"
                                        value={rg}
                                        onChange={e => setRg(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='DT Nascimento'
                                >
                                    <InputMask
                                        mask="99/99/9999"
                                        value={dataNascimento}
                                        onChange={e => setDataNascimento(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Celular'
                                >
                                    <InputMask
                                        mask="(99)99999-9999"
                                        value={foneCelular}
                                        onChange={e => setFoneCelular(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                >
                                    <InputMask
                                        mask="(99)9999-9999"
                                        value={foneFixo}
                                        onChange={e => setFoneFixo(e.target.value)}
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='QTD Entregas Realizadas'
                                    type="number"
                                    value={qtdEntregasRealizadas}
                                    onChange={e => setQtdEntregasRealizadas(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label='Valor Por Frete'
                                >
                                    <InputMask
                                        mask="9999,99"
                                        value={valorFrete}
                                        onChange={e => setValorFrete(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Rua'
                                    value={enderecoRua}
                                    onChange={e => setEnderecoRua(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label='Número'
                                    value={enderecoNumero}
                                    onChange={e => setEnderecoNumero(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Bairro'
                                    value={enderecoBairro}
                                    onChange={e => setEnderecoBairro(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label='Cidade'
                                    value={enderecoCidade}
                                    onChange={e => setEnderecoCidade(e.target.value)}
                                />
                                <Form.Input
                                    fluid
                                    label='CEP'
                                >
                                    <InputMask
                                        mask='99999-999'
                                        value={enderecoCep}
                                        onChange={e => setEnderecoCep(e.target.value)}
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Select
                                    fluid
                                    label='UF'
                                    placeholder='Selecione'
                                    options={[
                                        { key: 'ac', value: 'AC', text: 'Acre' },
                                        { key: 'al', value: 'AL', text: 'Alagoas' },
                                        { key: 'ap', value: 'AP', text: 'Amapá' },
                                        { key: 'am', value: 'AM', text: 'Amazonas' },
                                        { key: 'ba', value: 'BA', text: 'Bahia' },
                                        { key: 'ce', value: 'CE', text: 'Ceará' },
                                        { key: 'df', value: 'DF', text: 'Distrito Federal' },
                                        { key: 'es', value: 'ES', text: 'Espírito Santo' },
                                        { key: 'go', value: 'GO', text: 'Goiás' },
                                        { key: 'ma', value: 'MA', text: 'Maranhão' },
                                        { key: 'mt', value: 'MT', text: 'Mato Grosso' },
                                        { key: 'ms', value: 'MS', text: 'Mato Grosso do Sul' },
                                        { key: 'mg', value: 'MG', text: 'Minas Gerais' },
                                        { key: 'pa', value: 'PA', text: 'Pará' },
                                        { key: 'pb', value: 'PB', text: 'Paraíba' },
                                        { key: 'pr', value: 'PR', text: 'Paraná' },
                                        { key: 'pe', value: 'PE', text: 'Pernambuco' },
                                        { key: 'pi', value: 'PI', text: 'Piauí' },
                                        { key: 'rj', value: 'RJ', text: 'Rio de Janeiro' },
                                        { key: 'rn', value: 'RN', text: 'Rio Grande do Norte' },
                                        { key: 'rs', value: 'RS', text: 'Rio Grande do Sul' },
                                        { key: 'ro', value: 'RO', text: 'Rondônia' },
                                        { key: 'rr', value: 'RR', text: 'Roraima' },
                                        { key: 'sc', value: 'SC', text: 'Santa Catarina' },
                                        { key: 'sp', value: 'SP', text: 'São Paulo' },
                                        { key: 'se', value: 'SE', text: 'Sergipe' },
                                        { key: 'to', value: 'TO', text: 'Tocantins' },
                                    ]}
                                    value={enderecoUf}
                                    onChange={(e, { value }) => setEnderecoUf(value)}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Complemento'
                                    value={enderecoComplemento}
                                    onChange={e => setEnderecoComplemento(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label>Ativo:</label>
                                    <Form.Group inline>
                                        <Form.Radio
                                            label='Sim'
                                            value={true}
                                            checked={ativo === true}
                                            onChange={() => setAtivo(true)}
                                        />
                                        <Form.Radio
                                            label='Não'
                                            value={false}
                                            checked={ativo === false}
                                            onChange={() => setAtivo(false)}
                                        />
                                    </Form.Group>
                                </Form.Field>
                            </Form.Group>
                        </Form>

                        <div style={{ marginTop: '4%' }}>
                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                                onClick={() => window.location.href = '/list-entregador'}
                            >
                                <Icon name='reply' />
                                Listar
                            </Button>
                                
                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
}