'use client';

import React, { useMemo } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

type Props = {
  spec: Record<string, any>;
};

function ReactSwagger({ spec }: Props) {
  const memoizedSpec = useMemo(() => spec, [spec]);

  return <SwaggerUI spec={memoizedSpec} />;
}

export default ReactSwagger;