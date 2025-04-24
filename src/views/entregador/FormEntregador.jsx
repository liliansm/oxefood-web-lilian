import InputMask from 'comigo-tech-react-input-mask';
import React, { useState } from "react";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';

export default function FormProduto() {
    const [ativo, setAtivo] = useState('sim');

    return (
        <div>
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
                    <h2> 
                        <span style={{ color: 'darkgray' }}>
                            Entregador &nbsp;<Icon name='angle double right' size="small" />
                        </span> 
                        Cadastro 
                    </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                />
                                <Form.Input
                                    required
                                    fluid
                                    label='CPF'
                                >
                                    <InputMask
                                        required
                                        mask="999.999.999-99"
                                    /> 
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='RG'
                                >
                                    <InputMask
                                        mask="99999999"
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
                                    />
                                </Form.Input>
                                <Form.Input
                                    required
                                    fluid
                                    label='Fone Celular'
                                >
                                    <InputMask
                                        mask="(99)99999-9999"
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Fone Fixo'
                                >
                                    <InputMask
                                        mask="(99)99999-9999"
                                    />
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='QTD Entregas Realizadas'
                                />
                                <Form.Input
                                    fluid
                                    label='Valor Por Frete'
                                >
                                    <InputMask
                                        mask="9999,99"
                                    />
                                </Form.Input>
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Rua'
                                />
                                <Form.Input
                                    fluid
                                    label='Número'
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Bairro'
                                />
                                <Form.Input
                                    fluid
                                    label='Cidade'
                                />
                                <Form.Input
                                    fluid
                                    label='CEP'
                                >
                                    <InputMask
                                        mask='99999-999'
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
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Complemento'
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label>Ativo:</label>
                                    <Form.Group inline>
                                        <Form.Radio
                                            label='Sim'
                                            value='sim'
                                            checked={ativo === 'sim'}
                                            onChange={() => setAtivo('sim')}
                                        />
                                        <Form.Radio
                                            label='Não'
                                            value='nao'
                                            checked={ativo === 'nao'}
                                            onChange={() => setAtivo('nao')}
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