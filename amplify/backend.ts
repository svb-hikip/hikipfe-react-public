import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';

/**
 * @see https://docs.amplify.aws/react/build-a-backend/ to add storage, functions, and more
 */
const backend = defineBackend({
  auth,
});

// extract L1 CfnUserPool resources
const { cfnUserPool } = backend.auth.resources.cfnResources;
// update the schema property to add custom attributes
if (Array.isArray(cfnUserPool.schema)) {
  cfnUserPool.schema.push({
    name: 'tenantId',
    attributeDataType: 'String',
    mutable: true,
  });
}