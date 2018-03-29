import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

export function getAppList(params) {
  return request({
    url: '/apps',
    method: 'get',
    params
  })
}

export function getApp(id, params) {
  return request({
    url: '/apps/' + id,
    method: 'get',
    params
  })
}

export function getBizGroupList(params) {
  return request({
    url: '/bizgroups',
    method: 'get',
    params
  })
}

export function getChannelList(params) {
  return request({
    url: '/channels',
    method: 'get',
    params
  })
}

export function getChannelConfigList(params) {
  return request({
    url: '/channel_configs',
    method: 'get',
    params
  })
}

export function getChannelConfigDetail(id, params) {
  return request({
    url: '/channel_configs/' + id,
    method: 'get',
    params
  })
}

export function getRecipGroupList(params) {
  return request({
    url: '/recipgroups',
    method: 'get',
    params
  })
}

export function getMerchantList(params) {
  return request({
    url: '/merchants',
    method: 'get',
    params
  })
}
export function getMerchantDetail(id, params) {
  return request({
    url: '/merchants/' + id,
    method: 'get',
    params
  })
}

export function getAllMerchantChannelList(params) {
  return request({
    url: '/channel_configs',
    method: 'get',
    params
  })
}

export function getMerchantChannels(params) {
  return request({
    url: '/merchant_channels',
    method: 'get',
    params
  })
}

export function getMerchantChannelList(mchId, params) {
  return request({
    url: '/channels_in_merchant/' + mchId,
    method: 'get',
    params
  })
}

export function getAppMerchantChannelList(mchId, params) {
  return request({
    url: '/app_channels_in_merchant/' + mchId,
    method: 'get',
    params
  })
}

export function getAllAppChannelList(params) {
  return request({
    url: '/app_channels',
    method: 'get',
    params
  })
}

export function getAppChannelDetail(id, params) {
  return request({
    url: '/app_channels/' + id,
    method: 'get',
    params
  })
}

export function checkPaymentConfig(id) {
  return request({
    url: '/query/' + id,
    method: 'get'
  })
}

export function getBillList(params) {
  return request({
    url: '/bills',
    method: 'get',
    params
  })
}

export function getRefundBillList(params) {
  return request({
    url: '/refund_bills',
    method: 'get',
    params
  })
}

export function getCinemalList(params) {
  return request({
    url: '/cinemas',
    method: 'get',
    params
  })
}
