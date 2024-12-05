import { createSwaggerSpec } from 'next-swagger-doc';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

export const getApiDocs = async () => {
  const spec = await createSwaggerSpec({
    apiFolder: 'src/app/api', // Adjust to your API folder
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Shopping Cart API',
        version: '1.0.0',
      },
      paths: {}
    },
  });
  return spec;
};