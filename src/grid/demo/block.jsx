const Block = ({ index, className, style }) => {
  return (
    <div
      className={className}
      style={{
        padding: 4,
        background: 'var(--color-primary, #3b82f6)',
        borderRadius: 8,
        color: '#fff',
        height: '100%',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {index}
    </div>
  );
};

export default Block;
