import InputMask from 'comigo-tech-react-input-mask';
import React from "react";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';

export default function FormProduto () {

    return (

        <div>

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                    <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label= 'Título'
                                    placeholder= "Informe o título do produto"
                                    maxLength="100"
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Código do produto'
                                    placeholder='Informe o código do produto'>
                                    {/* <InputMask
                                        required
                                        mask="999.999.999-99"
                                    />  */}
                                </Form.Input>

                            </Form.Group>
                            
                            <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Descrição'
                                    placeholder='Informe a descrição do produto'
                                    style={{ 
                                        resize: 'both',  
                                        overflow: 'auto',  
                                        minHeight: '80px',  
                                        width: '1130px',
                                    }}>
                                </Form.Input>

                            </Form.Group>

                            <Form.Group>

                                <Form.Input
                                    required
                                    fluid
                                    label='Valor Unitário'
                                    width={6}>
                                       <InputMask
                                        required
                                        mask="99,00"
                                       /> 
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Minimo em Minutos'
                                    placeholder='30'
                                    width={6}>
                                </Form.Input>
                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Máximo em Minutos'
                                    placeholder='40'
                                    width={6}>
                                </Form.Input>

                            </Form.Group>
                        
                        </Form>
                        
                        <div style={{marginTop: '4%'}}>

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
