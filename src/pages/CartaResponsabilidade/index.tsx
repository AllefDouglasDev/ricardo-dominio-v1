/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/display-name */
import {
  Layout,
  Card,
  Input,
  DatePicker,
  Row,
  Col,
  Select,
  Checkbox,
  Button,
  Spin,
  notification,
  Modal,
} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Sidebar from '../../components/Sidebar';
import React, { useState, FormEvent } from 'react';
import moment, { Moment } from 'moment';

import 'moment/locale/pt-br';
import locale from 'antd/es/date-picker/locale/pt_BR';
import { ButtonDirectory, InputField, Left, Submite } from './style';
import { CartaResponsabilidadeService } from '../../services';
import Search from 'antd/lib/input/Search';
import ChooseDirectoryService from '../../services/chooseDirectory';

const { Option } = Select;

const CartaResponsabilidade = () => {
  const [startDate, setStartDate] = useState(moment().startOf('year').toDate());
  const [endDate, setEndDate] = useState(new Date());
  const [homeSheet, setHomeSheet] = useState<number>(1);
  const [descriptionPaging, setDescriptionPaging] = useState<string>('Folha');
  const [bookNumber, setBookNumber] = useState<number>(1);
  const [checkBookNumber, setCheckBookNumber] = useState(true);
  const [registrationData, setRegistrationData] = useState<string>(
    'Conforme período atual'
  );
  const [checkEmissionDate, setCheckEmissionDate] = useState(true);
  const [id, setId] = useState<number>();
  const [razao, setRazao] = useState<string>();
  const [typeAdress, setTypeAdress] = useState<string>();
  const [adress, setAdress] = useState<string>();
  const [number, setNumber] = useState<number>();
  const [district, setDistrict] = useState<string>();
  const [codCounty, setCodCounty] = useState<number>();
  const [county, setCounty] = useState<string>();
  const [uf, setUf] = useState<string>();
  const [cep, setCep] = useState<string>();
  const [crc, setCrc] = useState<string>('Do contador');
  const [systemGestor, setSystemGestor] = useState<string>();
  const [saveLocation, setSaveLocation] = useState('');

  const [danger, setDanger] = useState(false);

  const [spining, setSpining] = useState({ loading: false });

  async function handleDirectory() {
    try {
      const result = await ChooseDirectoryService.openChooseDirectory();

      setSaveLocation(result.length === 0 ? saveLocation : result[0]);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSave(event: FormEvent) {
    event.preventDefault();
    if (!saveLocation) {
      return setDanger(true);
    }
    setDanger(false);
    setSpining({ loading: true });
    try {
      const response = await CartaResponsabilidadeService.generate({
        startDate,
        endDate,
        homeSheet,
        descriptionPaging,
        bookNumber,
        checkBookNumber,
        registrationData,
        checkEmissionDate,
        id,
        razao,
        typeAdress,
        adress,
        number,
        district,
        codCounty,
        county,
        uf,
        cep,
        crc: crc === 'Do contador' ? '1' : '2',
        systemGestor: systemGestor || 'não informado',
        saveLocation,
      });

      alert(response.data);

      Modal.success({
        content: 'Seus PDFs estão sendo gerados na pasta: ' + saveLocation,
      });
    } catch (error) {
      notification.error({
        message: 'Erro ao Gerar',
        description: error,
      });
    } finally {
      setSpining({ loading: false });
    }
  }

  async function loadCompany(id: string, event: any) {
    event.preventDefault();
    setSpining({ loading: true });
    try {
      const data = await CartaResponsabilidadeService.getCompany(id);
      const result = data.data;
      if (!result) {
        return notification.info({
          message: 'Escritório não encontrado',
          description: 'verifique o código da empresa',
        });
      }
      setRazao(result.razao);
      const rua = result.endereco;
      setTypeAdress(rua?.substr(0, rua.indexOf(' ')));
      setAdress(rua?.substr(rua.indexOf(' ') + 1));
      setDistrict(result.bairro);
      setCodCounty(Number(result.codigoMunicipio));
      setCounty(result.municipio);
      setNumber(Number(result.numero));
      setUf(result.uf);
      setCep(result.cep);
      notification.success({
        message: 'Feito!',
      });
    } catch (error) {
      setSpining({ loading: false });
      notification.error({
        message: 'Erro ao buscar',
        description: 'verifique o código da empresa',
      });
    } finally {
      setSpining({ loading: false });
    }
  }

  function handleCheckBookNumber() {
    setCheckBookNumber(!checkBookNumber);
  }
  function handleCheckEmissionDate() {
    setCheckEmissionDate(!checkEmissionDate);
  }

  return (
    <Sidebar selected="3" open="sub1">
      <Layout>
        <Content style={{ padding: '15px' }}>
          <Spin spinning={spining.loading}>
            <Card type="inner" title="Carta de Responsabilidade">
              <form>
                <Row>
                  <Col span={5}>
                    <InputField>
                      <label>Data inicial</label>
                      <DatePicker
                        defaultValue={moment(startDate).startOf('year')}
                        onChange={(e) =>
                          setStartDate(e?.toDate() || new Date())
                        }
                        locale={locale}
                        format={'DD/MM/YYYY'}
                      />
                    </InputField>
                    <InputField>
                      <label>Data Final</label>
                      <DatePicker
                        defaultValue={moment(endDate, 'DD/MM/YYYY')}
                        onChange={(e) => setEndDate(e?.toDate() || new Date())}
                        locale={locale}
                        format={'DD/MM/YYYY'}
                      />
                    </InputField>
                  </Col>
                  <Col span={6}>
                    <InputField>
                      <label>Folha inicial</label>
                      <Input
                        value={homeSheet}
                        name="homeSheet"
                        type="number"
                        onChange={(event) =>
                          setHomeSheet(Number(event?.target.value))
                        }
                        min={1}
                        defaultValue={1}
                      />
                    </InputField>

                    <InputField>
                      <label>Folha inicial</label>
                      <Select
                        defaultValue={descriptionPaging}
                        onChange={(e) => setDescriptionPaging(e)}
                      >
                        <Option value="Folha">Folha</Option>
                        <Option value="Página">Pagina</Option>
                      </Select>
                    </InputField>
                  </Col>
                  <Col span={7}>
                    <InputField>
                      <label>Emitir nº do livro</label>
                      <Left>
                        <Checkbox
                          style={{ marginRight: '20px' }}
                          checked={checkBookNumber}
                          onChange={handleCheckBookNumber}
                        />
                        <Input
                          value={bookNumber}
                          disabled={!checkBookNumber}
                          min={1}
                          defaultValue={1}
                          onChange={(event) =>
                            setBookNumber(Number(event?.target.value))
                          }
                        ></Input>
                      </Left>
                    </InputField>
                    <InputField>
                      <label>Dados Cadastrais</label>
                      <Select
                        defaultValue={registrationData}
                        onChange={(e) => setRegistrationData(e)}
                      >
                        <Option value="atual">Conforme período atual</Option>
                        <Option value="inicial">
                          Conforme período inicial
                        </Option>
                        <Option value="final">Conforme período final</Option>
                      </Select>
                    </InputField>
                  </Col>
                  <Col style={{ marginTop: '30px' }}>
                    <Left>
                      <Checkbox
                        value={checkEmissionDate}
                        style={{ marginRight: '20px' }}
                        checked={checkEmissionDate}
                        onClick={handleCheckEmissionDate}
                      />
                      <label>Emitir data de emisão/hora</label>
                    </Left>
                  </Col>
                </Row>
                <Card title="Dados do Escritório" bordered={false}>
                  <Row>
                    <Col span={4}>
                      <InputField>
                        <label>Código</label>
                        <Search placeholder="ex: 2" onSearch={loadCompany} />
                      </InputField>
                    </Col>
                    <Col span={10}>
                      <InputField>
                        <label>Empresa do Escritório</label>
                        <Input
                          value={razao}
                          onChange={(event) => setRazao(event?.target.value)}
                        />
                      </InputField>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={4}>
                      <InputField>
                        <label>Tipo do endereço</label>
                        <Input
                          value={typeAdress}
                          onChange={(event) =>
                            setTypeAdress(event?.target.value)
                          }
                        />
                      </InputField>
                    </Col>
                    <Col span={10}>
                      <InputField>
                        <label>Endereço</label>
                        <Input
                          onChange={(event) => setAdress(event?.target.value)}
                          value={adress}
                        />
                      </InputField>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={4}>
                      <InputField>
                        <label>Número</label>
                        <Input
                          value={number}
                          onChange={(event) =>
                            setNumber(Number(event?.target.value))
                          }
                          type="number"
                        />
                      </InputField>
                    </Col>
                    <Col span={10}>
                      <InputField>
                        <label>Bairro</label>
                        <Input
                          value={district}
                          onChange={(event) => setDistrict(event?.target.value)}
                        />
                      </InputField>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={4}>
                      <InputField>
                        <label>Código município</label>
                        <Input
                          value={codCounty}
                          onChange={(event) =>
                            setCodCounty(Number(event?.target.value))
                          }
                          type="number"
                        />
                      </InputField>
                    </Col>
                    <Col span={9}>
                      <InputField>
                        <label>Município</label>
                        <Input
                          value={county}
                          onChange={(event) => setCounty(event?.target.value)}
                        />
                      </InputField>
                    </Col>
                    <Col span={5}>
                      <InputField>
                        <label>UF</label>
                        <Input
                          value={uf}
                          onChange={(event) => setUf(event?.target.value)}
                        />
                      </InputField>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={5}>
                      <InputField>
                        <label>CEP</label>
                        <Input
                          value={cep}
                          onChange={(event) => setCep(event?.target.value)}
                        />
                      </InputField>
                    </Col>
                    <Col span={10}>
                      <InputField>
                        <label>Numero de Inscrição do CRC</label>
                        <Select
                          value={crc}
                          defaultValue="Do contador"
                          onChange={(e) => setCrc(e)}
                        >
                          <Option value="Do contador">Do Contador</Option>
                          <Option value="Do escritorio">Do Escritório</Option>
                        </Select>
                      </InputField>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={14}>
                      <InputField>
                        <label>Sistema de Gestão</label>
                        <Input
                          value={systemGestor}
                          onChange={(e) => setSystemGestor(e?.target.value)}
                        />
                      </InputField>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={10}>
                      <InputField>
                        <label>
                          <span style={{ color: 'red' }}>*</span> Local onde
                          deseja salvar os PDFs
                        </label>
                        <Input value={saveLocation} disabled />
                        {danger ? (
                          <span style={{ color: 'red' }}>
                            Local obrigatório
                          </span>
                        ) : (
                          <span></span>
                        )}
                      </InputField>
                    </Col>
                    <ButtonDirectory>
                      <button type="button" onClick={handleDirectory}>
                        {' '}
                        Escolher{' '}
                      </button>
                    </ButtonDirectory>
                  </Row>
                </Card>

                <Row>
                  <Col span={18}>
                    <Submite>
                      <Button type="primary" onClick={handleSave}>
                        Gerar
                      </Button>
                    </Submite>
                  </Col>
                </Row>
              </form>
            </Card>
          </Spin>
        </Content>
      </Layout>
    </Sidebar>
  );
};
export default CartaResponsabilidade;
