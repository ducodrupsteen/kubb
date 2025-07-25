import { File, Function, FunctionParams } from '@kubb/react'

import { type Operation, isOptional } from '@kubb/oas'
import { Client } from '@kubb/plugin-client/components'
import type { OperationSchemas } from '@kubb/plugin-oas'
import { getComments, getPathParams } from '@kubb/plugin-oas/utils'
import type { ReactNode } from 'react'
import type { PluginSwr } from '../types.ts'
import { MutationKey } from './MutationKey.tsx'

type Props = {
  /**
   * Name of the function
   */
  name: string
  typeName: string
  clientName: string
  mutationKeyName: string
  mutationKeyTypeName: string
  typeSchemas: OperationSchemas
  operation: Operation
  paramsCasing: PluginSwr['resolvedOptions']['paramsCasing']
  paramsType: PluginSwr['resolvedOptions']['paramsType']
  dataReturnType: PluginSwr['resolvedOptions']['client']['dataReturnType']
  pathParamsType: PluginSwr['resolvedOptions']['pathParamsType']
}

type GetParamsProps = {
  paramsCasing: PluginSwr['resolvedOptions']['paramsCasing']
  pathParamsType: PluginSwr['resolvedOptions']['pathParamsType']
  dataReturnType: PluginSwr['resolvedOptions']['client']['dataReturnType']
  typeSchemas: OperationSchemas
  mutationKeyTypeName: string
}
// TODO add same logic as being done for react-query mutations
function getParams({ pathParamsType, paramsCasing, dataReturnType, typeSchemas, mutationKeyTypeName }: GetParamsProps) {
  const TData = dataReturnType === 'data' ? typeSchemas.response.name : `ResponseConfig<${typeSchemas.response.name}>`
  const TError = `ResponseErrorConfig<${typeSchemas.errors?.map((item) => item.name).join(' | ') || 'Error'}>`

  return FunctionParams.factory({
    pathParams: {
      mode: pathParamsType === 'object' ? 'object' : 'inlineSpread',
      children: getPathParams(typeSchemas.pathParams, { typed: true, casing: paramsCasing }),
    },
    params: typeSchemas.queryParams?.name
      ? {
          type: typeSchemas.queryParams?.name,
          optional: isOptional(typeSchemas.queryParams?.schema),
        }
      : undefined,
    headers: typeSchemas.headerParams?.name
      ? {
          type: typeSchemas.headerParams?.name,
          optional: isOptional(typeSchemas.headerParams?.schema),
        }
      : undefined,
    options: {
      type: `
{
  mutation?: Parameters<typeof useSWRMutation<${[TData, TError, mutationKeyTypeName, typeSchemas.request?.name].join(', ')}>>[2],
  client?: ${typeSchemas.request?.name ? `Partial<RequestConfig<${typeSchemas.request?.name}>> & { client?: typeof fetch }` : 'Partial<RequestConfig> & { client?: typeof fetch }'},
  shouldFetch?: boolean,
}
`,
      default: '{}',
    },
  })
}

export function Mutation({
  name,
  clientName,
  mutationKeyName,
  mutationKeyTypeName,
  paramsType,
  paramsCasing,
  pathParamsType,
  dataReturnType,
  typeSchemas,
  operation,
}: Props): ReactNode {
  const TData = dataReturnType === 'data' ? typeSchemas.response.name : `ResponseConfig<${typeSchemas.response.name}>`
  const TError = `ResponseErrorConfig<${typeSchemas.errors?.map((item) => item.name).join(' | ') || 'Error'}>`

  const generics = [
    TData,
    TError,
    `${mutationKeyTypeName} | null`,
    typeSchemas.request?.name, //arg: data
  ].filter(Boolean)

  const mutationKeyParams = MutationKey.getParams({
    pathParamsType,
    typeSchemas,
  })

  const params = getParams({
    paramsCasing,
    pathParamsType,
    dataReturnType,
    typeSchemas,
    mutationKeyTypeName,
  })

  const clientParams = Client.getParams({
    paramsCasing,
    paramsType,
    typeSchemas,
    pathParamsType,
    isConfigurable: true,
  })

  return (
    <File.Source name={name} isExportable isIndexable>
      <Function
        name={name}
        export
        params={params.toConstructor()}
        JSDoc={{
          comments: getComments(operation),
        }}
      >
        {`
        const { mutation: mutationOptions, client: config = {}, shouldFetch = true } = options ?? {}
        const mutationKey = ${mutationKeyName}(${mutationKeyParams.toCall()})

        return useSWRMutation<${generics}>(
          shouldFetch ? mutationKey : null,
          async (_url${typeSchemas.request?.name ? ', { arg: data }' : ''}) => {
            return ${clientName}(${clientParams.toCall()})
          },
          mutationOptions
        )
    `}
      </Function>
    </File.Source>
  )
}
