interface Props {
  spec: Record<string, unknown>; // This matches the expected type for spec
}

const ReactSwagger: React.FC<Props> = ({ spec }) => {
  // Use the spec data safely
  return <div>{JSON.stringify(spec)}</div>;
};

export default ReactSwagger;