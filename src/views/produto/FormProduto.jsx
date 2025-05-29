import { useEffect, useState } from "react";
import axios from "axios";
import InputMask from 'comigo-tech-react-input-mask';
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function FormProduto() {

    const { state } = useLocation();
    const [idProduto, setIdProduto] = useState();

    const [codigo, setCodigo] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [valorUnitario, setValorUnitario] = useState('');
    const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState('');
    const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState('');

    useEffect(() => {
       		if (state != null && state.id != null) {
           		axios.get("http://localhost:8080/api/produto/" + state.id)
                .then((response) => {
               	    setIdProduto(response.data.id)
               	    setCodigo(response.data.codigo)
               	    setTitulo(response.data.titulo)
                    setDescricao(response.data.descricao)
               	    setValorUnitario(response.data.valorUnitario ? response.data.valorUnitario.toString() : '')
               	    setTempoEntregaMinimo(response.data.tempoEntregaMinimo)
                    setTempoEntregaMaximo(response.data.tempoEntregaMaximo)
           		})
       		}
   	}, [state])

    function salvar() {
        let produtoRequest = {
            codigo: codigo,
            titulo: titulo,
            descricao: descricao,
            valorUnitario: parseFloat(valorUnitario.replace(',', '.')),
            tempoEntregaMinimo: parseInt(tempoEntregaMinimo),
            tempoEntregaMaximo: parseInt(tempoEntregaMaximo),
        }

        if (idProduto != null) { //Alteração:
           axios.put("http://localhost:8080/api/produto/" + idProduto, produtoRequest)
           .then((response) => { console.log('Produto alterado com sucesso.') })
           .catch((error) => { console.log('Erro ao alter um produto.') })
       } else { //Cadastro:
           axios.post("http://localhost:8080/api/produto", produtoRequest)
           .then((response) => { console.log('Produto cadastrado com sucesso.') })
           .catch((error) => { console.log('Erro ao incluir o produto.') })
       }

    //   axios.post("http://localhost:8080/api/produto", produtoRequest)
	// 	.then((response) => {
	// 	     console.log('Cliente cadastrado com sucesso.')
	// 	})
	// 	.catch((error) => {
	// 	     console.log('Erro ao incluir o um cliente.')
	// 	})
    }

    return (
        <div>
            <MenuSistema tela={'produto'} />
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
                    { idProduto === undefined &&
                        <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    { idProduto != undefined &&
                        <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }

                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    required
                                    fluid
                                    label='Título'
                                    placeholder="Informe o título do produto"
                                    maxLength="100"
                                    value={titulo}
                                    onChange={e => setTitulo(e.target.value)}
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Código do produto'
                                    placeholder='Informe o código do produto'
                                    value={codigo}
                                    onChange={e => setCodigo(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Descrição'
                                    placeholder='Informe a descrição do produto'
                                    value={descricao}
                                    onChange={e => setDescricao(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Input
                                    required
                                    fluid
                                    label='Valor Unitário'
                                    width={6}
                                >
                                    <InputMask
                                        required
                                        mask="9999,99"
                                        value={valorUnitario || ''} 
                                        onChange={e => setValorUnitario(e.target.value)}
                                    />
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Mínimo (min)'
                                    placeholder='30'
                                    width={6}
                                    value={tempoEntregaMinimo}
                                    onChange={e => setTempoEntregaMinimo(e.target.value)}
                                />

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Máximo (min)'
                                    placeholder='40'
                                    width={6}
                                    value={tempoEntregaMaximo}
                                    onChange={e => setTempoEntregaMaximo(e.target.value)}
                                />
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
                                onClick={() => window.location.href = '/list-produto'}
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
                                onClick={salvar}
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
