import { DEFAULT_STORE_NAME } from './productMappers.js'

export const getDefaultDocumentTitle = () => DEFAULT_STORE_NAME

export const formatDocumentTitle = (pageName) =>
  pageName ? `${pageName} | ${DEFAULT_STORE_NAME}` : DEFAULT_STORE_NAME
