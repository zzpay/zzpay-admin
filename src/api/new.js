import request from '@/utils/request'

export function createBizGroup(params) {
  return request({
    url: '/bizgroups',
    method: 'post',
    data: params
  })
}
export function createApp(params) {
  return request({
    url: '/apps',
    method: 'post',
    data: params
  })
}
export function deleteApp(id, params) {
  return request({
    url: '/apps/' + id,
    method: 'delete',
    data: params
  })
}

export function createChannel(params) {
  return request({
    url: '/channels',
    method: 'post',
    data: params
  })
}

export function createMerchant(params) {
  return request({
    url: '/merchants',
    method: 'post',
    data: params
  })
}
export function updateMerchant(id, params) {
  return request({
    url: '/merchants/' + id,
    method: 'post',
    data: params
  })
}

export function deleteMerchant(id) {
  return request({
    url: '/merchants/' + id,
    method: 'delete'
  })
}

export function updateMerchantChannels(params) {
  return request({
    url: '/merchant_channels/multi',
    method: 'post',
    data: params
  })
}

export function createChannelConfig(params) {
  return request({
    url: '/channel_configs',
    method: 'post',
    data: params
  })
}
export function updateChannelConfig(id, params) {
  return request({
    url: '/channel_configs/' + id,
    method: 'post',
    data: params
  })
}

export function deleteChannelConfig(id) {
  return request({
    url: '/channel_configs/' + id,
    method: 'delete'
  })
}

export function createAppChannel(params) {
  return request({
    url: '/app_channels',
    method: 'post',
    data: params
  })
}

export function updateAppChannel(id, params) {
  return request({
    url: '/app_channels/' + id,
    method: 'post',
    data: params
  })
}

export function resetSecret(id) {
  return request({
    url: '/app_channels/' + id + '/api_secret',
    method: 'post'
  })
}

export function deleteAppChannel(id) {
  return request({
    url: '/app_channels/' + id,
    method: 'delete'
  })
}
