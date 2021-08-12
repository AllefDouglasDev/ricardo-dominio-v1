export default interface Definitions {
  CartaResponsabilidade: {
    startDate: Date
    endDate: Date
    homeSheet: number
    descriptionPaging: string
    bookNumber: number
    checkBookNumber: boolean
    registrationData: string
    checkEmissionDate: boolean
    id?: number
    razao?: string
    typeAdress?: string
    adress?: string
    number?: number
    district?: string
    codCounty?: number
    county?: string
    uf?: string
    cep?: string
    crc: string
    systemGestor?: string
    saveLocation?: string
  }
  CompanyResponsabilityLatter: {
    razao?: string
    endereco?: string
    numero?: string
    bairro?: string
    codigoMunicipio?: string
    municipio?: string
    uf?: string
    cep?: string
  }
  ConfigIpDominio: {
    ipServer?: string
  }
}
