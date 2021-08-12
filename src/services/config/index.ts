import api from '../api'
import Definitions from '../../core/types'
import { GetConfigIpDominioResponse } from './types'

export function saveIpDominio(form: Definitions['ConfigIpDominio']) {
  return api.post<GetConfigIpDominioResponse>('/config/ipDominioServer', form)
}
export function getIpDominio() {
  return api.get('/config/ipDominioServer')
}
